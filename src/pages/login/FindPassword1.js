import React, { useRef } from 'react';
import styles from '../../styles/login/FindPassword1.module.css';
import { useNavigate } from 'react-router-dom';
import { findMemberbyEmail } from '../../utils/memberData';

const FindPassword1 = () => {
  const navigate = useNavigate();
  const emailRef = useRef('');

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const res = await findMemberbyEmail(emailRef.current.value);
      if (emailRef.current.value === res.email)
        navigate(`/login/findpassword2?email=${res.email}&id=${res.id}`);
    } catch (error) {
    }
  }

  const handleEnterPress = async(e) => {
    
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick(e);
    }

  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TripMaven</h1>
      <p className={styles.subtitle}>비밀번호를 찾고자 하는 아이디를 입력해주세요.</p>
      <form className={styles.form}>
        <input type="text" className={styles.input} ref={emailRef} placeholder="아이디를 입력해주세요." onKeyDown={handleEnterPress} />
        <button type="button" className={styles.submitButton} onClick={handleClick}>다음</button>
      </form>
    </div>
  );
};

export default FindPassword1;
