import React from 'react';
import styles from '../styles/UserAsk.module.css';
import { useNavigate } from 'react-router-dom';

const InquiryHistory = () => {
  const navigate = useNavigate();
  const inquiries = [
    { id: 9621, title: '탈퇴 프로세스', date: '2024-08-01', status: '처리중' },
    { id: 9622, title: '게시글 작성 문의', date: '2023-12-31', status: '처리 완료' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>My Page</h2>
        <ul>
          <li><button className={styles.navButton} onClick={()=>navigate('/userprofile')}>내 정보 관리</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/userreview')}>이용후기</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/userask')}>1:1문의 내역</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/userask')}>찜 목록</button></li>
          <li>채팅방</li>
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2>문의 내역</h2>
          <button className={styles.button}>문의 하기</button>
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
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{inquiry.id}</td>
                <td>{inquiry.title}</td>
                <td>{inquiry.date}</td>
                <td>{inquiry.status}</td>
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
