import React from 'react';
import styles from '../../styles/error/Error400Page.module.css';
import errorImage from '../../images/Error400.png'; // Adjust the path if necessary

const Error400Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>400 Bad Request</h1>
      <img src={errorImage} alt="Error" className={styles.errorImage} />
      <p className={styles.message}>
        죄송합니다. 유효하지 않은 요청입니다. <br />
        입력하신 정보를 다시 확인해주세요.
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>로그인 하러가기</button>
        <button className={styles.button}>홈으로 돌아가기</button>
      </div>
    </div>
  );
};

export default Error400Page;
