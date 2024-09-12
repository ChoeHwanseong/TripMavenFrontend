import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import defaultImage from '../../images/default_profile.png';
import { fetchedData, updateProfile } from '../../utils/memberData';
import { postPut } from '../../utils/postData';
import styles from '../../styles/mypage/MyProfile.module.css';
import { TemplateContext } from '../../context/TemplateContext';

const MypageUpdate = () => {
  const [profileData, setProfileData] = useState(null);
  const [certificateFileName, setCertificateFileName] = useState('');
  const membersId= localStorage.getItem('membersId');
  const navigate = useNavigate();
  const template = useContext(TemplateContext);

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
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>프로필</Typography>

        {/* 프로필 사진 및 이름 */}
        <Box className={styles.profileSection}>
          <Avatar
            alt={template.memberInfo.profile || 'Profile Picture'}
            src={template.memberInfo.profile || defaultImage}
            className={styles.avatar}
          />
          <Typography variant="h5" fontWeight="bold">
            {template.memberInfo.name || '이름 없음'}
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
              InputProps={{ readOnly: true }}
              value={template.memberInfo.email}
            />
            <TextField
              label="PHONE-NUMBER"
              variant="filled"
              fullWidth
              InputProps={{ readOnly: true }}
              value={template.memberInfo.telNumber || "전화번호를 기입해주세요."}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="GENDER"
                variant="filled"
                InputProps={{ readOnly: true }}
                fullWidth
                value={template.memberInfo.gender || "성별를 기입해주세요."}
              />
              <TextField
                label="BIRTHDAY"
                variant="filled"
                fullWidth
                InputProps={{ readOnly: true }}
                value={template.memberInfo.birthday || "생년월일을 기입해주세요."}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                sx={{ width: 1 }}
                label="주소"
                name="address"
                variant="filled"
                value={template.memberInfo.address || '주소를 기입주세요.'}
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="자격증"
                id="certificate"
                name="certificate"
                value={template.memberInfo.guidelicense || "자격증 정보가 없습니다."}
                margin="normal"
                variant="filled"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Box>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="자기소개"
                variant="filled"
                id="about"
                name="about"
                value={template.memberInfo.introduce || "자기소개를 기입해주세요."}
                margin="normal"
                multiline
                InputProps={{ readOnly: true }}
                rows={8}
              />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <Button
              onClick={() => { navigate(`/mypageprofile/${template.memberInfo.id}`) }}
              variant="contained"
              sx={{
                mt: 2, backgroundColor: '#0066ff', height: '55px', width: '115px',
                '&:hover': { backgroundColor: '#0056b3' },
              }}     >
              수정 하기
            </Button>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default MypageUpdate;