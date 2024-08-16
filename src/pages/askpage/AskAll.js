import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from '../../styles/askpage/AskAll.module.css';

import { Box } from '@mui/material';
import { csAllget } from '../../utils/csData';


const AskAll = () => {
    const [inquiry, setInquiries] = useState([]);
    const [hoveredRow, setHoveredRow] = useState(null);
    const membersId= localStorage.getItem('membersId');

    const navigate = useNavigate();

    useEffect(() => {
      const getCSData = async () => {
        try {
          const fetchedData = await csAllget();
          console.log('fetchedData ',fetchedData);
          setInquiries(fetchedData);
        } catch (error) {
          console.error('에러났당', error);
        }
      };


      getCSData();
    }, []);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  }

  const handleClick = () => {
    navigate(`/askdetailsview/${membersId}`);
  };
  


  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>문의 내역</h1>
          <button className={styles.button} onClick={() => navigate(`/askdetails/${membersId}`)}>문의 하기</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
              <th>처리상태</th>
            </tr>
          </thead>
          <tbody>
          {inquiry.map((inquiry, index) => (
                <Box
                component="tr"
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(inquiry)}
                sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    color : 'black',
                    backgroundColor: '#D0F0FF',
                  },
                }}
              >      
                  <td>{inquiry.id}</td>
                  <td><div className={styles.postLinkPointer}>{inquiry.title}</div></td>
                  <td>{inquiry.createdAt.split('T')[0]}</td> {/* 날짜만 표시 */}
                  <td>{inquiry.isactive?'처리완료':'처리중'}</td> {/* 상태 표시 */}
                  </Box>
              ))}
          </tbody>
          
        </table>

        <div className={styles.pagination}>
          <span>&lt;</span>
          <span className={styles.currentPage}>1</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );

};



export default AskAll;