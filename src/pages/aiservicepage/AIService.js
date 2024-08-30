import React, { useState } from 'react';
import styles from '../../styles/aiservicepage/AIService.module.css';
import mockTestImage from '../../images/mockTestImage.png'; // replace with actual path
import realTestImage from '../../images/realTestImage.png'; // replace with actual path
import { useNavigate } from 'react-router-dom';
import QuizTutorial from '../aiservicepage/QuizTutorial'; // QuizTutorial 경로로 변경 필요
import { Modal } from '@mui/material'; // MUI의 Modal 컴포넌트 추가

const AIService = () => {
  const navigate = useNavigate();
  const [isQuizModalOpen, setQuizModalOpen] = useState(false); // 모달 상태 추가

  // 페이지 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 버튼 클릭 시 페이지 이동 및 스크롤 처리
  const handleClick = (path) => {
    navigate(path);
    scrollToTop();
  };

  // 모달 열기 및 닫기
  const handleOpenQuizModal = () => setQuizModalOpen(true);
  const handleCloseQuizModal = () => setQuizModalOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={mockTestImage} alt="Mock Test" style={{ width: '215px' }} />
        </div>
        <h2 className={styles.cardTitle}>발음 테스트</h2>
        <p className={styles.cardDescription}>
          정확한 발음을 연습하고 싶다면?<br/>AI가 맞춤 제작한 발음 테스트로<br/>
          자신 있게 도전해보세요!
        </p>
        <button className={styles.button} onClick={() => { handleClick('') }}>시작하기</button>
      </div>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={"../../images/quizImg.png"} alt="Quiz" style={{ width: '260px' }} />
        </div>
        <h2 className={styles.cardTitle}>퀴즈 맞추기</h2>
        <p className={styles.cardDescription}>
          여행지 가이드 실력을 연습하고 싶다면?<br/>모의 테스트로 준비하세요!
        </p>
        <button className={styles.button} onClick={handleOpenQuizModal} style={{ marginTop: '35px' }}>시작하기</button>
      </div>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={realTestImage} alt="Real Test" style={{ width: '220px', marginRight: '20px' }} />
        </div>
        <h2 className={styles.cardTitle}>실전 테스트</h2>
        <p className={styles.cardDescription}>
          내 여행지 소개 실력을 평가받고 싶다면?<br/>실전 테스트로 도전하세요!
        </p>
        <button className={styles.button} onClick={() => { handleClick('/recordcheck') }} style={{ marginTop: '35px' }}>시작하기</button>
      </div>

      {/* 모달 추가 */}
      <Modal open={isQuizModalOpen} onClose={handleCloseQuizModal}>
        <div className={styles.modalContent}> {/* 모달 스타일 추가 필요 */}
          <QuizTutorial userId={null} /> {/* 필요한 경우 userId 전달 */}
        </div>
      </Modal>
    </div>
  );
};

export default AIService;
