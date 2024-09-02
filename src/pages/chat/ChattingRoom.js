import React, { useEffect, useState } from 'react';
import styles from '../../styles/chat/BigChat.module.css';
import { chattingRoomData, chattingListData } from '../../utils/chatData';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import mqtt from 'mqtt';

function ChattingRoom({ setSelectedUser, data, client, setIsConnected, setChatMessages }) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {

  }, []);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  }

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
      setChatMessages([]);
    }
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
            className={styles.chatItem}
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