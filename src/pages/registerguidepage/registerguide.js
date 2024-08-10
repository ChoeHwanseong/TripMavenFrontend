import React from 'react';
import styles from '../../styles/registerguidepage/registerGuide.module.css';
import { AiOutlinePaperClip } from 'react-icons/ai';

const GuideRegistration = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>가이드 등록</h1>
      
      <div className={styles.fieldGroup}>
        <label className={styles.label}>자격증</label>
        <div className={styles.inputFile}>
          <AiOutlinePaperClip style={{ marginRight: '10px' }} />
          <span>파일을 넣어주세요</span>
          <input type="file" />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>자기소개</label>
        <textarea 
          className={styles.textarea} 
          placeholder="자기소개를 입력해주세요 30자 이상 500자 이하" 
        />
      </div>

      <button className={styles.button}>등록</button>
    </div>
  );
};

export default GuideRegistration;
