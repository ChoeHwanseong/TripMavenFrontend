// InquiryDetails.js
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from '../../styles/guidemypage/GuideAskDetails.module.css';

import { Box } from '@mui/material';
import { csfetchAllData } from '../../utils/csfetchAllData';

const GuideAskDetails = () => {

  const [inquiries, setInquiries] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCSData = async () => {
      try {
        const fetchedData = await csfetchAllData();
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

  const handleClick = (inquiry) => {
    navigate('/guideaskdetailsview');
    
  };


  return (
    <div className={styles.container}>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>문의 내역</h1>
          <button className={styles.inquiryButton} onClick={()=>navigate('/guideMyPageInquiry')}>문의 하기</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>작성번호</th>
              <th>아이디</th>
              <th>분류</th>
              <th>제목</th>
              <th>작성일</th>
              <th>처리 상태</th>
            </tr>
          </thead>
          <tbody>

          {inquiries.map((inquiry, index) => (
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
                  <td>{inquiry.member.name}</td>
                  <td>{inquiry.member.role}</td>
                  <td><div className={styles.postLinkPointer}>{inquiry.title}</div></td>
                  <td>{inquiry.createdAt.split('T')[0]}</td> {/* 날짜만 표시 */}
                  <td>{inquiry.isactive?'유':'무'}</td> {/* 상태 표시 */}
                  </Box>
              ))} 

          </tbody>
        </table>

        <div className={styles.pagination}>
          <span>&lt;</span>
          <span className={styles.currentPage}>1</span>
          <span>&gt;</span>
        </div>
      </main>
    </div>
  );

};

export default GuideAskDetails;
