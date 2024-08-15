import React, { useEffect, useState } from 'react';
import styles from '../../styles/adminmypage/AdminAsk.module.css';
import { useNavigate } from 'react-router-dom';
import { csfetchAllData } from '../../utils/csfetchData';
import { Box } from '@mui/material';

const AdminAsk = () => {

  const [inquiry, setInquiries] = useState([]);
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

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>1:1 문의 내역</h1>
          <div className={styles.admin}>
            <div className={styles.adminImage}>
              <img src="../../../images/defaultimage.png"/>
            </div>
            <span>관리자</span>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>작성번호</th>
              <th>아이디</th>
              <th>분류</th>
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
            onClick={()=>{navigate(`/adminAskDetailsView/${inquiry.id}`)}}
            sx={{
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                color : 'black',
                backgroundColor: '#D0F0FF',
              }
            }}>
              <td>{inquiry.id}</td>
              <td>{inquiry.member.name}</td>
              <td>{inquiry.member.role ? '고객' : '가이드'}</td>
              <td>{inquiry.title}</td>
              <td>{inquiry.createdAt.split('T')[0]}</td>
              <td>{inquiry.isActive ? '완료' : '미완료'}</td>
            </Box>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAsk;
