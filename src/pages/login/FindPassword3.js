import React from 'react';
import styles from '../../styles/login/FindPassword3.module.css';

const FindPassword3 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비밀번호 재설정</h1>

      <div className={styles.section}>
        <p className={styles.subtitle}>
          트립 메이븐 아이디 : <span className={styles.username}>skdaksdkdl123</span>
        </p>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <input type="password" className={styles.input} placeholder="새 비밀번호" />
          </div>
          <div className={styles.formGroup}>
            <input type="password" className={styles.input} placeholder="새 비밀번호 확인" />
          </div>
        </form>
        <p className={styles.note}>
          - 영문, 숫자, 특수문자를 함께 사용하면 (8자 이상 16자 이하)보다 안전합니다.<br />
          - 다른 사이트와 다른 트립메이븐의 아이디와의 비밀번호를 만들어 주세요.
        </p>
      </div>

      <button type="button" className={styles.submitButton}>확인</button>
    </div>
  );
};

export default FindPassword3;
