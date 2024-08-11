import React from 'react';
import styles from '../../styles/usermypage/UserAskPage.module.css';

const UserAskPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>문의 하기</h1>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>제목을 입력하세요</label>
          <div className={styles.inputGroup}>
            <input type="text" className={styles.input} />
            <button type="button" className={styles.confirmButton}>확인</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>내용을 입력하세요</label>
          <textarea className={styles.textarea} />
        </div>

        <button type="submit" className={styles.submitButton}>등록 하기</button>
      </form>
    </div>
  );
};

export default UserAskPage;
