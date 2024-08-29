import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { useParams } from 'react-router-dom';
import styles from '../../styles/chat/BigChat.module.css';
import ChattingRoom from './ChattingRoom';
import { fetchData } from '../../utils/memberData';

function BigChat() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {

    const getUserData = async () => {
      try {
        const userData = await fetchData(id); 
        setSelectedUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();

    // MQTT 브로커에 연결
    const mqttClient = mqtt.connect('mqtt://localhost:1884'); // 또는 'ws://broker.hivemq.com:8000/mqtt' (웹소켓 사용 시)
    
    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setIsConnected(true);
      mqttClient.subscribe('python/mqtt'); // 원하는 토픽 구독
    });

    mqttClient.on('message', (topic, message) => {
      console.log('Received message:', message.toString());
      
      try {
        const parsedMessage = JSON.parse(message.toString());
        const { text, sender, timestamp } = parsedMessage;

        // 메세지 연속으로 2개 나옴 방지
        if (chatMessages.some(msg => msg.text === text && msg.time === new Date(timestamp).toLocaleTimeString())) {
          return;
        }

        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: sender === 'inPython' ? 'other' : 'self', 
            text,
            time: new Date(timestamp).toLocaleTimeString(),
          },
        ]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });



    mqttClient.on('error', (err) => {
      console.error('Connection error:', err);
    });

    mqttClient.on('close', () => {
      console.log('Disconnected from MQTT broker');
    });

    setClient(mqttClient);

    // 컴포넌트 언마운트 시 클라이언트 종료
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [chatMessages]); // 여기서 chatMessages 의존성을 사용하여 중복 체크

  const sendMessage = (text) => {
    if (client && isConnected) {
      const message = JSON.stringify({
        text,
        sender: 'inReact',
        timestamp: new Date().toISOString(),

      });
      client.publish('python/mqtt', message);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'self',
          text,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    const input = document.querySelector(`.${styles.chatInput}`);
    const text = input.value.trim();
    if (text) {
      sendMessage(text);
      input.value = '';
    }
  };
  
  return (
    <div className={styles.container}>
       <ChattingRoom onSelectUser={setSelectedUser} />

        <div className={styles.chatSection}>
        <div className={styles.chatHeader}>
          <h2 className={styles.chatName}>{selectedUser ? selectedUser.name : 'Select a user'}</h2>
          <button className={styles.infoButton}>i</button>
        </div>

        <div className={styles.chatMessages}>
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.sender === 'self' ? styles.sent : ''}`}
            >
              <img
                src={msg.sender === 'self' ? "../images/defaultimage.png" : "../images/choehwanseong.png"}
                alt="profile"
                className={styles.profileImage}
              />
              <div className={styles.messageBubble}>
                <span>{msg.text}</span>
                <span className={styles.messageTime}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chatInputSection}>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="입력해주세요"
            onKeyDown={handleKeyDown}
          />
             <button className={styles.sendButton} onClick={handleSendClick}>
            <img src="../images/sendbutton.png" alt="Send" />
          </button>
          <button className={styles.attachmentButton}><img src="../images/filebutton.png"/></button>
        </div>
      </div>
    </div>
   
  );
}

export default BigChat;
