import React, { useState } from 'react';
import styles from '../../styles/login/Login.module.css';
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

    const googleLogin = () => {
        // Google OAuth2 인증 URL로 리다이렉트
        window.location.href = 'http://localhost:9099/oauth2/authorization/google';
    };

    const kakaoLogin = () => {
        const clientId = '7d447677dbee7f604d966911a044f55e'; // 환경 변수에서 클라이언트 ID를 가져옵니다.
        const redirectUri = 'http://localhost:9099/login/oauth2/code/kakao'; // 리다이렉트 URI
        const encodedRedirectUri = encodeURIComponent(redirectUri); // 리다이렉트 URI를 인코딩합니다.

        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}`;
    };

    const naverLogin = () => {
        // Naver OAuth2 인증 URL로 리다이렉트
        window.location.href = 'http://localhost:9099/oauth2/authorization/naver';
    };

    return (
        <>
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

                        <NavLink className={styles.extraOption} to="/findId1">아이디찾기</NavLink>
                        <span className={styles.separator}>|</span>

                        <NavLink className={styles.extraOption} to="/findpassword1">비밀번호 찾기</NavLink>
                    </div>
                    <div className={styles.snsLogin}>
                        <span className={styles.snsLoginText}>SNS 간편 로그인</span>
                        <div className={styles.snsIcons}>
                            {/* 각 SNS 아이콘에 클릭 이벤트 핸들러 설정 */}
                            <img
                                src="/images/google.png"
                                alt="Google"
                                className={styles.snsIcon}
                                onClick={googleLogin}
                            />
                            <img
                                src="/images/naver.png"
                                alt="Naver"
                                className={styles.snsIcon}
                                onClick={naverLogin}
                            />
                            <img
                                src="/images/kakao.png"
                                alt="Kakao"
                                className={styles.snsIcon}
                                onClick={kakaoLogin}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
