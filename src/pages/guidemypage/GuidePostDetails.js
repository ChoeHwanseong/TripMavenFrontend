import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import styles from '../../styles/guidemypage/GuidePostDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postDelete, postGetById, postLikey, deleteLikey } from '../../utils/postData';
import KakaoMap from '../../utils/KakaoMap'; 
import { HotelIcon, TreePalm } from 'lucide-react';
import ComplaintModal from '../report/ComplaintModal';
import ProfileCardModal from './GuideProfileModal'; 
import ImageSlider from './guidepost/ImageSlider';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchFiles } from '../../utils/fileData';
import Reviews from './guidepost/ReviewList';

const GuidePostDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [fileUrls, setFileUrls] = useState([]);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaintId, setComplaintId] = useState(null);
  const { id } = useParams();
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const membersId = localStorage.getItem('membersId');

  const onRefButtonClick = () => {
    setIsExpanded(prev => !prev);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await postGetById(id);
        console.log('fetchedData: ', fetchedData);
        setData(fetchedData);

        const isLikey = fetchedData.likey.find(like => like.member.id == membersId);
        setLiked(!!isLikey);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getFiles = async () => {
      try {
        const fileData = await fetchFiles(id);
        console.log('fileData: ', fileData);
        setFileUrls(fileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
    getFiles();
  }, [id, liked]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await postLikey(membersId, data.id);
      } else {
        await deleteLikey(membersId, data.id);
      }
      setLiked(prev => !prev);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

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

  const openGuideModal = () => {
    setGuideModalOpen(true);
  };

  const closeGuideModal = () => {
    setGuideModalOpen(false);
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
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={openGuideModal}
          >
            가이드 프로필 보기
          </Button>
          <ProfileCardModal 
            isOpen={isGuideModalOpen} 
            onClose={closeGuideModal} 
            guideData={data.member}
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
                className={styles.hashtagButton} 
                variant="contained"
                size="small"
                onClick={() => navigate(`/product?keyword=${tag.trim()}`)}
              >
                #{tag.trim()}
              </Button>
            )
          ))}
        </Box>

        <div className={styles.container}>
          <ImageSlider fileUrls={fileUrls} />
        </div>
      </Box>


      <Box className={styles.symbolsSection} sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2 }}>

      <Button
        variant="outlined"
        className={styles.outlinedButton}
        onClick={() => navigate('/bigchat')}
      >
        <Typography variant="body1">가이드에게 채팅하기</Typography>
      </Button>
       
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
          {liked ? <FontAwesomeIcon icon={faHeart}/> : <FontAwesomeIcon icon={faHeart} /> }<span className={styles.likeCount}>{data.likey ? data.likey.length : '0'}</span>
        </button>
        <Button variant="text" color="secondary" onClick={openModal}>신고</Button>
        {isModalOpen && <ComplaintModal onClose={closeModal} onSubmit={handleSubmit} id={id} />}
      </Box>

      <Box className={styles.shadowBox}>
        <Box className={styles.contentSection}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            <TreePalm sx={{ mr: 1 }} />
            <span style={{ color: 'black' }} className='align-text-top'>상품 설명</span>
          </Typography>
          
          <Typography variant="body1" component="div">
            <div 
              dangerouslySetInnerHTML={{ __html: data.content }} 
              ref={contentRef} 
              className={`mt-3 transition ${!isExpanded ? styles.blur : ''}`} 
              style={{
                maxHeight: isExpanded ? 'none' : '400px',
                overflow: 'hidden'
              }}
            />
            <div className={`${!isExpanded && styles.blurOverlay} ${isExpanded ? styles.noBlur : ''}`}></div>
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            id='contentBtn'
            className={styles.actionButtons}
            variant="contained" 
            onClick={onRefButtonClick}
          >
            {isExpanded ? '상품 설명 접기' : '상품 설명 더 보기'}
          </Button>
        </Box>
        
        <img src="../../images/WebTestPageLine.png" alt="Line Image" />

        <Box className={styles.mapSection}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            <HotelIcon sx={{ mr: 1 }} />
            <span style={{ color: 'black' }} className='align-text-top'>호텔 정보</span>
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

        <img src="../../images/WebTestPageLine.png" alt="Line Image" />
      </Box>

      <Box className={styles.symbolsSection} sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2 }}>
        <Reviews id={id}/>
      </Box>

      <Box className={styles.actions}>
        {data.member.id === Number(membersId) && (
          <>
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
          </>
        )}
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
