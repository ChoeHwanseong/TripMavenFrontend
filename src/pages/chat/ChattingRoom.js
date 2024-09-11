import React, { useState } from 'react';
import styles from '../../styles/chat/BigChat.module.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';
import { getMessages } from '../../utils/chatData';

function ChattingRoom({ setSelectedUser, data, client, setChatMessages, fetchChatMessages}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();



  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  }

  /*
  const fetchChatMessages = async (chattingRoomId) => {
    try {
      const response = await getMessages(chattingRoomId); 
      console.log('Fetched messages response:', response);  // 더 구체적으로 확인하기 위한 로그
      if (response) {
        setChatMessages(response); 
      } else {
        console.log('No messages received');
      }
    } catch (error) {
      console.error('메시지 불러오기 에러:', error);
    }
  };
  */

  const handleClick = (joinChatting) => {
    if (client && joinChatting.chattingRoom) {
      client.subscribe(`${joinChatting.chattingRoom.id}`, (err) => {
        if (!err) {
          console.log(joinChatting.chattingRoom.id, 'Subscribed to topic');
        } else {
          console.error('Subscription error:', err);
        }
      });
      setSelectedUser(joinChatting);
      fetchChatMessages(joinChatting.chattingRoom.id);
      setChatMessages([]);
      
    }
    navigate(`/bigchat/${joinChatting.chattingRoom.id}`);
  };


  

  return (

    <div className={styles.messagesSection}>
      <div className={styles.header}>
        <h2 className={styles.messagesTitle}>Messages</h2>
        <div className={styles.searchNewChat}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>

      <div className={styles.chatList}>
        {data.map((joinChatting, index) => (
          <Box
            key={index}
            className={`${styles.chatItem} ${joinChatting.chattingRoom.id}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(joinChatting)}
            sx={{
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              backgroundColor: hoveredRow === index ? '#D0F0FF' : 'transparent',
              color: hoveredRow === index ? 'black' : 'inherit',
            }}
          >
            <img
              src={joinChatting.member.profileImage ? joinChatting.member.profileImage : "../images/defaultimage.png"}
              alt="profile"
              className={styles.profileImage}
            />
            <div className={styles.chatInfo}>
              <span className={styles.chatName}>{joinChatting.member.name}</span>
              <span className={styles.chatTime}>{joinChatting.lastMessageTime ? joinChatting.lastMessageTime : "00:00"}</span>
            </div>
          </Box>
        ))}
      </div>
    </div>

  );
};

export default ChattingRoom;