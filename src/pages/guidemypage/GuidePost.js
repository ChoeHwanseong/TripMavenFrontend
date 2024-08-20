import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postPost } from '../../utils/postData';
import { filesPost } from '../../utils/fileData';


const GuidePost = () => {

  const membersId= localStorage.getItem('membersId');

  const [files, setFiles] = useState([]); // 파일 객체 저장
  const [fileNames, setFileNames] = useState([]); // 파일 이름 저장
  const [fileURLs, setFileURLs] = useState([]); // 파일 이미지 미리보기용



  const navigate = useNavigate();

  const titleRef = useRef(null);
  const hashtagRef = useRef(null);

  const cityRef = useRef(null);
  const contentRef = useRef(null);
  const hotelRef = useRef(null);
  const hotelAdRef = useRef(null);


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // 파일 배열로 반환

    // 파일 최대 3개 선택 제한
    if (selectedFiles.length > 3) {
      alert("최대 3개의 파일만 선택할 수 있습니다.");
      return;
    }

    setFiles(selectedFiles);
    setFileNames(selectedFiles.map(file => file.name));

    // 파일 url 생성
    const urls = selectedFiles.map(file => URL.createObjectURL(file));
    setFileURLs(urls);

    console.log("Selected files:", selectedFiles);
  };

  
  useEffect(() => {
    return () => {
      fileURLs.forEach(url => URL.revokeObjectURL(url));
    };
  }, [fileURLs]);



  // 게시글 등록
  const createPost = async() => {
    try {

      console.log('files ',files);
      const fileNamesString = files.map(file => file.name).join(',');
      console.log(fileNamesString);

      const createData = { title: titleRef.current.value,
                            hashtag: hashtagRef.current.value,
                            files : fileNamesString,
                            city: cityRef.current.value,
                            content: contentRef.current.value,
                            hotel: hotelRef.current.value,
                            hotelAd: hotelAdRef.current.value,
                            member_id : membersId
                                };
        console.log('createData',createData);
        await postPost(createData);
        navigate('/guidemypost');

    } catch (error) {
        console.error('Error updating answer:', error);
    }

  };




  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Typography sx={{fontWeight:'bold'}} variant="h4" mb={4}>
        게시물 등록하기 <span role="img" aria-label="edit">✍️</span>
      </Typography>
      <Divider />

      {/* 대표 내용 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>대표 내용</Typography>
        <TextField fullWidth label="제목" margin="normal" inputRef={titleRef}/>
        <TextField fullWidth label="해시태그" margin="normal" inputRef={hashtagRef}/>
        <TextField fullWidth label="대표 이미지 (최대 3개)" margin="normal" />
        <Box sx={{ mt: 2 }}>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            multiple
            style={{ display: 'none' }}  // Hide the file input
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="outlined"
              component="span"
              sx={{ mt: 1, '&:hover': { backgroundColor: '#0056b3' } }}
            >
              파일 찾기
            </Button>
          </label>

          {/* Display the selected file names */}
          {fileNames.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {fileNames.map((name, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  선택된 파일: {name}
                </Typography>
              ))}
            </Box>
          )}

          {/* Display image previews */}
          {fileURLs.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {fileURLs.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`파일 미리보기 ${index + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '10px' }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* 여행 주요 일정 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>여행 주요 일정</Typography>
        <TextField fullWidth label="일정(기간)" margin="normal" />
        <TextField fullWidth label="여행도시" margin="normal" inputRef={cityRef}/>
      </Box>

      {/* 테마 소개 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>테마 소개</Typography>
        <TextField fullWidth label="1일차" margin="normal" multiline rows={4} inputRef={contentRef}/>
        <TextField fullWidth label="2일차" margin="normal" multiline rows={4} />
        <TextField fullWidth label="3일차" margin="normal" multiline rows={4} />
      </Box>

      {/* 호텔 정보 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>호텔 정보</Typography>
        <TextField fullWidth label="호텔" margin="normal" inputRef={hotelRef}/>
        <TextField fullWidth label="호텔 주소" margin="normal" inputRef={hotelAdRef}/>
      </Box>

      {/* 등록 버튼 */}
      <Box sx={{ display:'flex', justifyContent:'fixed-end', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={createPost}>등록 하기</Button>
      </Box>
    </Box>
  );
};

export default GuidePost;
