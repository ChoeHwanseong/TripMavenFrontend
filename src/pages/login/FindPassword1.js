import React from 'react';
import styles from '../../styles/login/FindPassword1.module.css';
import { useNavigate } from 'react-router-dom';

const FindPassword1 = () => {
  const navigate = useNavigate();


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TripMaven</h1>
      <p className={styles.subtitle}>비밀번호를 찾고자 하는 아이디를 입력해주세요.</p>
      <form className={styles.form}>
        <input type="text" className={styles.input} placeholder="아이디를 입력해주세요." />
        <button type="submit" className={styles.submitButton} onClick={()=>navigate('/findpassword2')}>다음</button>
        <button type="button" className={styles.findIdButton}  onClick={()=>navigate('/findId1')}>아이디 찾기</button>

      </form>
    </div>
  );
};

export default FindPassword1;
