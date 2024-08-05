import React from 'react';
import styles from '../styles/AdminAsk.module.css';

const InquiryHistory = () => {
  const inquiries = [
    {
      inquiryId: 9621,
      username: 'kim',
      role: '가이드',
      title: '탈퇴 프로세스',
      date: '2024-08-01',
      status: '처리중',
    },
    {
      inquiryId: 1212,
      username: 'lee',
      role: '일반 고객',
      title: '게시글 작성 문의',
      date: '2023-12-31',
      status: '처리 완료',
    },
    {
      inquiryId: 9622,
      username: 'park',
      role: '가이드',
      title: '가이드 등록을 했는데 게시글이 올라가지 않아요',
      date: '2024-03-19',
      status: '처리 완료',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>My Page</h2>
        <ul>
          <li>내 정보 관리</li>
          <li>회원 목록</li>
          <li>1:1문의 내역</li>
          <li>신고 내역</li>
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2>1:1 문의 내역</h2>
          <div className={styles.admin}>
            <div className={styles.adminIcon}>
              <span>👤</span>
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
            {inquiries.map((inquiry) => (
              <tr key={inquiry.inquiryId}>
                <td>{inquiry.inquiryId}</td>
                <td>{inquiry.username}</td>
                <td>{inquiry.role}</td>
                <td>{inquiry.title}</td>
                <td>{inquiry.date}</td>
                <td>{inquiry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryHistory;
