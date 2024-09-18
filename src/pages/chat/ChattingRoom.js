import React, { useState } from 'react';
import styles from '../../styles/chat/BigChat.module.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ChattingRoom({ setSelectedUser, data, client, setChatMessages, fetchChatMessages, chatMessages}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  // 최근 메시지 시간 뿌리기
  const getLastMessageTime = (chatMessages, chattingRoomId) => {
    const messageTime = chatMessages[chattingRoomId] || [];

    if (messageTime.length === 0) {
      return ''; // 메시지가 없으면 빈 문자열 반환
    }

    const lastMessage = messageTime.reduce((latest, current) => {
      return new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current;
    });

    // 마지막 메시지의 날짜
    const lastMessageDate = new Date(lastMessage.timestamp);
    const now = new Date();

    // 마지막 메시지의 날짜가 오늘이면 시간만 반환
    if (lastMessageDate.toDateString() === now.toDateString()) {
      return lastMessageDate.toLocaleTimeString(); // 시간만 반환
    } else {
      // 어제 또는 그 이전이면 날짜와 시간 모두 반환
      return lastMessageDate.toLocaleDateString() + ' ' + lastMessageDate.toLocaleTimeString(); // 날짜와 시간 모두 반환
    }
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

      fetchChatMessages(joinChatting.chattingRoom.id);
      setSelectedUser(joinChatting);
    }
    navigate(`/bigchat/${joinChatting.chattingRoom.id}`);
  };

  return (

    <div className={styles.messagesSection}>
      <div className={styles.header}>
        <h2 className={styles.messagesTitle}>TripTalk</h2>
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
                backgroundColor: hoveredRow === index ? '#f0f0f0' : 'transparent',
                color: hoveredRow === index ? 'black' : 'inherit',
              }}
            >
              <img
                src={joinChatting.member.profile ? joinChatting.member.profile : "../images/defaultimage.png"}
                alt="profile"
                className={styles.profileImage}
              />
              <div className={styles.chatInfo}>
                <span className={styles.chatName}>{joinChatting.member.name}</span>
                <span className={styles.chatTime}>
                  <span>
                    {lastMessageTime ? lastMessageTime : '...'}
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
