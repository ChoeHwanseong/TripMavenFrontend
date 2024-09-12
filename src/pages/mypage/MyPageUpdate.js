import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchedData } from '../../utils/memberData';
import styles from '../../styles/mypage/MyProfile.module.css';
import  defaultImage  from '../../images/default_profile.png';
import { TemplateContext } from '../../context/TemplateContext';


const MypageUpdate = () => {
  const [profileData, setProfileData] = useState(null);
  const template = useContext(TemplateContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await fetchedData(template.memberInfo.id);
        setProfileData(fetchData);
        console.log('마이프로필: ',profileData)
      } catch (error) {
        console.error('에러났당', error);
      }
    };
    getData();
  },[]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  if (!profileData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>프로필 <small>수정</small></Typography>

        {/* 프로필 사진 및 이름 */}
        <Box className={styles.profileSection}>
          <Avatar
            alt={template.memberInfo.profile || 'Profile Picture'}
            src={template.memberInfo.profile || defaultImage}
            className={styles.avatar}
          />
          <Typography variant="h5" fontWeight="bold">
            {template.memberInfo.email || '아이디 없음'}
          </Typography>
        </Box>

        {/* 프로필 이미지 아래에 텍스트 박스들 배치 */}
        <Box className={styles.texts}>
          <Box className={styles.formGroup}>
            <TextField
              required
              id="filled-required"
              label="name"
              variant="filled"
              fullWidth
              InputProps={{ readOnly: true }}
              value={template.memberInfo.name}
            />
            <TextField
              label="PHONE-NUMBER"
              variant="filled"
              fullWidth
              value={profileData.telNumber || ''}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="GENDER"
                variant="filled"
                fullWidth
                value={profileData.gender || ''}
              />
              <TextField
                label="BIRTHDAY"
                variant="filled"
                fullWidth
                value={profileData.birthday || ''}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                sx={{ width: 0.883 }}
                label="주소"
                name="address"
                variant="filled"
                value={profileData.address || '주소를 넣어주세요.'}
                onChange={handleUpdate}
                margin="normal"
                InputProps={{ readOnly: true }}
              />
              <Button
                sx={{
                  mt: 1.9, ml: 1, color: '#000000',
                  border: 1, backgroundColor: '#f1f1f1',
                  justifyContent: 'flex-end',
                  height: .16, '&:hover': { backgroundColor: '#DEDEDE' },
                }}
                variant="contained"
                component="label"> 주소찾기
                <input type="button" hidden />
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                sx={{ width: 0.72 }}
                label="자격증"
                id="certificate"
                name="certificate"
                value={template.memberInfo.guidelicense || template.memberInfo.guidelicense || ''}
                margin="normal"
                variant="filled"
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Button
                sx={{ mt: 2, ml: 2, backgroundColor: '#0066ff', height: .23, '&:hover': { backgroundColor: '#0056b3' } }}
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                파일 찾기
                <input type="file" hidden onChange={{}} />
              </Button>
            </Box>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="자기소개"
                variant="filled"
                id="about"
                name="about"
                value={profileData.introduce || ''}
                onChange={handleUpdate}
                margin="normal"
                multiline
                rows={8}
              />
            </Grid>
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => { navigate(`/mypageprofile/${template.memberInfo.id}`) }}
            variant="contained"
            sx={{
              mt: 2, backgroundColor: '#0066ff', height: '55px', width: '115px',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            수정 완료
          </Button>
        </Box> 
      </Box>
    </Box>
  );
};

export default MypageUpdate;