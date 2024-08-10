import React, { useState } from 'react';
import styles from '../styles/signUp/signUpForm.module.css';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        region: '',
        gender: '',
        birthDate: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 로직 처리
        console.log(formData);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>회원가입</h1>

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                    className={styles.input}
                />
                <button type="button" className={styles.checkButton}>확인</button>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                    className={styles.input}
                />
                <button type="button" className={styles.checkButton}>확인</button>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요"
                    className={styles.input}
                />
                <button type="button" className={styles.checkButton}>확인</button>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="region" className={styles.label}>관심 지역</label>
                <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="">관심 지역을 선택하세요</option>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="인천">인천</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="gender" className={styles.label}>성별</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="">성별을 선택하세요</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="birthDate" className={styles.label}>생년월일</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>주소</label>
                <div className={styles.addressContainer}>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="주소를 입력하세요"
                        className={styles.input}
                    />
                    <button type="button" className={styles.searchButton}>검색</button>
                </div>
            </div>

            <button type="submit" className={styles.submitButton}>회원 가입</button>
        </form>
    );
};

export default SignUpForm;
