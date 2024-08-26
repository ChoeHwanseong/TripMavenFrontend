import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { deleteProfile, fetchedData, updateProfile } from '../../utils/memberData';

const MypageProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [certificateFileName, setCertificateFileName] = useState('');
  const { id } = useParams();

  const membersId = localStorage.getItem('membersId');

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
    return <Typography variant="h6">로딩중</Typography>;
  }

  return (
    <Box sx={{ p: 7 ,mt:-2,ml:-2}}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>프로필</Typography>
      <form>        <Grid container spacing={2}>
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
            <Box sx={{ display: 'flex' }}>
              <Button sx={{ textDecoration: 'underline', mr: '720px' }} onClick={() => { navigate('/passwordchange') }}>
                비밀번호 수정
              </Button>
              <Button style={{ textDecoration: 'underline', color: '#000000' }} onClick={deleteMember}>
                탈퇴하기
              </Button>
            </Box>
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
              sx={{ width: 0.883 }}
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
                mt: 1.9, ml: 1, color: '#000000',
                border: 1, backgroundColor: '#f1f1f1',
                justifyContent:'flex-end',
                height: .16, '&:hover': { backgroundColor: '#DEDEDE' },
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
      </form>
    </Box>
  );
};

export default MypageProfile;
