import React, { useContext, useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/chat/BigChat.module.css';
import ChattingRoom from './ChattingRoom';
import { chattingListYourData, getMessages, submitMessage } from '../../utils/chatData';
import defaultImage from '../../images/default_profile.png';
import { TemplateContext } from '../../context/TemplateContext';
import { ElevatorSharp } from '@mui/icons-material';

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
  const profileImageRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
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
      await fetchChatRoomsMessages(list_);

      // 클라이언트가 존재하지 않는 경우에만 새로운 MQTT 클라이언트를 생성
      const mqttClient = mqtt.connect('ws://121.133.84.38:1884', {
        reconnectPeriod: 1000,
      }); // MQTT 브로커에 연결

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
        const { text, sender, timestamp, file } = parsedMessage; // file 추가

        try {
          setChatMessages((prevMessages) => ({
            ...prevMessages,
            [topic]: [
              ...(prevMessages[topic] || []),
              {
                sender: sender,
                text,
                timestamp: new Date(timestamp).toISOString(),
                file,
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
    };

    setMQTT();

    // console.log('클라이언트 있따');
    // const joinChat = list_.find(ele => location.pathname.includes(`${ele.chattingRoom.id}`));
    // //console.log(id);
    // if(client){
    //   client.subscribe(id, (err) => {
    //     if (!err) {
    //       console.log(id, 'Subscribed to topic');
    //     } else {
    //       console.error('Subscription error:', err);
    //     }
    //   });
    //   setSelectedUser(joinChat);
    //   fetchChatMessages(joinChat.chattingRoom.id);


    // 컴포넌트 언마운트 시 클라이언트 종료
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // 메시지 보내기 설정
  const sendMessage = async (text, fileBase64) => {
    if (!selectedUser || !selectedUser.chattingRoom) {
      alert("채팅방을 선택하세요.");
      return;
    }
    if (client && isConnected) {

      const base64 = fileBase64 ? fileBase64.replace('\"', '') : '';
      console.log(base64);
      const text1 = base64 ? base64 : text;
      const message = {
        text: text1,
        sender: localStorage.getItem('membersId'),
        timestamp: new Date(),
      };

      client.publish(`${selectedUser.chattingRoom.id}`, JSON.stringify(message));

      try {
        await submitMessage(selectedUser.chattingRoom.id, JSON.stringify(message.text), localStorage.getItem('membersId'));
        console.log('메시지 저장됨');
      } catch (error) {
        console.error('에러났당', error);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  const handleSendClick = () => {
    const input = document.querySelector("#chatInput");
    const text = input.value.trim();

    if (text || selectedFile) {
      sendMessage(text, selectedFile);
      input.value = '';
      inputRef.current.focus();
      setSelectedFile(null);
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

        <ChattingRoom setSelectedUser={setSelectedUser} loading={loading} data={data} client={client} setChatMessages={setChatMessages} fetchChatMessages={fetchChatMessages} chatMessages={chatMessages} id={id} />

        <div className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h2 className={styles.chatName2}>{selectedUser ? selectedUser.member.name : '채팅방을 선택하세요'}</h2>
            <div>
              <button className={styles.reviewButton} onClick={() => navigate(`/reviewdetails/${id}`)}>
                리뷰 작성 </button>
              <button className={styles.reviewButton} onClick={() => navigate(`/postDetails/${id}`)}>
                게시글 보러가기 </button>
            </div>
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
                        template.memberInfo.profile ? template.memberInfo.profile : defaultImage : //보내는 사람
                        selectedUser.member.profile ? selectedUser.member.profile : defaultImage} //받는 사람
                    alt="profile"
                    className={styles.profileImage}
                  />
                  <div className={styles.messageBubble}>
                    {!msg.text.startsWith('data:image') && <span>{msg.text}</span>}
                    {msg.text.startsWith('data:image') && (
                      <img
                        src={msg.text}
                        alt="uploaded"
                        className={styles.uploadedImage}
                      />
                    )}
                  </div>
                  <span className={`${styles.messageTime} ${msg.sender.toString() === localStorage.getItem('membersId') ? styles.sent : ''}`}>
                    {(new Date(msg.timestamp).toLocaleDateString() === new Date().toLocaleDateString() ? '' : new Date(msg.timestamp).toLocaleDateString())}
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>

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

            <input
              className={styles.attachmentButton}
              type="file"
              ref={profileImageRef}
              onChange={handleFileChange}
              multiple accept=".jpg,.jpeg,.png,.gif,.bmp"
              id="fileUpload"
              style={{ display: 'none' }}
            />

            <label htmlFor="fileUpload" className={styles.attachmentButton}>
              <img src="../images/filebutton.png" alt="Upload" />
            </label>
            <button className={styles.sendButton} onClick={handleSendClick}>
              <img src="../images/sendbutton.png" alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigChat;
