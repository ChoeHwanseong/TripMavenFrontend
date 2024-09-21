import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 가져옵니다
import styles from '../../styles/error/Error403Page.module.css';
import errorImage from '../../images/lockcomputer.png';

const Error403Page = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleHomeClick = () => {
    navigate('/home'); // home 페이지로 이동
  };

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.title}>403 Forbidden</h1>
      <img src={errorImage} alt="403 Forbidden" className={styles.image} />
      <p className={styles.message}>죄송합니다. 접근 권한이 없습니다</p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleLoginClick}>로그인 하러가기</button>
        <button className={styles.button} onClick={handleHomeClick}>홈으로 돌아가기</button>
      </div>
    </div>
  );
};

export default Error403Page;
