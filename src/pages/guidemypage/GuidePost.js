import React from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';


const RegisterPost = () => {
 
  


  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        게시물 등록하기 <span role="img" aria-label="edit">✍️</span>
      </Typography>
      <Divider />

      {/* 대표 내용 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>대표 내용</Typography>
        <TextField fullWidth label="제목" margin="normal" />
        <TextField fullWidth label="해시태그" margin="normal" />
        <TextField fullWidth label="대표 이미지 (최대 3개)" margin="normal" />
        <Button 
          variant="outlined"
          sx={{ mt: 1,'&:hover': { backgroundColor: '#0056b3' }, }}>
          파일 찾기
        <input type="file" hidden/>
        </Button>
      </Box>

      {/* 여행 주요 일정 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>여행 주요 일정</Typography>
        <TextField fullWidth label="일정(기간)" margin="normal" />
        <TextField fullWidth label="여행도시" margin="normal" />
      </Box>

      {/* 테마 소개 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>테마 소개</Typography>
        <TextField fullWidth label="1일차" margin="normal" multiline rows={4} />
        <TextField fullWidth label="2일차" margin="normal" multiline rows={4} />
        <TextField fullWidth label="3일차" margin="normal" multiline rows={4} />
      </Box>

      {/* 호텔 정보 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>호텔 정보</Typography>
        <TextField fullWidth label="호텔" margin="normal" />
        <TextField fullWidth label="주소" margin="normal" />
      </Box>

      {/* 등록 버튼 */}
      <Box sx={{ display:'flex', justifyContent:'fixed-end', mt: 4 }}>
        <Button variant="contained" color="primary">등록 하기</Button>
      </Box>
    </Box>
  );
};

export default RegisterPost;
