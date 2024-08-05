// InquiryPage.js
import React from 'react';
import styles from '../styles/Inquiry.module.css';

const Inquiry = () => {
  const inquiries = [
    { id: 9621, userId: 'kim', type: '가이드', title: '', date: '2024-08-01', status: '처리 완료' },
    { id: 1212, userId: 'lee', type: '일반 고객', title: '', date: '2023-12-31', status: '처리 완료' },
    { id: 9622, userId: 'park', type: '가이드', title: '가이드 등록을 했는데 게시글이 올라가지 않아요', date: '2024-03-19', status: '처리 완료' },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>My Page</h2>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>내 정보 관리</li>
          <li className={styles.menuItem}>내 게시물 관리</li>
          <li className={`${styles.menuItem} ${styles.active}`}>1:1문의 내역</li>
          <li className={styles.menuItem}>찜 목록</li>
          <li className={styles.menuItem}>채팅방</li>
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>문의 내역</h1>
          <button className={styles.inquiryButton}>문의 하기</button>
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

export default Inquiry;
