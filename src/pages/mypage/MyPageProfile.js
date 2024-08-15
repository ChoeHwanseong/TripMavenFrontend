// guideProfile.js
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/mypage/MyProfile.module.css';
import {fetchedData} from '../../utils/memberData';

const MypageProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const {id} = useParams(); 

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        //console.log(id) //디버그용
        const fetchData = await fetchedData(id);
        
        setProfileData(fetchData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getData();
  }, [id]);

  if (!profileData) {
    return <div>로딩중</div>; 
  }
  
  return (
    <div className={styles.container}>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>프로필</h1>
        <form className={styles.form}>
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <img src="../../../images/defaultimage.png" alt="프로필 이미지" className={styles.avatar} />
              <button type="button" className={styles.fileButton}>파일 찾기</button>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.formGroup}>
                <label htmlFor="name">닉네임</label>
                <input type="text" id="name" defaultValue={profileData.name}/>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input type="text" id="email" defaultValue={profileData.email}/>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telNumber">전화번호</label>
                <input type="text" id="telNumber" defaultValue={profileData.telNumber}/>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="region">관심 지역</label>
                <select id="region" defaultValue="부산" disabled>
                  <option value="부산">부산</option>
                  {/* 다른 지역 옵션 추가 가능 */}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">주소</label>
                <input type="text" id="address" defaultValue={profileData.address}/>
                <button type="button" className={styles.searchButton}>검색</button>
              </div>
            </div>
            <div className={styles.extraSection}>
              <div className={styles.formGroup}>
                <label htmlFor="gender">성별</label>
                <input type="text" id="gender" defaultValue={profileData.gender}/>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="birthday">생년월일</label>
                <input type="text" id="birthday" defaultValue={profileData.birthday} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="certificate">자격증</label>
                <input type="text" id="certificate" defaultValue="K-POP지도사.png" readOnly />
                <button type="button" className={styles.fileButton}>파일 찾기</button>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="">자기소개</label>
                <textarea id="about" rows="4"  defaultValue="안녕하세요. 저는 낭만아삼 입니다. 저는 야무져요." readOnly></textarea>
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>수정 하기</button>
        </form>
      </main>
    </div>
  );
};

export default MypageProfile;
