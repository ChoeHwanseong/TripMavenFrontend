import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteProfile, fetchedData, updateProfile } from '../../utils/memberData';
import styles from '../../styles/mypage/MyProfile.module.css'; 

const MypageProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [certificateFileName, setCertificateFileName] = useState('');
  const { id } = useParams();
  const membersId = localStorage.getItem('membersId');
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await fetchedData(id ? id : membersId);
        setProfileData(fetchData);
        console.log('마이프로필: ',profileData)
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

  const deleteMember = async () => {
    const confirmed = window.confirm("진짜 탈퇴?");
    if (confirmed) {
      // 회원 탈퇴 로직
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
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>프로필</Typography>

        {/* 프로필 사진 및 이름 */}
        <Box className={styles.profileSection}>
          <Avatar
            alt={profileData.name || 'Profile Picture'}
            src={profileData.profilePicture || '/path/to/default-image.jpg'}
            className={styles.avatar}
          />
          <Typography variant="h5" fontWeight="bold">
            {profileData.name || '이름 없음'}
          </Typography>
        </Box>

        {/* 프로필 이미지 아래에 텍스트 박스들 배치 */}
        <Box className={styles.texts}>
          <Box className={styles.formGroup}>
            <TextField
              required
              id="filled-required"
              label="EMAIL"
              variant="filled"
              fullWidth
              value={profileData.email || ''}
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
                component="label"
              >
                주소 찾기
                <input type="button" hidden />
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                sx={{ width: 0.72 }}
                label="자격증"
                id="certificate"
                name="certificate"
                value={certificateFileName || profileData.guidelicense || ''}
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
                <input type="file" hidden onChange={handleFileChange} />
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
            onClick={() => { navigate(`/mypageUpdate/${membersId}`) }}
            variant="contained"
            sx={{
              mt: 2, backgroundColor: '#0066ff', height: '55px', width: '115px',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            수정 하기
          </Button>
        </Box> 
      </Box>
    </Box>
  );
};

export default MypageProfile;
