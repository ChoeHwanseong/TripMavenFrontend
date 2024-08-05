import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleAutoLoginChange = () => setAutoLogin(!autoLogin);

    const handleLogin = () => {
        // 로그인 로직 추가
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Auto Login:', autoLogin);
    };

    return <>
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>로그인</h1>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="이메일 입력"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="비밀번호 입력"
                    />
                </div>
                <div className={styles.options}>
                    <div className={styles.autoLogin}>
                        <input
                            type="checkbox"
                            id="auto-login"
                            checked={autoLogin}
                            onChange={handleAutoLoginChange}
                        />
                        <label htmlFor="auto-login">자동 로그인</label>
                    </div>
                </div>
                <button className={styles.loginButton} onClick={handleLogin}>로그인</button>
                <div className={styles.extraOptions}>
                    <NavLink className={styles.extraOption} to="/signup" >회원가입</NavLink>
                    <span className={styles.separator}>|</span>
                    <a href="#" className={styles.extraOption}>아이디/비밀번호 찾기</a>
                </div>
                <div className={styles.snsLogin}>
                    <span className={styles.snsLoginText}>SNS 간편 로그인</span>
                    <div className={styles.snsIcons}>
                        <img src="/images/google.png" alt="Google" className={styles.snsIcon} />
                        <img src="/images/naver.png" alt="Naver" className={styles.snsIcon} />
                        <img src="/images/kakao.png" alt="Kakao" className={styles.snsIcon} />
                    </div>
                </div>
            </div>
        </div>
        </>
};

export default Login;