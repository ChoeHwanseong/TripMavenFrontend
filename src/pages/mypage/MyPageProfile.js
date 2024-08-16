import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchedData, updateProfile } from '../../utils/memberData';

const MypageProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [certificateFileName, setCertificateFileName] = useState('');
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileupdate = await updateProfile(id, profileData);
      setProfileData(profileupdate);
      alert('프로필이 성공적으로 수정되었습니다.');
      navigate(`/mypageprofile/2`);
    } catch (error) {
      console.error('프로필 수정 중 오류 발생:', error);
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (!profileData) {
    return <Typography variant="h6">로딩중</Typography>;
  }

  return (
    <Box sx={{ p: 7 }}>
      <Typography style={{ fontSize: '35px', fontWeight: 'bold' }} gutterBottom>프로필</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Avatar
              src="../../../images/defaultimage.png"
              alt="프로필 이미지"
              sx={{ width: 100, height: 100, mb: 2.5, ml: 0.6 }}
            />
            <Button
              sx={{ backgroundColor: '#0066ff', height: .13, '&:hover': { backgroundColor: '#0056b3' }, }}
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              파일 찾기
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              label="닉네임"
              id="name"
              name="name"
              value={profileData.name || ''}
              onChange={handleUpdate}
              margin="normal"
            />
            <TextField
              fullWidth
              label="이메일"
              id="email"
              name="email"
              value={profileData.email || ''}
              onChange={handleUpdate}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="전화번호"
              id="telNumber"
              name="telNumber"
              value={profileData.telNumber || ''}
              onChange={handleUpdate}
              margin="normal"
            />
            <TextField
              sx={{ width: 0.85 }}
              label="주소"
              id="address"
              name="address"
              value={profileData.address || ''}
              onChange={handleUpdate}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              sx={{
                mt: 2, ml: 3, color: '#000000',
                border: 1, backgroundColor: '#f1f1f1',
                height: .17, '&:hover': { backgroundColor: '#DEDEDE' },
              }}
              variant="contained"
              component="label"
            >
              주소 찾기
              <input type="button" hidden />
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="성별"
              id="gender"
              name="gender"
              value={profileData.gender || ''}
              onChange={handleUpdate}
              margin="normal"
            />
            <TextField
              fullWidth
              label="생년월일"
              id="birthday"
              name="birthday"
              value={profileData.birthday || ''}
              onChange={handleUpdate}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              sx={{ width: 0.72 }}
              label="자격증"
              id="certificate"
              name="certificate"
              value={certificateFileName || profileData.certificate || ''}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              sx={{ mt: 2, ml: 2, backgroundColor: '#0066ff', height: .23, '&:hover': { backgroundColor: '#0056b3' }, }}
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              파일 찾기
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="자기소개"
              id="about"
              name="about"
              value={profileData.about || ''}
              onChange={handleUpdate}
              margin="normal"
              multiline
              rows={8}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2, backgroundColor: '#0066ff', height: '55px', width: '115px',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            수정 하기
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MypageProfile;
