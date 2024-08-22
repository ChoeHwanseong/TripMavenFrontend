import React, { useEffect, useState } from 'react';
import styles from '../../styles/chat/BigChat.module.css';
import { fetchData } from '../../utils/memberData';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ChattingRoom({ onSelectUser }) {

  const [data, setData] = useState([]); 
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
    const getData = async () => {
        try {
          const fetchedData = await fetchData();
          setData(fetchedData);  // 가져온 데이터를 상태에 저장
        } catch (error) {
          console.error('에러났당', error);
        }
      };

      getData();
    }, []);

    const handleMouseEnter = (index) => {
        setHoveredRow(index);
      };
    
      const handleMouseLeave = () => {
        setHoveredRow(null);
      }
    
      const handleClick = (user) => {
        onSelectUser(user);
        navigate(`/BigChat/${user.id}`);
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
              {data.map((user, index) => (
                 <Box
                 key={index}
                 className={styles.chatItem}
                 onMouseEnter={() => handleMouseEnter(index)}
                 onMouseLeave={handleMouseLeave}
                 onClick={() => handleClick(user)}
                 sx={{
                   cursor: 'pointer',
                   transition: 'background-color 0.3s',
                   backgroundColor: hoveredRow === index ? '#D0F0FF' : 'transparent',
                   color: hoveredRow === index ? 'black' : 'inherit',
                 }}
               >
                  <img
                    src={user.profileImage ? user.profileImage : "../images/defaultimage.png"} 
                    alt="profile"
                    className={styles.profileImage}
                  />
                  <div className={styles.chatInfo}>
                    <span className={styles.chatName}>{user.name}</span>
                    <span className={styles.chatTime}>{user.lastMessageTime ? user.lastMessageTime : "00:00"}</span> 
                  </div>
                </Box>
            ))} 
</div>
</div>

        );
    };
  
export default ChattingRoom;