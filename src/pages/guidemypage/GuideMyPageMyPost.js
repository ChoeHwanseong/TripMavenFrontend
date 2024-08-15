// PostManagementPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/guidemypage/GuideMyPageMyPost.module.css';
import { Box } from '@mui/material';
import { productFetchAllData } from '../../utils/productData';


const GuideMyPageMyPost = () => {
  const [posts, setPosts] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPostData = async () => {
      try {
        const fetchData = await productFetchAllData();
        console.log('fetchData: ',fetchData);
        setPosts(fetchData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getPostData();
  }, []);

  const handleClick = (posts) => {
    navigate(`/guidemypagemypostdetails/${posts.id}`,{state:posts});
  };

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  }

  if (!posts) {
    return <div>로딩중</div>; 
  }


  return (
    <div className={styles.container}>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>내 게시물 관리</h1>
          <button className={styles.createButton} onClick={()=>{navigate('/guidePost')}}>게시물 등록 하기</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>작성번호</th>
              <th>지역</th>
              <th>제목</th>
              <th>작성일</th>
              <th>평가 여부</th>
              <th>등록 여부</th>
              <th>찜</th>
            </tr>
          </thead>
          <tbody>

          {posts.map((post, index) => (
            <Box
              component="tr"
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(post)}
              sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    color : 'black',
                    backgroundColor: '#D0F0FF',
                  },
                }}
              >
                <td>{post.id}</td>
                <td>{post.city}</td>
                <td>{post.title}</td>
                <td>{post.createdAt.split('T')[0]}</td>
                <td>{post.isEvaluation}</td>
                <td>{post.isActive?'유':'무'}</td>
                <td>0</td>
              </Box>
              ))}
            
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span>&lt;</span>
          <span className={styles.currentPage}>1</span>
          <span>&gt;</span>
        </div>
      </main>
    </div>
  );
};

export default GuideMyPageMyPost;
