import React, { useState } from 'react';
import styles from '../../styles/csboard/FAQ.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 활성화된 탭을 관리하는 상태 추가

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    setActiveIndex(null); // 탭을 변경할 때 질문을 닫기 위해 설정
  };

  return (
    <div className={styles.faq}>
      <h1 className={styles.title}>FAQ</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}
          onClick={() => handleTabClick(0)}
        >
          서비스 소개
        </button>
        <button
          className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}
          onClick={() => handleTabClick(1)}
        >
          이용 방법
        </button>
        <button
          className={`${styles.tab} ${activeTab === 2 ? styles.active : ''}`}
          onClick={() => handleTabClick(2)}
        >
          결제
        </button>
        <button
          className={`${styles.tab} ${activeTab === 3 ? styles.active : ''}`}
          onClick={() => handleTabClick(3)}
        >
          취소/환불
        </button>
        <button
          className={`${styles.tab} ${activeTab === 4 ? styles.active : ''}`}
          onClick={() => handleTabClick(4)}
        >
          가이드 등록
        </button>
      </div>
      <div className={styles.questions}>
        {activeTab === 0 && (
          <div className={styles.tabContent}>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={styles.question}
                onClick={() => handleToggle(index)}
              >
                <div className={styles.questionTitle}>
                  서비스 소개 관련 질문 {index + 1}가 궁금한가요?
                  <span className={styles.arrow}>
                    {activeIndex === index ? '▲' : '▼'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className={styles.answer}>
                    여기에 서비스 소개 관련 질문에 대한 답변이 들어갑니다.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {activeTab === 1 && (
          <div className={styles.tabContent}>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={styles.question}
                onClick={() => handleToggle(index)}
              >
                <div className={styles.questionTitle}>
                  이용 방법 관련 질문 {index + 1}가 궁금한가요?
                  <span className={styles.arrow}>
                    {activeIndex === index ? '▲' : '▼'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className={styles.answer}>
                    여기에 이용 방법 관련 질문에 대한 답변이 들어갑니다.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {activeTab === 2 && (
          <div className={styles.tabContent}>
            
          </div>
        )}
        {activeTab === 3 && (
          <div className={styles.tabContent}>
            
          </div>
        )}
        {activeTab === 4 && (
          <div className={styles.tabContent}>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
