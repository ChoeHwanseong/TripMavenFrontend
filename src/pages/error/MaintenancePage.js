import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.
import styles from '../../styles/error/MaintenancePage.module.css';
import maintenanceImage from '../../images/working.png';

const MaintenancePage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 처리

  const handleHomeClick = () => {
    navigate('/home'); // '/home' 경로로 이동
  };

  return (
    <div className={styles.maintenancePage}>
      <h1 className={styles.title}>Maintenance Mode</h1>
      <img src={maintenanceImage} alt="Maintenance Mode" className={styles.image} />
      <p className={styles.message}>
        죄송합니다. 서비스 점검 중입니다.<br />
        빠른 시간 안에 다시 찾아뵙겠습니다.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleHomeClick}>홈으로 돌아가기</button>
      </div>
    </div>
  );
};

export default MaintenancePage;
