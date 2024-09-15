import React, { useState } from 'react';
import styles from '../../styles/chat/BigChat.module.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { chattingRoomData } from '../../utils/chatData';

function ChattingRoom({ setSelectedUser, data, client, setChatMessages, fetchChatMessages, chatMessages, loading }) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  // 특정 채팅방의 가장 최신 메시지 시간 찾기
  const getLastMessageTime = (chatMessages, chattingRoomId) => {
    const messagesInRoom = chatMessages.filter(msg => msg.chattingRoomId === chattingRoomId);

    if (messagesInRoom.length === 0) 
      return null;
  
    const lastMessage = messagesInRoom.reduce((latest, current) => {
      return new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current;
    });
  
    return lastMessage.timestamp;
  };

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
        {data.map((joinChatting, index) => {
          const lastMessageTime = getLastMessageTime(chatMessages, joinChatting.chattingRoom.id);
          
          return (
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
                <span className={styles.chatTime}>
                <span>
                  {lastMessageTime}
                  </span>
                </span>
              </div>
            </Box>
          );
        })}
      </div>
    </div>
  );
}

export default ChattingRoom;
