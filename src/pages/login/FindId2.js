import React from 'react';
import styles from '../../styles/login/FindId2.module.css';
import { useNavigate } from 'react-router-dom';

const FindID2 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>아이디 찾기</h1>
      <p className={styles.description}>고객님의 정보와 일치하는 아이디 목록입니다.</p>

      <div className={styles.idList}>
        <label className={styles.radioLabel}>
          <input type="radio" name="selectedID" />
          skdaksdkdl123 <span className={styles.signupDate}>가입: 2012.03.20</span>
        </label>
        <label className={styles.radioLabel}>
          <input type="radio" name="selectedID" />
          skdaksdktka123213 <span className={styles.signupDate}>가입: 2017.03.20</span>
        </label>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.loginButton}  onClick={()=>navigate('/login')}>로그인하기</button>
        <button type="button" className={styles.findPasswordButton}  onClick={()=>navigate('/findpassword1')}>비밀번호 찾기</button>
      </div>
    </div>
  );
};

export default FindID2;
