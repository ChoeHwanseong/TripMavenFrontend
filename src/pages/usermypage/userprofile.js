import React, { useState } from 'react';
import styles from '../../styles/usermypage/UserProfile.module.css';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [nickname, setNickname] = useState('냥안아샴');
  const [email, setEmail] = useState('dlwns0784@gmail.com');
  const [phone, setPhone] = useState('010-4294-3686');
  const [region, setRegion] = useState('부산');
  const [address, setAddress] = useState('강서구 마곡동 101-605호');
  const [gender, setGender] = useState('여');
  const [birthDate, setBirthDate] = useState('');
  const [certificate, setCertificate] = useState('K-POP지도사.png');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('수정 완료');
  };
  const navigate = useNavigate();
  return (
    
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>My Page</h2>
        <ul>
        <li><button className={styles.navButton} onClick={()=>navigate('/userprofile')}>내 정보 관리</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/userreview')}>이용후기</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/userask')}>1:1문의 내역</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/userask')}>찜 목록</button></li>
          <li>채팅방</li>
        </ul>
      </div>

      <div className={styles.profile}>
        <h2>프로필</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>프로필 사진</label>
            <div className={styles.fileInput}>
              <img src="profile-pic-placeholder.png" alt="프로필 사진" width="50" height="50" />
              <span className={styles.fileLabel}>파일 찾기</span>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="nickname" className={styles.label}>
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="gender" className={styles.label}>
              성별
            </label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="birthDate" className={styles.label}>
              생년월일
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="phone" className={styles.label}>
              전화번호
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="region" className={styles.label}>
              관심 지역
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={styles.select}
            >
              <option value="부산">부산</option>
              <option value="서울">서울</option>
              <option value="대구">대구</option>
              {/* Add more regions as needed */}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="address" className={styles.label}>
              주소
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="certificate" className={styles.label}>
              자격증
            </label>
            <div className={styles.fileInput}>
              <input
                type="text"
                id="certificate"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                className={styles.input}
              />
              <span className={styles.fileLabel}>파일 찾기</span>
            </div>
          </div>

          <div className={styles.passwordChange}>
            <span>비밀번호 수정</span>
          </div>

          <button type="submit" className={styles.button}>
            수정 하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
