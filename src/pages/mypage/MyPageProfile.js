import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import styles from '../../styles/mypage/MyProfile.module.css';
import defaultImage from '../../images/default_profile.png';
import { TemplateContext } from '../../context/TemplateContext';
import { deleteProfile, logout } from '../../utils/memberData';

const MypageProfile = () => {
  const template = useContext(TemplateContext);
  const navigate = useNavigate();

  const deleteMember = async () => {
    const confirmed = window.confirm("진짜 탈퇴하시겠습니까?");
    if (confirmed) {
      // 회원 탈퇴 로직
      deleteProfile(template.memberInfo.id);
      alert("탈퇴가 완료되었습니다.")
      navigate('/');
    }
  };

  const regions = {
    seoul: '서울',
    busan: '부산',
    incheon: '인천',
    daegu: '대구',
    daejeon: '대전',
    gwangju: '광주',
    ulsan: '울산',
    sejong: '세종',
    gyeonggi: '경기도',
    gangwon: '강원특별자치도',
    chungbuk: '충청북도',
    chungnam: '충청남도',
    jeonbuk: '전북특별자치도',
    jeonnam: '전라남도',
    gyeongbuk: '경상북도',
    gyeongnam: '경상남도',
    jeju: '제주특별자치도'
  };


  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>프로필</Typography>

        {/* 프로필 사진 및 이름 */}
        <Box className={styles.profileSection}>
          <Avatar alt={template.memberInfo.profile || 'Profile Picture'}
            src={template.memberInfo.profile || defaultImage}
            className={styles.avatar} />
          <Typography variant="h5" fontWeight="bold">
            {template.memberInfo.email || '아이디 없음'}
          </Typography>
        </Box>

        {/* 프로필 이미지 아래에 텍스트 박스들 배치 */}
        <Box className={styles.texts}>
          <Box className={styles.formGroup}>
            <TextField label="name" variant="filled" fullWidth
              InputProps={{ readOnly: true }}
              value={template.memberInfo.name || "이름을 기입해주세요."} />
            <TextField label="PHONE-NUMBER" variant="filled" fullWidth
              InputProps={{ readOnly: true }}
              value={template.memberInfo.telNumber || "전화번호를 기입해주세요."} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="GENDER" variant="filled" fullWidth
                InputProps={{ readOnly: true }}
                value={template.memberInfo.gender || "성별를 기입해주세요."} />
              <TextField label="BIRTHDAY" variant="filled" fullWidth
                InputProps={{ readOnly: true }}
                value={template.memberInfo.birthday || "생년월일을 기입해주세요."} />
            </Box>
            <TextField label="INTERCITY" variant="filled" fullWidth
              InputProps={{ readOnly: true }}
              value={regions[template.memberInfo.interCity] || "관심지역을 기입해주세요."} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField sx={{ width: 1 }}
                label="주소" name="address" variant="filled"
                InputProps={{ readOnly: true }}
                value={template.memberInfo.address || '주소를 기입주세요.'} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="자격증" id="certificate" name="certificate" variant="filled" fullWidth
                InputProps={{ readOnly: true }}
                value={template.memberInfo.guidelicense || "자격증 정보가 없습니다."} />
            </Box>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="자기소개" variant="filled" multiline rows={8}
                InputProps={{ readOnly: true }}
                value={template.memberInfo.introduce || "자기소개를 기입해주세요."} />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
            <Button onClick={deleteMember} variant="contained"
              sx={{ mt: 2, backgroundColor: '#0066ff', height: '55px', width: '115px', '&:hover': { backgroundColor: '#0056b3' }, }}>
              삭제 하기
            </Button>
            <Button onClick={() => { navigate(`/mypageUpdate/${template.memberInfo.id}`) }} variant="contained"
              sx={{ mt: 2, backgroundColor: '#0066ff', height: '55px', width: '115px', '&:hover': { backgroundColor: '#0056b3' }, }}>
              수정 하기
            </Button>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default MypageProfile;
