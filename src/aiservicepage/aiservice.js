import React from 'react';
import styles from '../styles/AIService.module.css';
import mockTestImage from '../images/mockTestImage.png'; // replace with actual path
import realTestImage from '../images/realTestImage.png'; // replace with actual path

const TestCards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={mockTestImage} alt="Mock Test" style={{ width: '100%' }} />
        </div>
        <h2 className={styles.cardTitle}>모의 테스트</h2>
        <p className={styles.cardDescription}>
          여행지 가이드 실력을 연습하고 싶다면? 모의 테스트로 준비하세요!
        </p>
        <button className={styles.button}>시작하기</button>
      </div>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={realTestImage} alt="Real Test" style={{ width: '100%' }} />
        </div>
        <h2 className={styles.cardTitle}>실전 테스트</h2>
        <p className={styles.cardDescription}>
          내 여행지 소개 실력을 평가받고 싶다면? 실전 테스트로 도전하세요!
        </p>
        <button className={styles.button}>시작하기</button>
      </div>
    </div>
  );
};

export default TestCards;
