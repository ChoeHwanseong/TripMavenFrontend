import React, { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../../styles/chat/BigChat.module.css';
import ChattingRoom from './ChattingRoom';
import { chattingListYourData, getMessages } from '../../utils/chatData';
import { submitMessage } from '../../utils/chatData';



function BigChat() {
  const { id } = useParams(); //url파라미터로 받은 채팅방 id
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //채팅방 목록 데이터 가져와서 상태에 저장하는 함수
  const getData = async () => {
    try {
      const fetchedData = await chattingListYourData(localStorage.getItem("membersId"));
      setData(fetchedData);  // 가져온 데이터를 상태에 저장
      return fetchedData;
    } catch (error) {
      console.error('에러났당', error);
    }
  };

  useEffect(() => {
    //마운트시 엠큐티티 클라이언트 객체 없으면 생성
    const setMQTT = async ()=>{
      if (!client) {
        const list_ = await getData();

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
          const parsedMessage = JSON.parse(message.toString());
          const { text, sender, timestamp } = parsedMessage;

          try {
            if(list_.find(ele=>ele.chattingRoom.id == topic && (ele.member.id == sender || localStorage.getItem('membersId')==sender))){
              //console.log('들어왔당');
              // 중복 메시지 방지
              /*
              if (chatMessages.some(msg => msg.text === text && msg.time === new Date(timestamp).toLocaleTimeString())) {
                return;
              }
              */
              setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                  sender: sender,
                  text,
                  timestamp: new Date(timestamp).toISOString(),
                  chattingRoomId: topic
                },
              ]);
            }
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
              fetchChatMessages(joinchat.chattingRoom.id);
            }
          }
        }

        // 클라이언트를 상태로 설정
        setClient(mqttClient);
      }
    }

    setMQTT();

    // 컴포넌트 언마운트 시 클라이언트 종료
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  useEffect(()=>{
    scrollToBottom();
  },[chatMessages]);

  //메시지 보내기 설정
  const sendMessage = async (text) => {
    if (client && isConnected) {
      const message = JSON.stringify({
        text,
        sender: localStorage.getItem('membersId'),
        timestamp: new Date(),
      });
      
      client.publish(`${selectedUser.chattingRoom.id}`, message);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: localStorage.getItem('membersId'),
          text,
          timestamp: new Date().toISOString(),
          chattingRoomId: selectedUser.chattingRoom.id
        }
      ]);

      try {
        await submitMessage(selectedUser.chattingRoom.id, text, localStorage.getItem('membersId'));
        console.log('메시지 저장됨');
      } catch (error) {
        console.error('에러났당', error);
      }
    }
  };


  const handleSendClick = () => {
    const input = document.querySelector("#chatInput");
    const text = input.value.trim();
    if (text) {
      sendMessage(text);
      input.value = '';
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendClick();
    }
  };

  const [loading, setLoading] = useState(false);

  const fetchChatMessages = async (chattingRoomId) => {
    try {
      setLoading(true); // 메시지를 불러오는 동안 로딩 상태로 설정
      const response = await getMessages(chattingRoomId);
      
      if (response) {
        const messageTime = response.map(msg => ({
          ...msg,
          chattingRoomId  // 각 메시지에 chattingRoomId 필드 추가
        }));
  
        setChatMessages(messageTime);
      } else {
        console.log('No messages received');
      }
    } catch (error) {
      console.error('메시지 불러오기 에러:', error);
    } finally {
      setLoading(false); // 메시지를 다 불러오면 로딩 상태 해제
    }
  };
  
  return (
    <div className={styles.container}>
    <ChattingRoom setSelectedUser={setSelectedUser} loading={loading} data={data} client={client} setChatMessages={setChatMessages} fetchChatMessages={fetchChatMessages} chatMessages={chatMessages}/>

    <div className={styles.chatSection}>
      <div className={styles.chatHeader}>
        <h2 className={styles.chatName}>{selectedUser ? selectedUser.member.name : '채팅방을 선택하세요'}</h2>
      </div>

      <div className={styles.chatMessages}>
        {chatMessages.map((msg, index) => (
          <div className={styles.messageNTime} key={index}>
            <div
              className={`${styles.message} ${msg.sender.toString() === localStorage.getItem('membersId') ? styles.sent : ''}`}
            >
              <img
                src={msg.sender.toString() === localStorage.getItem('membersId') ? "../images/defaultimage.png" : "../images/choehwanseong.png"}
                alt="profile"
                className={styles.profileImage}

              />
              <div className={styles.messageBubble}>
                <span>{msg.text}</span>
              </div>
            </div>
            <span className={`${styles.messageTime} ${msg.sender.toString() === localStorage.getItem('membersId') ? styles.sent : ''}`}>
              {(new Date(msg.timestamp).toLocaleDateString() === new Date().toLocaleDateString() ? '' : new Date(msg.timestamp).toLocaleDateString())}
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

        <div className={styles.chatInputSection}>
          <input
            type="text"
            className={styles.chatInput}
            id="chatInput"
            placeholder="입력해주세요"
            onKeyDown={handleKeyDown}
            ref={inputRef}
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