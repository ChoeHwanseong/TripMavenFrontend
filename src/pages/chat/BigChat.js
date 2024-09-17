import React, { useContext, useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../../styles/chat/BigChat.module.css';
import ChattingRoom from './ChattingRoom';
import { chattingListYourData, getMessages } from '../../utils/chatData';
import { submitMessage } from '../../utils/chatData';
import { TemplateContext } from '../../context/TemplateContext';

function BigChat() {
  const { id } = useParams(); // URL 파라미터로 받은 채팅방 ID
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState({});
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const template = useContext(TemplateContext);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 채팅방 목록 데이터 가져와서 상태에 저장하는 함수
  const getData = async () => {
    try {
      const fetchedData = await chattingListYourData(localStorage.getItem("membersId"));
      setData(fetchedData);  // 가져온 데이터를 상태에 저장
      return fetchedData;
    } catch (error) {
      console.error('에러났당', error);
    }
  };

  const fetchChatRoomsMessages = async (chatRooms) => {
    try {
      for (let room of chatRooms) {
        const response = await getMessages(room.chattingRoom.id);
        if (response) {
          const messageTime = response.map(msg => ({
            ...msg,
            chattingRoomId: room.chattingRoom.id
          }));

          setChatMessages(prevMessages => ({
            ...prevMessages,
            [room.chattingRoom.id]: messageTime,
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching chat messages for all rooms:', error);
    }
  };

  useEffect(() => {
    // 마운트 시 MQTT 클라이언트 객체 없으면 생성
    const setMQTT = async () => {
      const list_ = await getData();
      if (!client) {
        await fetchChatRoomsMessages(list_);

        // 클라이언트가 존재하지 않는 경우에만 새로운 MQTT 클라이언트를 생성
        const mqttClient = mqtt.connect('ws://121.133.84.38:1884'); // MQTT 브로커에 연결

        mqttClient.on('connect', () => {
          console.log('Connected to MQTT broker');
          setIsConnected(true);
        });

        mqttClient.on('error', (err) => {
          console.error('Connection error:', err);
        });

        // 메시지 수신 설정
        mqttClient.on('message', (topic, message) => {
          const parsedMessage = JSON.parse(message.toString());
          const { text, sender, timestamp } = parsedMessage;

          try {
            setChatMessages((prevMessages) => ({
              ...prevMessages,
              [topic]: [
                ...(prevMessages[topic] || []),
                {
                  sender: sender,
                  text,
                  timestamp: new Date(timestamp).toISOString(),
                  chattingRoomId: topic
                },
              ]
            }));

          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });

        if (id) {
          for (let joinChat of list_) {
            if (joinChat.chattingRoom.id == id) {
              mqttClient.subscribe(`${id}`, (err) => {
                if (!err) {
                  console.log(id, 'Subscribed to topic');
                } else {
                  console.error('Subscription error:', err);
                }
                setSelectedUser(joinChat);
              });
              fetchChatMessages(joinChat.chattingRoom.id);
            }
          }
        }

        // 클라이언트를 상태로 설정
        setClient(mqttClient);
      }
      else{
        const joinChat = list_.find(ele => location.pathname.includes(ele.chattingRoom.id));
        client.subscribe(`${id}`, (err) => {
          if (!err) {
            console.log(id, 'Subscribed to topic');
          } else {
            console.error('Subscription error:', err);
          }
          setSelectedUser(joinChat);
        });
        fetchChatMessages(joinChat.chattingRoom.id);
      }
    };

    setMQTT();

    // 컴포넌트 언마운트 시 클라이언트 종료
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [location.pathname]);

  /*
  useEffect(()=>{
    if(client){

    }
  },[]);
  */

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // 메시지 보내기 설정
  const sendMessage = async (text) => {
    if (client && isConnected) {
      const message = JSON.stringify({
        text,
        sender: localStorage.getItem('membersId'),
        timestamp: new Date(),
      });

      client.publish(`${selectedUser.chattingRoom.id}`, message);

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
    if (selectedUser && text) {
      sendMessage(text);
      input.value = '';
      inputRef.current.focus();
    }
    else{
      alert('채팅방을 선택하세요');
      input.value = '';
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

        setChatMessages(prevMessages => ({
          ...prevMessages,
          [chattingRoomId]: messageTime,
        }));
      } else {
        console.log('No messages received');
      }
    } catch (error) {
      console.error('메시지 불러오기 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageBorder}>
    <div className={styles.container}>
      <ChattingRoom setSelectedUser={setSelectedUser} loading={loading} data={data} client={client} setChatMessages={setChatMessages} fetchChatMessages={fetchChatMessages} chatMessages={chatMessages} />

      <div className={styles.chatSection}>
        <div className={styles.chatHeader}>
          <h2 className={styles.chatName2}>{selectedUser ? selectedUser.member.name : '채팅방을 선택하세요'}</h2>
        </div>

        <div className={styles.chatMessages}>
          {(chatMessages[selectedUser?.chattingRoom.id] || []).map((msg, index) => (
            <div className={styles.messageNTime} key={index}>
              <div
                className={`${styles.message} ${msg.sender.toString() === localStorage.getItem('membersId') ? styles.sent : ''}`}
              >
                <img
                  src={
                    msg.sender.toString() === localStorage.getItem('membersId') ?
                      template.memberInfo.profile ? template.memberInfo.profile : "../images/defaultimage.png" : //보내는 사람
                      selectedUser.member.profile ? selectedUser.member.profile : "../images/choehwanseong.png"} //받는 사람
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
          <button className={styles.attachmentButton}><img src="../images/filebutton.png" /></button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default BigChat;
