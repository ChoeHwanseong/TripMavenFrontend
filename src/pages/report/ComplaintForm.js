import React from 'react';
import styles from '../../styles/report/complaintForm.module.css';

const ComplaintForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Complaint</h1>
      <div className={styles.formContainer}>
        <p className={styles.question}>
          <strong>dlwns0784</strong> 님을 신고하시겠습니까?
        </p>
        <ul className={styles.checkboxList}>
          <li>
            <label>
              <input type="checkbox" />
              불친절한 태도
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              부정확한 정보
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              혐오 발언
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              공격적인 언어 사용
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              예약 불이행
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              기타
            </label>
          </li>
        </ul>
        <textarea className={styles.textarea} placeholder="추가 내용을 입력하세요"></textarea>
        <button className={styles.submitButton}>신고하기</button>
      </div>
    </div>
  );
};

export default ComplaintForm;
