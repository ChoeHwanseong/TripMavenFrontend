// guideProfile.js
import React from 'react';

import { useNavigate } from 'react-router-dom';
import styles from '../styles/GuideProfile.module.css';

const GuideProfile = () => {
  const navigate = useNavigate();



  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>My Page</h2>
        <ul className={styles.menu}>
          <li><button className={styles.navButton} onClick={()=>navigate('/guideProfile')}>내 정보 관리</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/guideMyPageMyPost')}>내 게시물 관리</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/guideMyPageInquiryDetails')}>1:1문의 내역</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/chat')}>채팅방</button></li>
          <li><button className={styles.navButton} onClick={()=>navigate('/mypageaiservice')}>ai 서비스</button></li>
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>프로필</h1>
        <form className={styles.form}>
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <img src="/path/to/avatar.png" alt="프로필 이미지" className={styles.avatar} />
              <button type="button" className={styles.fileButton}>파일 찾기</button>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.formGroup}>
                <label htmlFor="nickname">닉네임</label>
                <input type="text" id="nickname" value="냥만아삼" readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" value="dlwns0784@gmail.com" readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">전화번호</label>
                <input type="tel" id="phone" value="010-4294-3686" readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="region">관심 지역</label>
                <select id="region" value="부산" disabled>
                  <option value="부산">부산</option>
                  {/* 다른 지역 옵션 추가 가능 */}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">주소</label>
                <input type="text" id="address" value="강서구 마곡동 101-605호" readOnly />
                <button type="button" className={styles.searchButton}>검색</button>
              </div>
            </div>
            <div className={styles.extraSection}>
              <div className={styles.formGroup}>
                <label htmlFor="gender">성별</label>
                <input type="text" id="gender" value="여" readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="birthdate">생년월일</label>
                <input type="date" id="birthdate" placeholder="생년월일을 선택하세요" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="certificate">자격증</label>
                <input type="text" id="certificate" value="K-POP지도사.png" readOnly />
                <button type="button" className={styles.fileButton}>파일 찾기</button>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="about">자기소개</label>
                <textarea id="about" rows="4" readOnly>
                  안녕하세요. 저는 냥만아삼 입니다. 저의 가이드는 가견적으로 되었어요.
                </textarea>
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>수정 하기</button>
        </form>
      </main>
    </div>
  );
};

export default GuideProfile;
