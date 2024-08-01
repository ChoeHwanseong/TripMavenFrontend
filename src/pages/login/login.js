import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import travelImage from '../images/travel.jpg';

const Login = () => {
  const [showMember, setShowMember] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.width = '100%';
    document.body.style.background = 'linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%)';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.backgroundImage = `url(${travelImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.flexDirection = 'column';

    return () => {
      document.body.style.height = '';
      document.body.style.width = '';
      document.body.style.background = '';
      document.body.style.display = '';
      document.body.style.justifyContent = '';
      document.body.style.alignItems = '';
      document.body.style.backgroundImage = '';
      document.body.style.flexDirection = '';
    };
  }, []);

  return (
    <div className={styles['login-page']}>
      <input
        type="checkbox"
        id="showMember"
        checked={showMember}
        onChange={() => setShowMember(!showMember)}
        style={{ display: 'none' }}
      />
      <input
        type="checkbox"
        id="showSignup"
        checked={showSignup}
        onChange={() => setShowSignup(!showSignup)}
        style={{ display: 'none' }}
      />
      <input type="checkbox" id="showMainMenu" style={{ display: 'none' }} />

      <label htmlFor="showMember" className={styles['show-btn']}>로그인</label>
      <label htmlFor="showSignup" className={styles['show-btn']}>회원가입</label>
      <label htmlFor="showMainMenu" className={styles['show-btn']}>메인화면</label>

      {showMember && (
        <div className={`${styles.container} ${showMember ? styles.show : ''}`} id="memberContainer">
          <span className={styles['close-btn']} onClick={() => setShowMember(false)}>&times;</span>
          <div className={styles.text}>Login</div>
          <form>
            <div className={styles.data}>
              <label>이메일 주소</label>
              <input type="text" required />
            </div>
            <div className={styles.data}>
              <label>비밀번호</label>
              <input type="password" required />
            </div>
            <div className={styles['forgot-pwrd']}><a href="#">비밀번호를 잊었나요?</a></div>
            <div className={styles.btn}>
              <div className={styles.inner}></div>
              <button type="submit">login</button>
            </div>
            <div className={styles['signup-link']}>
              Not a member? <a href="#">Signup now</a>
            </div>
          </form>
        </div>
      )}

      {showSignup && (
        <div className={`${styles.container} ${showSignup ? styles.show : ''}`} id="signupContainer">
          <span className={styles['close-btn']} onClick={() => setShowSignup(false)}>&times;</span>
          <div className={styles.text}>회원가입</div>
          <form>
            <div className={styles.data}>
              <label>이메일 주소</label>
              <input type="text" required />
            </div>
            <div className={styles.data}>
              <label>비밀번호</label>
              <input type="password" required />
            </div>
            <div className={styles.data}>
              <label>이름</label>
              <input type="text" required />
            </div>
            <div className={styles.data}>
              <label>생년월일</label>
              <input type="date" required />
            </div>
            <div className={styles.btn}>
              <div className={styles.inner}></div>
              <button type="submit" onClick={() => alert('가입 성공!')}>
                등록
              </button>
            </div>
            <div className={styles['signup-link']}>
              이미 회원이신가요? <a href="#">바로 로그인</a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
