import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import styles from '../../styles/guidemypage/GuidePostDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postDelete, postGetById, postLikey, deleteLikey } from '../../utils/postData';
import KakaoMap from '../../utils/KakaoMap'; 
import { HotelIcon, TreePalm } from 'lucide-react';
import ComplaintModal from '../report/ComplaintModal';
import ProfileCardModal from './GuideProfileModal'; // 여기서 모달 컴포넌트 가져오기
import ImageSlider from './guidepost/ImageSlider';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchFiles } from '../../utils/fileData';
import ForumIcon from '@mui/icons-material/Forum';

const GuidePostDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [fileUrls,setFileUrls] = useState([]);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);  // 가이드 모달 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaintId, setComplaintId] = useState(null);
  const { id } = useParams();
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);/* 더보기&접기 상태 저장 */

  const membersId = localStorage.getItem('membersId');

  //내용 더보기 버튼
  function onRefButtonClick() {
    // 버튼 누르면 기존 height값으로 바꾸기
    setIsExpanded(!isExpanded);
    document.getElementById('contentBtn').hidden=true;  
  }




  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await postGetById(id);
        console.log('fetchedData: ', fetchedData);
        !data ? setData(fetchedData) :setData(prev=>({...prev, likey:[...fetchedData.likey]}));

        //likey 리스트에 현재 로그인된 멤버 아이디 찾기
        const isLikey = fetchedData.likey.find(like=>like.member.id==localStorage.getItem("membersId"));
        isLikey?setLiked(true):setLiked(false);
        console.log(isLikey);
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
  }, [liked]);

  const handleLike = async () => {
    if(!liked){
      await postLikey(localStorage.getItem("membersId"),data.id);
      setLiked(!liked);
    }
    else{
      await deleteLikey(localStorage.getItem("membersId"),data.id);
      setLiked(!liked);
    }
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
          {data && data.hashtag.split('#').map((tag, index) => (
            tag.trim() !== '' && (
              <Button
                key={index}
                className={styles.hashtagButton} 
                variant="contained"
                size="small"
                onClick={()=>navigate(`/product?keyword=${tag.trim()}`)}
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
        color="primary" 
        onClick={() => navigate(`/bigchat/${id}`)} // 상품 id 넘기기
        sx={{ mr: 'auto' }}
        startIcon={<ForumIcon />}
      >가이드에게 채팅하기</Button>

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
          {liked ? <FontAwesomeIcon icon={faHeart}/> : <FontAwesomeIcon icon={faHeart} /> }<span className={styles.likeCount}>{data.likey?data.likey.length:'0'}</span>
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
          
          {/* 글 내용 */}
          <Typography variant="body1" component="div">
            <div  dangerouslySetInnerHTML={{ __html: data.content }} 
            ref={contentRef} 
            className={`mt-3 overflow-hidden transition ${!isExpanded ? styles.blur : ''}`} 
            style={{
              maxHeight: isExpanded ? 'none' : '400px'
            }}/>
            <div className={`${!isExpanded && styles.blurOverlay} ${isExpanded ? styles.noBlur : ''}`}></div>
          </Typography>
        </Box>
        
        {/* 글 더보기 버튼 */}
        <Box sx={{ display: 'flex', justifyContent:'center', mt: 2 }}
            className={styles.blurOverlay}>
          <Button
                id='contentBtn'
                className={styles.actionButtons }
                variant="contained" 
                onClick={onRefButtonClick}
              >상품 설명 더 보기</Button>
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
