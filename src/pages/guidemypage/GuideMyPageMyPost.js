// PostManagementPage.js
import React from 'react';

import { useNavigate } from 'react-router-dom';
import styles from '../../styles/guidemypage/guideMyPageMyPost.module.css';
const GuideMyPageMyPost = () => {
  const navigate = useNavigate();

  //나중에 db에서 불러오는 리스트
  const posts = [
    { id: 9621, location: '부산', title: '부산', date: '2024-08-01', status: '평가 완료', registration: '등록', likes: 9 },
    { id: 1212, location: '제주도', title: '제주도', date: '2023-12-31', status: '평가 완료', registration: '등록', likes: 2 },
    { id: 7681, location: '경주', title: '[경주 2박 3일] 경주월드#불국사#이금철 식당', date: '2024-03-19', status: '평가 대기', registration: '미등록', likes: 0 },
  ];

  return (
    <div className={styles.container}>

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
                <td onClick={()=>navigate('/guidemypagemypostdetails')}><div className={styles.postLinkPointer}>{post.title}</div></td>
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
