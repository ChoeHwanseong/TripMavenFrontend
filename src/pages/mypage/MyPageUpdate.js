import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchedData, updateProfile } from '../../utils/memberData';
import { postPut } from '../../utils/postData';

const MypageUpdate = () => {
  const [profileData, setProfileData] = useState(null);
  const [certificateFileName, setCertificateFileName] = useState('');
  const membersId= localStorage.getItem('membersId');
  const navigate = useNavigate();

  // 기존 데이타 뿌려주기.
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await fetchedData(membersId);
        setProfileData(fetchData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getData();
  }, [membersId]);


  

//const profileRef = useRef(null);
  const nameRef = useRef(null);

  const telNumberRef = useRef(null);
  const addressRef = useRef(null);

  const genderRef = useRef(null);
  const birthdayRef = useRef(null);
//const guidelicenseRef = useRef(null);
  
  const introduceRef = useRef(null);


    // 수정된 값 저장
    const newName = async () =>{
      setProfileData({...profileData,name:nameRef.current.value})
    };
    const newTelNumber = async () =>{
      setProfileData({...profileData,telNumber:telNumberRef.current.value})
    };
    const newAddress = async () =>{
      setProfileData({...profileData,address:addressRef.current.value})
    };
    const newGender = async () =>{
      setProfileData({...profileData,gender:genderRef.current.value})
    };
    const newBirthday = async () =>{
      setProfileData({...profileData,birthday:birthdayRef.current.value})
    }; 
    const newIntroduce = async () =>{
      setProfileData({...profileData,introduce:introduceRef.current.value})
    };
  
  
  
  // 프로필 수정
  const handleProfile = async() => {
    try {
        const updateData = { name: nameRef.current.value,
                            telNumber : telNumberRef.current.value,
                            address : addressRef.current.value,
                            gender : genderRef.current.value,
                            birthday  : birthdayRef.current.value,
                            introduce : introduceRef.current.value,
                            id : membersId
                          };
        console.log('updateData: ',updateData);
        console.log('updateData.membersId: ',updateData.id);
        await updateProfile(updateData.id,updateData);
        //alert('프로필이 성공적으로 수정되었습니다.');
        navigate(`/mypageprofile/${membersId}`);

    }  catch (error) {
        console.error('프로필 수정 중 오류 발생:', error);
        alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
        }

  };




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFileName(file.name);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const profileupdate = await updateProfile(id, profileData);
  //     setProfileData(profileupdate);
  //     alert('프로필이 성공적으로 수정되었습니다.');
  //     navigate(`/mypageprofile/2`);
  //   } catch (error) {
  //     console.error('프로필 수정 중 오류 발생:', error);
  //     alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
  //   }
  // };

  if (!profileData) {
    return <Typography variant="h6">로딩중</Typography>;
  }

  return (
    <Box sx={{ p: 7 }}>
      <Typography style={{ fontSize: '35px', fontWeight: 'bold' }} gutterBottom>프로필 수정</Typography>
      <form>
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
              onChange={newName}
              margin="normal"
              inputRef={nameRef}
    
            />
            <TextField
              fullWidth
              label="이메일"
              id="email"
              name="email"
              value={profileData.email || ''}
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
              onChange={newTelNumber}
              margin="normal"
              inputRef={telNumberRef}
            />
            <TextField
              sx={{ width: 0.88 }}
              label="주소"
              id="address"
              name="address"
              value={profileData.address || ''}
              onChange={newAddress}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              inputRef={addressRef}
            />
            <Button
              sx={{
                mt: 1.9, ml: 1, color: '#000000',
                border: 1, backgroundColor: '#f1f1f1',
                justifyContent:'flex-end',
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
              onChange={newGender}
              margin="normal"
              inputRef={genderRef}
            />
            <TextField
              fullWidth
              label="생년월일"
              id="birthday"
              name="birthday"
              value={profileData.birthday || ''}
              onChange={newBirthday}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              inputRef={birthdayRef}
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
              onChange={newIntroduce}
              margin="normal"
              multiline
              rows={8}
              inputRef={introduceRef}
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
            onClick={handleProfile}
          >
            수정 하기
          </Button>
       
        </Box>
      </form>
    </Box>
  );
};

export default MypageUpdate;


