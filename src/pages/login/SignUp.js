import React from 'react';
import styles from '../../styles/login/SignUp.module.css';
import useValid from './useValid'; 
import axios from 'axios';
import {SignUp} from '../../utils/memberData'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const email = useValid('', (value) =>
        !value ? '이메일을 입력하세요' : !/\S+@\S+\.\S+/.test(value) ? '유효한 이메일 주소를 입력하세요' : ''
    );
    const name = useValid('', (value) => !value ? '이름을 입력하세요' : '');
    const password = useValid('', (value) =>
        !value ? '비밀번호를 입력하세요' : value.length < 6 ? '비밀번호는 최소 6자 이상이어야 합니다' : ''
    );
    const passwordConfirm = useValid('', (value) =>
        !value ? '비밀번호 확인을 입력하세요' : value !== password.value ? '비밀번호가 일치하지 않습니다' : ''
    );
    const region = useValid('', (value) => !value ? '관심 지역을 선택하세요' : '');
    const gender = useValid('', (value) => !value ? '성별을 선택하세요' : '');
    const birthday = useValid('', (value) => !value ? '생년월일을 입력하세요' : '');
    const address = useValid('', (value) => !value ? '주소를 입력하세요' : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(
            !email.error &&
            !name.error &&
            !password.error &&
            !passwordConfirm.error &&
            !region.error &&
            !gender.error &&
            !birthday.error &&
            !address.error
        ) {
            const form = {
                email: email.value,
                name: name.value,
                password: password.value,
                region: region.value,
                gender: gender.value,
                birthday: birthday.value,
                address: address.value,
                loginType: 'local'
                
            };
            // 회원가입 로직 처리
            console.log(form);
            SignUp(form);
            alert('가입 완료! 가입한 계정으로 로그인해주세요.');
            navigate('/login')
            
        }
        else {
            alert('모든 필드를 올바르게 입력하세요.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">이메일</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email.value}
                            onChange={email.onChange}
                            placeholder="이메일을 입력하세요"
                        />
                    </div>
                    {email.error && <p className={styles.error}>{email.error}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="name">이름</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name.value}
                            onChange={name.onChange}
                            placeholder="이름을 입력하세요"
                        />
                    </div>
                    {name.error && <p className={styles.error}>{name.error}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password.value}
                            onChange={password.onChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    {password.error && <p className={styles.error}>{password.error}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWithButton}>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={passwordConfirm.value}
                            onChange={passwordConfirm.onChange}
                            placeholder="비밀번호 확인"
                        />
                    </div>
                    {passwordConfirm.error && <p className={styles.error}>{passwordConfirm.error}</p>}
                </div>
                {/* 
                <div className={styles.inputGroup}>
                    <label htmlFor="name">전화번호</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={name.value}
                            onChange={name.onChange}
                            placeholder="번호를 입력하세요"
                        />
                    </div>
                    {name.error && <p className={styles.error}>{name.error}</p>}
                </div>*/}

                <div className={styles.inputGroup}>
                    <label htmlFor="region">관심 지역</label>
                    <select
                        id="region"
                        name="region"
                        value={region.value}
                        onChange={region.onChange}
                        className={styles.selectInput}
                    >
                        <option value="">관심 지역을 선택하세요</option>
                        <option value="seoul">서울</option>
                        <option value="busan">부산</option>
                        <option value="incheon">인천</option>
                        <option value="daegu">대구</option>
                        <option value="daejeon">대전</option>
                        <option value="gwangju">광주</option>
                        <option value="ulsan">울산</option>
                        <option value="sejong">세종</option>
                        <option value="gyeonggi">경기도</option>
                        <option value="gangwon">강원특별자치도</option>
                        <option value="chungbuk">충청북도</option>
                        <option value="chungnam">충청남도</option>
                        <option value="jeonbuk">전북특별자치도</option>
                        <option value="jeonnam">전라남도</option>
                        <option value="gyeongbuk">경상북도</option>
                        <option value="gyeongnam">경상남도</option>
                        <option value="jeju">제주특별자치도</option>
                        {/* 추가 옵션 */}
                    </select>
                    {region.error && <p className={styles.error}>{region.error}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="gender">성별</label>
                    <select
                        id="gender"
                        name="gender"
                        value={gender.value}
                        onChange={gender.onChange}
                        className={styles.selectInput}
                    >
                        <option value="">성별을 선택하세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                    {gender.error && <p className={styles.error}>{gender.error}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="birthdate">생년월일</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={birthday.value}
                        onChange={birthday.onChange}
                        className={styles.dateInput}
                    />
                    {birthday.error && <p className={styles.error}>{birthday.error}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="address">주소</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address.value}
                            onChange={address.onChange}
                            placeholder="주소를 입력하세요"
                        />
                        <button type="button" className={styles.searchButton}>검색</button>
                    </div>
                    {address.error && <p className={styles.error}>{address.error}</p>}
                </div>

                <button type="submit" className={styles.signupButton} onChange={handleSubmit}>회원 가입</button>
            </form>
        </div>
    );
};

export default Signup;
