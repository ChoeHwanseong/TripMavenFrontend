import React, { useContext, useRef, useState } from 'react';
import { Box, Button, TextField, Typography, Avatar, Grid, CircularProgress, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateProfile } from '../../utils/memberData';
import styles from '../../styles/mypage/MyProfile.module.css';
import defaultImage from '../../images/default_profile.png';
import { TemplateContext } from '../../context/TemplateContext';
import DaumPost, { splitByFirstColon} from '../../api/DaumPostApi';

const MypageUpdate = () => {
  const template = useContext(TemplateContext);
  const [town,area] = splitByFirstColon(template.memberInfo.address);
  const [profileImage, setProfileImage] = useState(template.memberInfo.profile); // 프로필 이미지 상태 추가
  const [townAddress, setTownAddress] = useState(town);
  const [areaAddress, setAreaAddress] = useState(area);

  console.log("areaAddress",areaAddress)
  // 각 텍스트 필드와 파일 입력에 대한 ref 생성
  const nameRef = useRef(template.memberInfo.name);
  const telNumberRef = useRef(template.memberInfo.telNumber);
  const genderRef = useRef(template.memberInfo.gender);
  const birthdayRef = useRef(template.memberInfo.birthday);
  const introduceRef = useRef(template.memberInfo.introduce);
  const profileImageRef = useRef(template.memberInfo.profile); // 이미지 파일 입력 ref
  const interCityRef = useRef(template.memberInfo.interCity)

  if (!template.memberInfo) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const previewImage = () => {
    const input = profileImageRef.current;
    const file = input.files && input.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        // URL.createObjectURL()을 사용하여 파일의 임시 URL을 생성합니다.
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
      } else {
        alert('이미지 파일만 업로드할 수 있습니다.');
      }
    } else {
      setProfileImage(template.memberInfo.profile || defaultImage); // 파일이 선택되지 않은 경우 기본 이미지 설정
    }
  };


  // 프로필 업데이트 함수에서 ref 값을 사용
  const handleProfileUpdate = () => {
    const updateData = {
      'name': nameRef.current.value,
      'telNumber': telNumberRef.current.value,
      'gender': genderRef.current.value,
      'birthday': birthdayRef.current.value,
      'address': `${areaAddress} : ${townAddress}`,
      'interCity': interCityRef.current.value,
      'profile': profileImage,
      'introduce': introduceRef.current.value,
    }
    updateProfile(template.memberInfo.id, updateData)
      .then(() => {
        alert('변경이 완료되었습니다.');
        window.location.href = `http://localhost:58337/mypageprofile/${template.memberInfo.id}`;
      })
      .catch(() => alert('변경이 실패되었습니다.'));
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>프로필 <small>수정</small></Typography>
        {/* 프로필 사진 및 이름 */}
        <Box className={styles.profileSection}>
          <Avatar alt={profileImage || 'Profile Picture'} src={profileImage || defaultImage} className={styles.avatar} />
          <Button sx={{ backgroundColor: '#0066ff', height: .23, '&:hover': { backgroundColor: '#0056b3' } }}
            variant="contained" component="label" startIcon={<CloudUploadIcon />}>
            프로필 등록
            <input type="file" hidden ref={profileImageRef} onChange={previewImage} accept="image/*" />
          </Button>
          <Typography variant="h5" fontWeight="bold">
            {template.memberInfo.email || '아이디 없음'}
          </Typography>
        </Box>
        {/* 프로필 이미지 아래에 텍스트 박스들 배치 */}
        <Box className={styles.texts}>
          <Box className={styles.formGroup}>
            <TextField required id="filled-required" label="name" variant="filled" fullWidth
              inputRef={nameRef} defaultValue={template.memberInfo.name || ''} />
            <TextField label="PHONE-NUMBER" type="number" variant="filled" fullWidth
              inputRef={telNumberRef} defaultValue={template.memberInfo.telNumber || ''} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField select label="GENDER" variant="filled" fullWidth
                inputRef={genderRef} defaultValue={template.memberInfo.gender || ''}>
                {/* MenuItem으로 선택지 구성 */}
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              <TextField label="BIRTHDAY" type="date" variant="filled" fullWidth
                inputRef={birthdayRef} defaultValue={template.memberInfo.birthday || ''}
                InputLabelProps={{ shrink: true, }} />
            </Box>
            <TextField select label="INTERCITY" variant="filled" fullWidth
              inputRef={interCityRef} defaultValue={template.memberInfo.interCity || ''}>
              {/* MenuItem으로 선택지 구성 */}
              <MenuItem value="">관심 지역을 선택하세요</MenuItem>
              <MenuItem value="seoul">서울</MenuItem>
              <MenuItem value="busan">부산</MenuItem>
              <MenuItem value="incheon">인천</MenuItem>
              <MenuItem value="daegu">대구</MenuItem>
              <MenuItem value="daejeon">대전</MenuItem>
              <MenuItem value="gwangju">광주</MenuItem>
              <MenuItem value="ulsan">울산</MenuItem>
              <MenuItem value="sejong">세종</MenuItem>
              <MenuItem value="gyeonggi">경기도</MenuItem>
              <MenuItem value="gangwon">강원특별자치도</MenuItem>
              <MenuItem value="chungbuk">충청북도</MenuItem>
              <MenuItem value="chungnam">충청남도</MenuItem>
              <MenuItem value="jeonbuk">전북특별자치도</MenuItem>
              <MenuItem value="jeonnam">전라남도</MenuItem>
              <MenuItem value="gyeongbuk">경상북도</MenuItem>
              <MenuItem value="gyeongnam">경상남도</MenuItem>
              <MenuItem value="jeju">제주특별자치도</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField sx={{ width: 0.820 }}
                label="주소" name="areaAddress" variant="filled"
                InputProps={{ readOnly: true }}
                value={areaAddress||'주소를 입력하세요.'} />
                <DaumPost setAreaAddress={setAreaAddress}/>
            </Box>
            <TextField label="상세 주소" name="townAddress" variant="filled" placeholder="상세주소를 입력하세요."
                value={townAddress} onChange={(e)=>setTownAddress(e.target.value)}/>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="자기소개" variant="filled" multiline rows={8}
                inputRef={introduceRef} defaultValue={template.memberInfo.introduce} />
            </Grid>
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button sx={{ mt: 2, backgroundColor: '#0066ff', height: '55px', width: '115px', '&:hover': { backgroundColor: '#0056b3' }, }}
            onClick={handleProfileUpdate} variant="contained">수정 완료</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MypageUpdate;
