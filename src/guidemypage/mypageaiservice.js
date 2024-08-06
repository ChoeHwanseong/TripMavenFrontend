// AiServicePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/GuideMyPageAIService.module.css';

const GuideMyPageAiService = () => {
  const navigate = useNavigate();


  const aiEvaluations = [
    { id: 9621, type: '모의테스트', description: '우도 히든 스팟 탐험: 함께 떠나는 특별한 여행 (중급)', date: '2024-08-01', score: 80 },
    { id: 1212, type: '실전 테스트', description: '우도에서 즐기는 완벽한 하루: 가이드와 함께하는 숨은 명소 탐방 (실행)', date: '2023-12-31', score: 60 },
    { id: 9622, type: '모의테스트', description: '우도 여행 가이드: 섬 속의 작은 낙원 탐방 (기초)', date: '2024-03-19', score: 40 },
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
        <h1 className={styles.title}>AI 서비스</h1>
        <div className={styles.charts}>
          <div className={styles.chart}>
            <h2>가장 마지막</h2>
            <img src="/path/to/chart1.jpg" alt="가장 마지막" />
          </div>
          <div className={styles.chart}>
            <h2>최근 3개월</h2>
            <img src="/path/to/chart2.jpg" alt="최근 3개월" />
          </div>
          <div className={styles.chart}>
            <h2>최근 6개월</h2>
            <img src="/path/to/chart3.jpg" alt="최근 6개월" />
          </div>
          <div className={styles.chart}>
            <h2>최근 1년</h2>
            <img src="/path/to/chart4.jpg" alt="최근 1년" />
          </div>
        </div>

        <div className={styles.evaluationScore}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreText}>내 평균점수는</span>
            <span className={styles.scoreNumber}>60</span>
            <span className={styles.scoreText}>점입니다</span>
          </div>
          <button className={styles.aiButton}>AI 교육 들어보기</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>검사번호</th>
              <th>분류</th>
              <th>AI 평가항목</th>
              <th>작성일</th>
              <th>평균 점수</th>
            </tr>
          </thead>
          <tbody>
            {aiEvaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td>{evaluation.id}</td>
                <td>{evaluation.type}</td>
                <td>{evaluation.description}</td>
                <td>{evaluation.date}</td>
                <td>{evaluation.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span>&lt;</span>
          <span className={styles.currentPage}>1</span>
          <span>&gt;</span>
        </div>

        <div className={styles.buttons}>
          <button className={styles.button}>선택삭제</button>
          <button className={styles.button}>모의 테스트 결과 목록</button>
          <button className={styles.button}>실전 테스트 결과 목록</button>
        </div>
      </main>
    </div>
  );
};

export default GuideMyPageAiService;
