import React from 'react';
import styles from '../../styles/error/Error403Page.module.css';
import errorImage from '../../images/lockcomputer.png';  // 이미지 경로를 맞게 수정하세요

const Error403Page = () => {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.title}>403 Forbidden</h1>
      <img src={errorImage} alt="403 Forbidden" className={styles.image} />
      <p className={styles.message}>죄송합니다. 접근 권한이 없습니다</p>
      <div className={styles.buttons}>
        <button className={styles.button}>로그인 하러가기</button>
        <button className={styles.button}>홈으로 돌아가기</button>
      </div>
    </div>
  );
};

export default Error403Page;
