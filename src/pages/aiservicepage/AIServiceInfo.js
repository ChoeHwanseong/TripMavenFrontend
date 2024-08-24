import React from 'react';
import styles from '../../styles/aiservicepage/AIServiceInfo.module.css';
import { useNavigate } from 'react-router-dom';

const AiServiceInfo = () => {

    const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2><img src="../../../images/TripMavenLogo.png"/> 의 AI는 당신의 여행 가이드 실력을 한 단계 업그레이드합니다!</h2>
      <h3 className={styles.description}>
        TripMaven의 AI는 말과 행동, 시선, 표정을 분석할 수 있고 나만을 위한 맞춤형 퀴즈도 제작해줍니다.<br />
        여행지 소개, 고객 응대 등 다양한 스킬을 평가받고 항상시켜 보세요.
      </h3>
      <div className={styles.features}>
        <div className={styles.feature}>
          <img src="/path-to-your-image-stt.jpg" alt="음성인식 기술" className={styles.featureImage} />
          <p className={styles.featureTitle}>음성인식 기술 (STT)</p>
        </div>
        <div className={styles.feature}>
          <img src="/path-to-your-image-nlp.jpg" alt="자연어 처리기술" className={styles.featureImage} />
          <p className={styles.featureTitle}>자연어 처리기술(NLP)</p>
        </div>
        <div className={styles.feature}>
          <img src="/path-to-your-image-multimodal.jpg" alt="멀티모달 기술" className={styles.featureImage} />
          <p className={styles.featureTitle}>멀티모달 기술</p>
        </div>
      </div>
      <button className={styles.actionButton} onClick={()=>{navigate('/aiservice')}}>지금 도전하기</button>
    </div>
  );
};

export default AiServiceInfo;
