import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography, Divider, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postPost } from '../../utils/postData';
import { filesPost } from '../../utils/fileData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GuidePost = () => {
    const membersId = localStorage.getItem('membersId');
    const navigate = useNavigate();

    const titleRef = useRef(null);
    const hashtagRef = useRef(null);
    const cityRef = useRef(null);
    const contentRef = useRef(null);
    const hotelRef = useRef(null);
    const hotelAdRef = useRef(null);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        // 미리보기 URL 설정
        const filePreviews = files.map((file) => {
            return {
                name: file.name,
                url: URL.createObjectURL(file),
            };
        });
        setPreviewUrls(filePreviews);
    };

    const handleUpload = async () => {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
  
      const result = await filesPost(formData);
  
      if (result.success) {
        setUploadStatus('파일 업로드 성공!');
      } else {
        setUploadStatus(`파일 업로드 실패: ${result.error}`);
      }
    };

    useEffect(() => {
        // 메모리 누수 방지: 컴포넌트 언마운트 시 URL 객체 해제
        return () => {
            previewUrls.forEach((file) => URL.revokeObjectURL(file.url));
        };
    }, [previewUrls]);

    const createPost = async () => {
        try {
            // 파일 업로드 처리
            await handleUpload();

            const fileNamesString = selectedFiles.map((file) => file.name).join(',');

            const createData = {
                title: titleRef.current.value,
                hashtag: hashtagRef.current.value,
                files: fileNamesString,
                city: cityRef.current.value,
                content: contentRef.current.value,
                hotel: hotelRef.current.value,
                hotelAd: hotelAdRef.current.value,
                member_id: membersId,
            };

            console.log('createData', createData);
            await postPost(createData);
            navigate('/guidemypost');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h4" mb={4}>
                게시물 등록하기 <span role="img" aria-label="edit">✍️</span>
            </Typography>
            <Divider />

            {/* 대표 내용 */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>대표 내용</Typography>
                <TextField fullWidth label="제목" margin="normal" inputRef={titleRef} />
                <TextField fullWidth label="해시태그" margin="normal" inputRef={hashtagRef} />
                <TextField fullWidth label="대표 이미지 (최대 3개)" margin="normal" />
                <Box sx={{ mt: 1 }}>
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

                    {/* 선택된 파일명 표시 */}
                    {selectedFiles.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                            {selectedFiles.map((file, index) => (
                                <Typography key={index} sx={{ mb: 1 }}>
                                    선택된 파일: {file.name}
                                </Typography>
                            ))}
                        </Box>
                    )}

                    {/* 이미지 미리보기 표시 */}
                    {previewUrls.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            {previewUrls.map((file, index) => (
                                <img
                                    key={index}
                                    src={file.url}
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
                <TextField fullWidth label="여행도시" margin="normal" inputRef={cityRef} />
            </Box>

            {/* 테마 소개 */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>테마 소개</Typography>
                <TextField fullWidth label="1일차" margin="normal" multiline rows={4} inputRef={contentRef} />
                <TextField fullWidth label="2일차" margin="normal" multiline rows={4} />
                <TextField fullWidth label="3일차" margin="normal" multiline rows={4} />
            </Box>


            <Fab color="primary" aria-label="add">
            <FontAwesomeIcon icon="fa-solid fa-plus" />
            </Fab>
            


            {/* 호텔 정보 */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>호텔 정보</Typography>
                <TextField fullWidth label="호텔" margin="normal" inputRef={hotelRef} />
                <TextField fullWidth label="호텔 주소" margin="normal" inputRef={hotelAdRef} />
            </Box>

            <FontAwesomeIcon icon="" />

            {/* 등록 버튼 */}
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
                <Button variant="contained" sx={{ backgroundColor: '#0066ff' }} onClick={createPost}>등록 하기</Button>
            </Box>
        </Box>
    );
};

export default GuidePost;
