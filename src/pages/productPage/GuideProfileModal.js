import React from 'react';
import { Box, Typography, Button, Rating, Modal, Avatar } from '@mui/material';
import styles from '../../styles/productPage/GuideProfileModal.module.css';

const ProfileCardModal = ({ isOpen, onClose, guideData }) => {

    if (!guideData) return null; // 가이드 데이터가 없을 경우 모달을 렌더링하지 않음

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box className={styles.modalContent}>
                <Box className={styles.card}>
                    <Box className={styles.profile}>
                        <Avatar src={guideData.profile || '/path/to/default-avatar.png'} alt="Guide Avatar" className={styles.avatar} />
                        <Box>
                            <Typography variant="h6" className={styles.name}>
                                {guideData.name}
                            </Typography>
                            <Typography variant="body2" className={styles.subtitle}>
                                완벽한 여행의 길잡이, 당신의 특별한 경험을 도와드립니다.
                            </Typography>
                        </Box>
                    </Box>

                    {/* 해시태그 강조 */}
                    <Box className={styles.hashtags} sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 2 }}>
                        <Typography variant="body2" className={styles.hashtag}>#명로성</Typography>
                        <Typography variant="body2" className={styles.hashtag}>#유창성</Typography>
                        <Typography variant="body2" className={styles.hashtag}>#명로성</Typography>
                        <Typography variant="body2" className={styles.hashtag}>#유창성</Typography>
                        <Typography variant="body2" className={styles.hashtag}>#명로성</Typography>
                        <Typography variant="body2" className={styles.hashtag}>#유창성</Typography>
                    </Box>

                    {/* 소개 섹션 */}
                    <Box className={styles.description}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>소개</Typography>
                        <Typography variant="body2">
                            {guideData.description || 
                            "안녕하세요, 가이드 ㅇㅇㅇ입니다. 순간의 기억이 영원히 남을 수 있도록, 여러분의 특별한 순간을 기록으로 완성해드립니다. 소중한 추억을 마음속 깊이 간직하게 만드는 여정, 저와 함께 떠나보세요. 이 외에도 다양한 활동을 통해 여러분의 여정을 더욱 풍성하게 만들어드릴 것을 약속드립니다. 믿을 수 있는 가이드와 함께 잊지 못할 추억을 만들어보세요."}
                        </Typography>
                    </Box>

                    {/* 평점 섹션 */}
                    <Box className={styles.ratings} sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', gap: 5 }}>
                        <Box className={styles.rating} sx={{ textAlign: 'center' }}>
                            <Typography variant="body2">AI 평균 평점</Typography>
                            <Rating value={guideData.aiRating || 4.5} readOnly precision={0.1} />
                            <Typography variant="body2">{guideData.aiRating || 4.5} / 5.0</Typography>
                        </Box>
                        <Box className={styles.rating} sx={{ textAlign: 'center' }}>
                            <Typography variant="body2">리뷰 평균 평점</Typography>
                            <Rating value={guideData.averageRating || 4.7} readOnly precision={0.1} />
                            <Typography variant="body2">{guideData.averageRating || 4.7} / 5.0</Typography>
                        </Box>
                    </Box>

                    {/* 버튼 UI */}
                    <Box className={styles.buttons} sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                        <Button className={`${styles.customButton} ${styles.white}`} variant="contained">
                            게시글<br />보러가기
                        </Button>
                        <Button className={`${styles.customButton} ${styles.blue}`} variant="contained">
                            리뷰<br />보러가기
                        </Button>
                        <Button className={`${styles.customButton} ${styles.white}`} variant="contained">
                            채팅 하기
                        </Button>
                    </Box>

                    <Button onClick={onClose} sx={{ marginTop: 3 }}>Close</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProfileCardModal;
