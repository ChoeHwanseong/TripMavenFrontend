import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import styles from '../../styles/guidemypage/GuidePostDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postDelete, postGetById } from '../../utils/postData';
import KakaoMap from '../../utils/KakaoMap'; 
import { HotelIcon } from 'lucide-react';
import ComplaintModal from '../report/ComplaintModal';
import ProfileCardModal from './GuideProfileModal'; // 여기서 모달 컴포넌트 가져오기

const GuidePostDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [isGuideModalOpen, setGuideModalOpen] = useState(false);  // 가이드 모달 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaintId, setComplaintId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await postGetById(id);
        console.log('fetchedData: ', fetchedData);
        setData(fetchedData);
        setLikes(fetchedData.likes == null ? 0 : fetchedData.likes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [id]);

  const handleLike = () => {
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    setLiked((prevLiked) => !prevLiked);
  };

  // 신고 모달
  const openModal = () => {
    setComplaintId(id); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setComplaintId(null); 
  };

  const handleSubmit = (complaintData) => {
    console.log('Complaint submitted:', complaintData, 'for id:', complaintId);
    closeModal();
  };

  // 가이드 프로필 모달
  const openGuideModal = () => {
    console.log('가이드 프로필 모달 오픈');
    setGuideModalOpen(true);
  };

  const closeGuideModal = () => {
    console.log('가이드 프로필 모달 닫기');
    setGuideModalOpen(false);
  };

  
  // 게시글 삭제 (ORA-02292: 무결성 제약조건)
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
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={openGuideModal}
          >
            가이드 프로필 보기
          </Button>
          {/* ProfileCardModal 컴포넌트로 가이드 데이터 전달 */}
          <ProfileCardModal 
            isOpen={isGuideModalOpen} 
            onClose={closeGuideModal} 
            guideData={data.member} // 가이드 데이터를 ProfileCardModal로 전달
          />
        </Box>

        <Box className={styles.titleSection}>
          <Typography 
            variant="overline" 
            color="primary" 
            sx={{ fontWeight: 'bold', display: 'inline-block', marginRight: 2 }}
          >
            {data.city}
          </Typography>
          <Typography 
            variant="overline" 
            color="secondary" 
            sx={{ fontWeight: 'bold', display: 'inline-block', marginRight: 2 }}
          >
            {data.day}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ marginTop: 2 }}>
            {data.title}
          </Typography>
        </Box>

        <Box className={styles.authorInfo}>
          <Avatar src={data.member.profileImageUrl || "/path/to/avatar.png"} alt="Author Avatar" sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography variant="body2" sx={{ mr: 1 }}>{data.member.name}</Typography>
          <Typography variant="body2" color="textSecondary">{data.createdAt.split('T')[0]}</Typography>
        </Box>

        <Box className={styles.hashtags} sx={{ mt: 2 }}>
          {data.hashtag.split('#').map((tag, index) => (
            tag.trim() !== '' && (
              <Button
                key={index}
                variant="outlined"
                color="primary"
                size="small"
                sx={{ marginRight: 1, marginBottom: 1 }}
              >
                #{tag.trim()}
              </Button>
            )
          ))}
        </Box>
      </Box>

      <Box className={styles.symbolsSection} sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2 }}>
        <Box className={styles.symbol} sx={{ mr: 2 }}>
          <Typography variant="body1">125건의 리뷰</Typography>
        </Box>
        <Box className={`${styles.symbol} ${styles.star}`} sx={{ mr: 2 }}>
          <Typography variant="body1">★ 4.5</Typography>
        </Box>
        <Box className={styles.symbol} sx={{ mr: 2 }}>
          <Typography variant="body1">AI 평가 점수</Typography>
        </Box>
        <Box className={`${styles.symbol} ${styles.blueStar}`} sx={{ mr: 2 }}>
          <Typography variant="body1">★ 4.7</Typography>
        </Box>
        <button className={styles.likeButton} onClick={handleLike} style={{ marginRight: '16px' }}>
          {liked ? '♥' : '♡'}<span className={styles.likeCount}>{likes}</span>
        </button>
        <Button variant="text" color="secondary" onClick={openModal}>신고</Button>
        {isModalOpen && <ComplaintModal onClose={closeModal} onSubmit={handleSubmit} id={id} />}
      </Box>

      <Box className={styles.shadowBox}>
        <Box className={styles.contentSection}>
          <Typography variant="body1" component="div">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </Typography>
        </Box>

        <Box className={styles.mapSection}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            <HotelIcon sx={{ mr: 1 }} />
            <span style={{ color: 'black' }}>호텔 정보</span>
          </Typography>

          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {data.hotel == null ? "호텔 정보가 없습니다." : data.hotel}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
              {data.hotelAd}
            </Typography>
            <KakaoMap address={data.hotelAd == null ? data.hotel : data.hotelAd} />
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
