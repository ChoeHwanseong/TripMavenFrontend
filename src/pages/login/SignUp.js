import React, { useState } from 'react';
import styles from '../../styles/login/SignUp.module.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [region, setRegion] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 로직 처리
        console.log({
            email,
            name,
            password,
            region,
            gender,
            birthdate,
            address
        });
    };

    return <>
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">이메일</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                        />
                        <button type="button" className={styles.verifyButton}>확인</button>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">이름</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름을 입력하세요"
                        />
                        <button type="button" className={styles.verifyButton}>확인</button>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                        />
                        <button type="button" className={styles.verifyButton}>확인</button>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="region">관심 지역</label>
                    <select
                        id="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">관심 지역을 선택하세요</option>
                        <option value="seoul">서울</option>
                        <option value="busan">부산</option>
                        <option value="daegu">대구</option>
                        {/* 추가 옵션 */}
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="gender">성별</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">성별을 선택하세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="birthdate">생년월일</label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="address">주소</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="주소를 입력하세요"
                        />
                        <button type="button" className={styles.searchButton}>검색</button>
                    </div>
                </div>
                <button type="submit" className={styles.signupButton}>회원 가입</button>
            </form>
        </div>
    </>
};

export default Signup;
