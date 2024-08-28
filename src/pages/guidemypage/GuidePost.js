import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, TextField, Divider } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HotelIcon from '@mui/icons-material/Hotel';
import PostAddIcon from '@mui/icons-material/PostAdd'; // 등록 아이콘 추가
import { useNavigate } from 'react-router-dom';
import { postPost } from '../../utils/postData';

const GuidePost = () => {

    const navigate = useNavigate();

    const membersId = localStorage.getItem('membersId');

    const [files, setFiles] = useState([]); // 파일 객체 저장
    const [fileNames, setFileNames] = useState([]); // 파일 이름 저장
    const [fileURLs, setFileURLs] = useState([]); // 파일 이미지 미리보기용
    const [nights, setNights] = useState(''); // 박 수
    const [days, setDays] = useState(''); // 일 수
    const [errors, setErrors] = useState({}); // 에러 상태 관리
    const [editorContent, setEditorContent] = useState(''); // ReactQuill의 내용 저장

    const titleRef = useRef(null);
    const hashtagRef = useRef(null);
    const dayRef = useRef({ value: '' });  // 초기값을 빈 문자열로 설정
    const cityRef = useRef(null);
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
        const dayPeriod = `${nights}박 ${days}일`;
        if (dayRef.current) {
            dayRef.current.value = dayPeriod;
        }
    }, [nights, days]);

    const validateFields = () => {
        const newErrors = {};
        if (!titleRef.current?.value) newErrors.title = "제목을 입력해주세요.";
        if (!hashtagRef.current?.value) newErrors.hashtag = "해시태그를 입력해주세요.";
        if (!files.length) newErrors.files = "최소 1개의 이미지를 업로드해주세요.";
        if (!nights || !days) newErrors.dayPeriod = "박과 일 수를 입력해주세요.";
        if (!cityRef.current?.value) newErrors.city = "여행도시를 입력해주세요.";
        if (!editorContent || editorContent.trim() === '') newErrors.content = "내용을 입력해주세요."; // ReactQuill 내용 체크
        return newErrors;
    };

    // 게시글 등록
    const createPost = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            console.log('files ', files);
            const fileNamesString = files.map(file => file.name).join(',');
            console.log(fileNamesString);

            const createData = { 
                title: titleRef.current?.value || '',
                hashtag: hashtagRef.current?.value || '',
                files: fileNamesString,
                city: cityRef.current?.value || '',
                content: editorContent || '', // ReactQuill의 내용을 사용
                dayPeriod: dayRef.current.value, // "박 일" 일정 추가
                hotel : hotelRef.current.value,
                hotelAd : hotelAdRef.current.value,
                member_id: membersId
            };

            console.log('createData', createData);
            await postPost(createData);
            navigate('/guidemypost');

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, width: '90%', mx: 'auto', mt: 5 }}>  {/* 너비와 maxWidth를 조정 */}
            <Typography variant="h4" fontWeight="bold" mb={4} sx={{ display: 'flex', alignItems: 'center' }}>
                게시물 등록하기 <PostAddIcon sx={{ ml: 1 }} /> {/* 등록 아이콘 추가 */}
            </Typography>
            <Divider />

            {/* 대표 내용 */}
            <Box sx={{ p: 3, mt: 4 }}>
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                        color: '#1976d2', // 소제목 컬러 적용
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <EmojiObjectsIcon sx={{ mr: 1 }} /> {/* 소제목 옆에 아이콘 추가 */}
                    대표 내용
                </Typography>
                <TextField 
                    fullWidth 
                    label="제목" 
                    margin="normal" 
                    inputRef={titleRef} 
                    error={!!errors.title} 
                    helperText={errors.title}
                />
                <TextField 
                    fullWidth 
                    label="해시태그" 
                    margin="normal" 
                    inputRef={hashtagRef} 
                    error={!!errors.hashtag} 
                    helperText={errors.hashtag}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    component="label" 
                    sx={{ mt: 2 }}
                    error={!!errors.files}
                >
                    대표 이미지 업로드 (최대 3개)
                    <input type="file" hidden onChange={handleFileChange} multiple />
                </Button>
                {errors.files && <Typography color="error">{errors.files}</Typography>}

                {/* 이미지 미리보기 */}
                {fileURLs.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        {fileURLs.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`preview ${index + 1}`}
                                style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        ))}
                    </Box>
                )}
            </Box>
            <Divider />

            {/* 여행 주요 일정 */}
            <Box sx={{ p: 3, mt: 4 }}>
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                        color: '#1976d2',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <AirplanemodeActiveIcon sx={{ mr: 1 }} />
                    여행 주요 일정
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField 
                        label="박" 
                        type="number" 
                        value={nights} 
                        onChange={(e) => setNights(e.target.value)} 
                        sx={{ width: '48%' }} 
                        error={!!errors.dayPeriod} 
                    />
                    <TextField 
                        label="일" 
                        type="number" 
                        value={days} 
                        onChange={(e) => setDays(e.target.value)} 
                        sx={{ width: '48%' }} 
                        error={!!errors.dayPeriod} 
                    />
                </Box>
                {errors.dayPeriod && <Typography color="error">{errors.dayPeriod}</Typography>}
                <TextField 
                    fullWidth 
                    label="여행도시" 
                    margin="normal" 
                    inputRef={cityRef} 
                    error={!!errors.city} 
                    helperText={errors.city}
                />
            </Box>
            <Divider />

            {/* 테마 소개 */}
            <Box sx={{ p: 3, mt: 4 }}>
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                        color: '#1976d2',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <BeachAccessIcon sx={{ mr: 1 }} />
                    테마 소개
                </Typography>
                <ReactQuill 
                    theme="snow" 
                    placeholder="내용을 입력하세요..." 
                    value={editorContent}
                    onChange={setEditorContent}
                />
                {errors.content && <Typography color="error">{errors.content}</Typography>}
            </Box>
            <Divider />

            {/* 호텔 정보 */}
            <Box sx={{ p: 3, mt: 4 }}>
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                        color: '#1976d2',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <HotelIcon sx={{ mr: 1 }} />
                    호텔 정보
                </Typography>
                <TextField fullWidth label="호텔" margin="normal" inputRef={hotelRef} />
                <TextField fullWidth label="호텔 주소" margin="normal" inputRef={hotelAdRef} />
            </Box>
            <Divider />

            {/* 등록 버튼 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button variant="contained" color="primary" onClick={createPost}>
                    등록하기
                </Button>
            </Box>
        </Box>
    );
};

export default GuidePost;
