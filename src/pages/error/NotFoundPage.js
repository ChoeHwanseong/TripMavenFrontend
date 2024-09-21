import React from 'react';
import styles from '../../styles/error/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Not Found</h1>
      <img className={styles.image} src='../../images/sadcomputer.png' alt="404 Error" />
      <p className={styles.message}>
        죄송합니다. 해당 페이지를 찾을 수 없습니다.<br />
        원하시는 결과를 찾을 수 없습니다. 올바른 URL을 입력하였는지 확인하세요.
      </p>
      <button className={styles.button} onClick={() => window.location.href = '/'}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;