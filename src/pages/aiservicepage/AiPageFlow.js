import React from 'react';
import styles from '../../styles/aiservicepage/AiPageFlow.module.css';

const AiPageFlow = () => {
  return (
    <div className={styles.container}>

      {/* 순환형 흐름 섹션
      <div className={styles.flowContainer}>
        {/* 단계 1: Guide's Post Creation
        <div className={`${styles.flowItem} ${styles.step1}`}>
          <div className={styles.flowTitle} style={{ backgroundColor: '#4da6ff' }}>Guide's Post Creation</div>
        </div>

       단계 2: Test Opportunity
        <div className={`${styles.flowItem} ${styles.step2}`}>
          <div className={styles.flowTitle}>Test Opportunity</div>
        </div>

        단계 3: AI System and Data Analysis
        <div className={`${styles.flowItem} ${styles.step3}`}>
          <div className={styles.flowTitle}>AI System and Data Analysis</div>
        </div>

       단계 4: Feedback and Evaluation
        <div className={`${styles.flowItem} ${styles.step4}`}>
          <div className={styles.flowTitle}>Feedback and Evaluation</div>
        </div>

         단계 5: Improvement and Retest
        <div className={`${styles.flowItem} ${styles.step5}`}>
          <div className={styles.flowTitle}>Improvement and Retest</div>
        </div>

       중앙의 타이틀 
        <div className={styles.centerTitle}>
          <h1>TripMaven</h1>
        </div>
      </div> */}

      {/* 설명 섹션 */}
      <div className={styles.descriptionSection}>
        <div className={styles.descriptionItem}>
          <div className={styles.label} style={{ backgroundColor: '#4da6ff' }}>Guide's Post Creation</div>
          <p className={styles.descText}>
            가이드가 게시글을 작성하고, 해당 게시글을 통해 추후 AI 테스트 기회 및 분석을 제공할 수 있는 기반을 마련합니다.
          </p>
        </div>

        <div className={styles.descriptionItem}>
          <div className={styles.label}>Test Opportunity</div>
          <p className={styles.descText}>
            작성된 게시글을 기반으로 AI 시스템을 통한 테스트 기회를 제공하는 단계입니다.
          </p>
        </div>

        <div className={styles.descriptionItem}>
          <div className={styles.label}>AI System and Data Analysis</div>
          <p className={styles.descText}>
            AI 시스템이 표정, 눈 깜박임, 목소리 톤 등을 분석하여 데이터를 수집하는 단계입니다.
          </p>
        </div>

        <div className={styles.descriptionItem}>
          <div className={styles.label}>Feedback and Evaluation</div>
          <p className={styles.descText}>
            분석된 데이터를 기반으로 가이드에게 AI 평가 점수 및 피드백을 제공합니다.
          </p>
        </div>

        <div className={styles.descriptionItem}>
          <div className={styles.label}>Improvement and Retest</div>
          <p className={styles.descText}>
            가이드는 피드백을 기반으로 개선하고 재테스트를 진행할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiPageFlow;
