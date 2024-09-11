import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { postGetByEmail, postsAllGet } from '../../utils/postData';
import { fetchedData } from '../../utils/memberData';

const GuideMyPageMyPost = () => {
  const [posts, setPosts] = useState(null);
  const  membersId  = localStorage.getItem('membersId');
  const navigate = useNavigate();

  useEffect(() => {

    console.log('id: ', membersId)

    // 회원 이메일로 상품 조회 >> 내 게시글 관리
    const getData = async () => {
      try {
        const fetchData = await fetchedData(localStorage.getItem('membersId'));
        const postData = await postGetByEmail(fetchData.email);
        setPosts(postData);

        console.log('posts: ',posts);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getData();
    console.log('내 게시글 : ',posts);

  }, []);



  const handleClick = (post) => {
    navigate(`/guidePostDetails/${post.id}`, { state: post });
  };

  if (!posts) {
    return <div>로딩중</div>; 
  }

  return (
    <Box sx={{ maxWidth: 1200, p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          내 게시물 관리
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#0066ff', '&:hover': { backgroundColor: '#0056b3' } }}
          onClick={() => navigate(`/guidePost/${membersId}`)}
        >
          게시물 등록 하기
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor:'#f9f9f9'}}>
            <TableRow>
              <TableCell>작성번호</TableCell>
              <TableCell>지역</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>평가 여부</TableCell>
              <TableCell>등록 여부</TableCell>
              <TableCell>찜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => handleClick(post)}
                sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  '&:hover': { backgroundColor: '#D0F0FF' },
                }}
              >
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.city}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.createdAt.split('T')[0]}</TableCell>
                <TableCell>{post.isEvaluation}</TableCell>
                <TableCell>{post.isActive ? '유' : '무'}</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button disabled>{'<'}</Button>
        <Typography sx={{ mx: 2 }}>1</Typography>
        <Button>{'>'}</Button>
      </Box>
    </Box>
  );
};

export default GuideMyPageMyPost;
