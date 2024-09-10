import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { useParams } from 'react-router-dom';
import styles from '../../styles/chat/BigChat.module.css';
import ChattingRoom from './ChattingRoom';
import { chattingRoomData, chattingListYourData } from '../../utils/chatData';

function BigChat() {
  const { id } = useParams(); //url파라미터로 받은 채팅방 id
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log('id',id);
    console.log(new Date().toISOString());
    //console.log(new Date().toString());
    const getData = async () => {
      try {
        const fetchedData = await chattingListYourData(localStorage.getItem("membersId"));
        setData(fetchedData);  // 가져온 데이터를 상태에 저장
        return fetchedData;
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    //마운트시 엠큐티티 클라이언트 객체 없으면 생성
    const func = async ()=>{
      if (!client) {
        const list_ = await getData();
        console.log(list_);

        // 클라이언트가 존재하지 않는 경우에만 새로운 MQTT 클라이언트를 생성
        const mqttClient = mqtt.connect('ws://121.133.84.38:1884'); // MQTT 브로커에 연결

        mqttClient.on('connect', () => {
          console.log('Connected to MQTT broker');
          setIsConnected(true);
        });

        mqttClient.on('error', (err) => {
          console.error('Connection error:', err);
        });

        //메시지 수신 설정
        mqttClient.on('message', (topic, message) => {
          console.log('Received message:', message.toString());
          try {
            const parsedMessage = JSON.parse(message.toString());
            const { text, sender, timestamp } = parsedMessage;

            // 중복 메시지 방지
            if (chatMessages.some(msg => msg.text === text && msg.time === new Date(timestamp).toLocaleTimeString())) {
              return;
            }

            setChatMessages((prevMessages) => [
              ...prevMessages,
              {
                sender: sender,
                text,
                time: new Date(timestamp).toISOString(),
              },
            ]);
            
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });
        
        if(id){
          for(let joinchat of list_){
            if(joinchat.chattingRoom.id==id){
              mqttClient.subscribe(`${id}`, (err) => {
                if (!err) {
                  console.log(id, 'Subscribed to topic');
                } else {
                  console.error('Subscription error:', err);
                }
                setSelectedUser(joinchat);
              });
            }
          }
        }

        // 클라이언트를 상태로 설정
        setClient(mqttClient);
      }
    }

    func();

    // 컴포넌트 언마운트 시 클라이언트 종료
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  //메시지 보내기 설정
  const sendMessage = (text) => {
    if (client && isConnected) {
      const message = JSON.stringify({
        text,
        sender: localStorage.getItem('membersId'),
        timestamp: new Date(),
      });
      console.log(`토픽 ${selectedUser.chattingRoom.id} 으로 채팅 보내기, 채팅내용 :`,message);
      client.publish(`${selectedUser.chattingRoom.id}`, message);
    }
  };

  const handleSendClick = () => {
    const input = document.querySelector("#chatInput");
    const text = input.value.trim();
    if (text) {
      sendMessage(text);
      input.value = '';
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };
  
  return (
    <div className={styles.container}>
      <ChattingRoom setSelectedUser={setSelectedUser} data={data} client={client} setChatMessages={setChatMessages}/>

      <div className={styles.chatSection}>
        
        <div className={styles.chatHeader}>
          <h2 className={styles.chatName}>{selectedUser ? selectedUser.member.name : '채팅방을 선택하세요'}</h2>
          <button className={styles.infoButton}>i</button>
        </div>

        <div className={styles.chatMessages} id='chatMessages'>
          {chatMessages.map((msg, index) => (
            <div className={styles.messageNTime} key={index}>
              <div
                className={`${styles.message} ${msg.sender === localStorage.getItem('membersId') ? styles.sent : ''}`}
              >
                <img
                  src={msg.sender === localStorage.getItem('membersId') ? "../images/defaultimage.png" : "../images/choehwanseong.png"}
                  alt="profile"
                  className={styles.profileImage}
                />
                <div className={styles.messageBubble}>
                  <span>{msg.text}</span>
                </div>  
              </div>
              <span className={`${styles.messageTime} ${msg.sender === localStorage.getItem('membersId') ? styles.sent : ''}`}>{(new Date().toLocaleDateString == new Date(msg.time).toLocaleDateString?'':new Date(msg.time).toLocaleDateString)+new Date(msg.time).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>

        <div className={styles.chatInputSection}>
          <input
            type="text"
            className={styles.chatInput}
            id="chatInput"
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