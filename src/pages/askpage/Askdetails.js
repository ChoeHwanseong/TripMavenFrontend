import React from 'react';
import styles from '../../styles/askpage/AskDetails.module.css';
import { useNavigate } from 'react-router-dom';

const AskDetails = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>문의 하기</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>제목을 입력하세요</label>
          <input type="text" id="title" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>내용을 입력하세요</label>
          <textarea id="content" className={styles.textarea}></textarea>
        </div>
        <button className={styles.submitButton} onClick={() => navigate('/askall')}>등록 하기</button>
      </div>
    </div>
  );
};

export default AskDetails;
