// InquiryDetails.js
import React from 'react';

import { useNavigate } from 'react-router-dom';
import styles from '../../styles/guidemypage/GuideMyPageInquiryDetails.module.css';
import SideMenu from '../../components/sideMenu';
const GuideMyPageInquiryDetails = () => {
  const navigate = useNavigate();


  const inquiries = [
    { id: 9621, userId: 'kim', type: '가이드', title: '', date: '2024-08-01', status: '처리 완료' },
    { id: 1212, userId: 'lee', type: '일반 고객', title: '', date: '2023-12-31', status: '처리 완료' },
    { id: 9622, userId: 'park', type: '가이드', title: '가이드 등록을 했는데 게시글이 올라가지 않아요', date: '2024-03-19', status: '처리 완료' },
  ];

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
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{inquiry.id}</td>
                <td>{inquiry.userId}</td>
                <td>{inquiry.type}</td>
                <td>{inquiry.title}</td>
                <td>{inquiry.date}</td>
                <td>{inquiry.status}</td>
              </tr>
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

export default GuideMyPageInquiryDetails;