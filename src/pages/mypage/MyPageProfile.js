import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteProfile, fetchedData, updateProfile } from '../../utils/memberData';
import styles from '../../styles/mypage/MyProfile.module.css';
import { fetchedData } from '../../utils/memberData';

const MypageProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [certificateFileName, setCertificateFileName] = useState('');
  const { id } = useParams(); //관리자 페이지에서 유저 목록 클릭시 필요한 파라미터임

  //원래 프로필페이지에서는 이거 쓰다가 회원목록에서 넘어온 id값 있으면 id로 조회하기
  const membersId = localStorage.getItem('membersId');
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await fetchedData(id ? id : membersId);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFileName(file.name);
    }
  };

  // 회원 탈퇴
  const deleteMember = async () => {
    const confirmed = window.confirm("진짜 탈퇴?");
    if (confirmed) {
      // 2) 회원 테이블 컬럼 디폴트값 변경 >> 백 단의 새로운 메소드 필요.
      // const updateData = { isactive: 0,
      //               isdelete : 1,
      //               id :membersId 
      //             };
      // console.log('updateData: ',updateData);
      // await updateProfile(updateData.id,updateData);
      // navigate('/');

      // 1) delete 메소드 활용 - 캐스케이드 오류발생 (양방향 참조관계 필요.)
      //   try {
      //     console.log('membersId: ',membersId);
      //       await deleteProfile(membersId);
      //       navigate('/'); 
      //   } catch (error) {
      //       console.error('삭제 중 오류 발생:', error);
      //   }

    }
  };




  if (!profileData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.titlecotainer}>
          <h1 className={styles.title}>프로필</h1>
          <div className={styles.buttoncontainer}>
            <button className={styles.passwdButton} onClick={() => { navigate('/passwordchange') }}>비밀번호 수정</button>
            <button className={styles.deleteButton} onClick={deleteMember}>탈퇴하기</button>
          </div>
        </div>
        <form className={styles.form} >
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <img src="../../../images/defaultimage.png" alt="프로필 이미지" className={styles.avatar} />
              <label htmlFor="upload-file" className={styles.fileButton}>
                <CloudUploadIcon /> 파일 찾기
              </label>

              {/* 실제 파일 업로드 input (화면에서 숨김) */}
              <input
                type="file"
                id="upload-file"
                style={{ display: 'none' }}
                onChange={handleFileChange} // 파일 선택시 처리할 함수
              />
            </div>
            <div className={styles.infoSection}>

              <div className={styles.formGroup}>
                <label htmlFor="name">닉네임</label>
                <input className={styles.inputbox} type="text" id="name" name="name" value={profileData.name || ''} onChange={handleUpdate} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input type="text" id="email" name="email" value={profileData.email || ''} onChange={handleUpdate} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telNumber">전화번호</label>
                <input type="text" id="telNumber" name="telNumber" value={profileData.telNumber || ''} onChange={handleUpdate} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">주소</label>
                <input type="text" id="address" name="address" value={profileData.address || ''} onChange={handleUpdate} readOnly />
              </div>
            </div>
            <div className={styles.extraSection}>
              <div className={styles.formGroup}>
                <label htmlFor="gender">성별</label>
                <input type="text" id="gender" name="gender" value={profileData.gender ? profileData.gender : ''} onChange={handleUpdate} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="birthday">생년월일</label>
                <input type="text" id="birthday" name="birthday" value={profileData.birthday ? profileData.birthday : ''} onChange={handleUpdate} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="certificate">자격증</label>
                <input type="text" id="certificate" name="certificate" value={profileData.certificate ? profileData.certificate : ''} readOnly />

              </div>
              <div className={styles.formGroup}>
                <label htmlFor="about">자기소개</label>
                <textarea id="about" name="about" rows="4" value={profileData.about ? profileData.about : ''} onChange={handleUpdate} readOnly></textarea>
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
