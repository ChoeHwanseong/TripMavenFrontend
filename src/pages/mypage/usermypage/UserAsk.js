import React, { useEffect, useState } from 'react';
import styles from '../../styles/usermypage/UserAsk.module.css';
import { useNavigate } from 'react-router-dom';
import { csfetchAllData } from '../../utils/csfetchData';

const InquiryHistory = () => {

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
          <h1>문의 내역</h1>
          <button className={styles.button} onClick={() => navigate('/useraskpage')}>문의 하기</button>
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
              <tr onClick={()=>{navigate(`/userAskDetailsView/${inquiry.id}`)}}>
                <td>{inquiry.id}</td>
                <td>{inquiry.title}</td>
                <td>{inquiry.createdAt.split('T')[0]}</td>
                <td>{inquiry.isActive ? '처리중' : '처리완료'}</td>
              </tr>
          ))} 
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span className={styles.pageControl}>&lt;</span>
          <span className={styles.pageNumber}>1</span>
          <span className={styles.pageControl}>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default InquiryHistory;
