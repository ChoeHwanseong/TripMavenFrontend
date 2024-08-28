import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import styles from '../../styles/guidemypage/GuidePostDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postDelete, postGetById } from '../../utils/postData';
import KakaoMap from '../../utils/KakaoMap'; // KakaoMap 컴포넌트 가져오기
import { HotelIcon } from 'lucide-react';

const GuidePostDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  //const [fileUrls, setFileUrls] = useState([]); 파일 뿌려주기용

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();


  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await postGetById(id);
        console.log('fetchedData: ', fetchedData);
        setData(fetchedData);
        setLikes(fetchedData.likes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    //파일 이미지 뿌려주기
    /*
    const getFiles = async () => {
      try {
        const fileUrl = await fetchFiles(id);
        setFileUrls([fileUrl]); // 받아온 파일 URL을 배열로 저장
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
  */
    getData();
  }, [id]);



  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const deletePost = async () => {
    const confirmed = window.confirm("진짜 삭제?");
    if (confirmed) {
      try {
        await postDelete(id);
        navigate('/guidemypost');
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

  if (!data) {
    return <div>로딩중</div>;
  }

  return (
    <Box className={styles.postHeaderContainer}>
      <Box className={styles.shadowBox}>
        <Box className={styles.topBar}>
          <Typography variant="subtitle2">{id}번째 게시글</Typography>
          <Button variant="contained" color="primary" size="small">프로필 보기</Button>
        </Box>

        <Box className={styles.titleSection}>
          
          <Typography variant="overline" color="textSecondary">{data.city}</Typography>
          <Typography variant="h4" fontWeight="bold">{data.title}</Typography>
        </Box>

        <Box className={styles.authorInfo}>
          <Avatar src="/path/to/avatar.png" alt="Author Avatar" sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography variant="body2" sx={{ mr: 1 }}>{data.member.name}</Typography>
          <Typography variant="body2" color="textSecondary">{data.createdAt.split('T')[0]}</Typography>
        </Box>

        {/* Hashtags Section */}
        <Box className={styles.hashtags}>
          {data.hashtag}
        </Box>

    

        <Box className={styles.symbolsSection}>
          <Box className={styles.symbol}>
            <Typography variant="body1">125건의 리뷰</Typography>
          </Box>
          <Box className={`${styles.symbol} ${styles.star}`}>
            <Typography variant="body1">★ 4.5</Typography>
          </Box>
          <Box className={styles.symbol}>
            <Typography variant="body1">ai 평가 점수</Typography>
          </Box>
          <Box className={`${styles.symbol} ${styles.blueStar}`}>
            <Typography variant="body1">★ 4.7</Typography>
          </Box>
          <button className={styles.likeButton} onClick={handleLike}>
            {liked ? '♥' : '♡'}<span className={styles.likeCount}>{likes}</span>
          </button>
          <Button variant="text" color="secondary">신고</Button>
        </Box>
      </Box>

      {/* Content Section */}
      <Box className={styles.shadowBox}>
        <Box className={styles.contentSection}>
          <Typography variant="body1" component="div">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </Typography>
        </Box>

        <Box className={styles.mapSection}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          <HotelIcon sx={{ mr: 1 }} />
            호텔 정보
          </Typography>
          
        <div>
          <Typography variant="subtitle2">{data.hotel==null ? "호텔 정보가 없습니다." : data.hotel}</Typography>
          <KakaoMap address={data.hotelAd==null ? data.hotel :data.hotelAd} latitude={37.5665} longitude={126.9780} /> {/* 서울의 위치를 예시로 사용 */}
        </div>
        </Box>       
      </Box>

      <Box className={styles.actions}>
            <Button 
                className={styles.actionButton}
                variant="contained" 
                color="primary" 
                onClick={() => navigate(`/guidePostUpdate/${id}`)}
            >
                수정 하기
            </Button>
            <Button 
                className={styles.actionButton}
                variant="contained" 
                color="primary" 
                onClick={deletePost}
            >
                삭제 하기
            </Button>
            <Button 
                className={styles.actionButton}
                variant="outlined" 
                color="primary" 
                onClick={() => navigate('/guidemypost')}
            >
                목록
            </Button>
        </Box>

      
    </Box>
  );
};

export default GuidePostDetails;
