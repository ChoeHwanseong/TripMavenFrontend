// PostManagementPage.js
import React from 'react';

import { useNavigate } from 'react-router-dom';
import styles from '../styles/GuideMyPageMyPost.module.css';
const GuideMyPageMyPost = () => {
  const navigate = useNavigate();


  const posts = [
    { id: 9621, location: '부산', title: '부산', date: '2024-08-01', status: '평가 완료', registration: '등록', likes: 9 },
    { id: 1212, location: '제주도', title: '제주도', date: '2023-12-31', status: '평가 완료', registration: '등록', likes: 2 },
    { id: 7681, location: '경주', title: '[경주 2박 3일] 경주월드#불국사#이금철 식당', date: '2024-03-19', status: '평가 대기', registration: '미등록', likes: 0 },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>My Page</h2>
        <ul className={styles.menu}>
          <li><button className={styles.navButton} onClick={()=>navigate('/profile')}>내 정보 관리</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/mypost')}>내 게시물 관리</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/inquiry')}>1:1문의 내역</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/chat')}>채팅방</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/mypageaiservice')}>ai 서비스</button></li>
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>내 게시물 관리</h1>
          <button className={styles.createButton}>게시물 등록 하기</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>작성번호</th>
              <th>지역</th>
              <th>제목</th>
              <th>작성일</th>
              <th>평가 여부</th>
              <th>등록 여부</th>
              <th>찜</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.location}</td>
                <td>{post.title}</td>
                <td>{post.date}</td>
                <td>{post.status}</td>
                <td>{post.registration}</td>
                <td>{post.likes}</td>
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

export default GuideMyPageMyPost;