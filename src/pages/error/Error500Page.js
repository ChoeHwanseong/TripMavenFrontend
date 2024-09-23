import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.
import styles from '../../styles/error/Error403Page.module.css';
import errorImage from '../../images/servererrorcomputer.png';

const Error500Page = () => {
  const navigate = useNavigate(); // useNavigate 훅으로 페이지 이동 처리

  const handleHomeClick = () => {
    navigate('/home'); // '/home' 경로로 이동
  };

  const handleReloadClick = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.title}>500 Internal Server Error</h1>
      <img src={errorImage} alt="500 Internal Server Error" className={styles.image} />
      <p className={styles.message}>
        죄송합니다. 페이지가 작동하지 않습니다.<br />
        현재 TripMaven서버에서 문제가 발생하여 요청을 처리할 수 없습니다.<br />
        잠시후 다시 시도해주세요
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleHomeClick}>홈으로 돌아가기</button>
        <button className={styles.button} onClick={handleReloadClick}>새로고침</button>
      </div>
    </div>
  );
};

export default Error500Page;
