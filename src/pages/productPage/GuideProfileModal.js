import React from 'react';
import { Box, Typography, Button, Rating, Modal, Avatar } from '@mui/material';
import styles from '../../styles/productPage/GuideProfileModal.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileCardModal = ({ isOpen, onClose, guideData }) => {
    console.log('guideData: ',guideData);
    const navigate = useNavigate();

    if (!guideData) return null; // 가이드 데이터가 없을 경우 모달을 렌더링하지 않음

    const handelClick = () => {
        navigate(`/askdetails/${guideData.id}`)
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
        <Box className={styles.modalContent}>
          <Box className={styles.card}>
            <Box className={styles.profile}>
              <Avatar src={guideData.profile || '/path/to/default-avatar.png'} alt="Guide Avatar" className={styles.avatar} />
              <Typography variant="h6" className={styles.name}>
                {guideData.name}
              </Typography>
            </Box>
  
            {/* 해시태그 강조 */}
            {/* <Box className={styles.hashtags} sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 2 }}>
              {guideData.hashtags?.map((tag, index) => (
                <Typography
                  key={index}
                  variant="body1" // 폰트를 키움
                  className={styles.hashtag}
                  sx={{
                    backgroundColor: '#3f51b5', // 컬러 추가
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  #{tag}
                </Typography>
              ))}
            </Box> */}

        <Box className={styles.hashtags} sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 2 }}>
            <Typography variant="body2" className={styles.hashtag}>#명로성</Typography>
            <Typography variant="body2" className={styles.hashtag}>#유창성</Typography>
            <Typography variant="body2" className={styles.hashtag}>#명로성</Typography>
            <Typography variant="body2" className={styles.hashtag}>#유창성</Typography>
            <Typography variant="body2" className={styles.hashtag}>#명로성</Typography>
            <Typography variant="body2" className={styles.hashtag}>#유창성</Typography>
            <Typography variant="body2" className={styles.hashtag}>#명로성</Typography>
         </Box>

        {/* 리뷰 및 AI 평가 평점 섹션 */}    
        <Box className={styles.ratings} sx={{ marginTop: 3 }}>
            <Box className={styles.rating} sx={{ marginRight: 1 }}> {/* 간격 조정 */}
             <Typography variant="body2">리뷰 평균 평점</Typography>
             <Rating value={guideData.averageRating || 4.7} readOnly precision={0.1} />
             <Typography variant="body2">{guideData.averageRating || 4.7} / 5.0</Typography>
             </Box>
             <Box className={styles.rating} sx={{ marginLeft: 1 }}> {/* 간격 조정 */}
            <Typography variant="body2">AI 평균 평점</Typography>
            <Rating value={guideData.aiRating || 4.5} readOnly precision={0.1} />
            <Typography variant="body2">{guideData.aiRating || 4.5} / 5.0</Typography>
            </Box>
        </Box>

         {/* 문의하기 버튼 */}
        {/* <Button variant="outlined" className={styles.button} onClick={handelClick}>
           문의하기
        </Button> */}

         {/* 소개 섹션 */}
         <Box className={styles.description}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>소개</Typography>
            <Typography variant="body2">{guideData.description || "안녕하세요, 가이드입니다."}</Typography>
        </Box>

        {/* 자격증 섹션 추가 */}
        {guideData.guidelicense && guideData.guidelicense.length > 0 && (
             <Box className={styles.certifications} sx={{ marginTop: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>자격증</Typography>
                <ul>
                {guideData.certifications && guideData.certifications.map((cert, index) => (
                <li key={index} className={styles.certItem}>
                <Typography variant="body2">{cert}</Typography>
                </li>
                ))}
                </ul>
            </Box>
        )}   

        <Typography variant="body2" className={styles.expert}>
            전문가 소개 더 보러가기 &gt;
        </Typography>

        <Button onClick={onClose}>Close</Button>

        </Box>
     </Box>
    </Modal>
    );
  };
export default ProfileCardModal;
