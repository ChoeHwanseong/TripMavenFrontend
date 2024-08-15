import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/mypage/MyProfile.module.css';
import { fetchedData, updateProfile } from '../../utils/memberData'; // updateProfile을 임포트

const MypageProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await fetchedData(id);
        setProfileData(fetchData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getData();
  }, [id]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('프로필 업데이트 시도', profileData); 
      console.log('프로필 업데이트 시도', profileData.telNumber); 
      const profileupdate = await updateProfile(id, profileData);
      setProfileData(profileupdate);
      alert('프로필이 성공적으로 수정되었습니다.');
      navigate(`/mypageprofile/2`); // 수정 후 마이페이지로 이동
    } catch (error) {
      console.error('프로필 수정 중 오류 발생:', error);
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (!profileData) {
    return <div>로딩중</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>프로필</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <img src="../../../images/defaultimage.png" alt="프로필 이미지" className={styles.avatar} />
              <button type="button" className={styles.fileButton}>파일 찾기</button>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.formGroup}>
                <label htmlFor="name">닉네임</label>
                <input type="text" id="name" name="name" value={profileData.name} onChange={handleUpdate} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input type="text" id="email" name="email" value={profileData.email} onChange={handleUpdate} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telNumber">전화번호</label>
                <input type="text" id="telNumber" name="telNumber" value={profileData.telNumber} onChange={handleUpdate} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">주소</label>
                <input type="text" id="address" name="address" value={profileData.address} onChange={handleUpdate} />
                <button type="button" className={styles.searchButton}>검색</button>
              </div>
            </div>
            <div className={styles.extraSection}>
              <div className={styles.formGroup}>
                <label htmlFor="gender">성별</label>
                <input type="text" id="gender" name="gender" value={profileData.gender} onChange={handleUpdate} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="birthday">생년월일</label>
                <input type="text" id="birthday" name="birthday" value={profileData.birthday} onChange={handleUpdate} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="certificate">자격증</label>
                <input type="text" id="certificate" name="certificate" value={profileData.certificate} readOnly />
                <button type="button" className={styles.fileButton}>파일 찾기</button>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="about">자기소개</label>
                <textarea id="about" name="about" rows="4" value={profileData.about} onChange={handleUpdate}></textarea>
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
