import React from 'react';
import styles from '../../styles/GuideMyPageLike.module.css';
import PinItem from './pinItem';

const GuideMyPageLike = () => {
    //나중에 데이터 베이스에서 끌어올 데이터
    const pins = [
        {
            id: 1,
            title: '경주 2박 3일',
            image: '경주이미지URL',
            tags: ['경주', '기차', '연인', '친구', '황리단길'],
            reviews: 75,
            rating: 3.7,
            aiRating: 4.0
        },
        {
            id: 2,
            title: '보성 녹차 체험',
            image: '보성이미지URL',
            tags: ['보성', '녹차밭', '가족여행', '휴양지'],
            reviews: 56,
            rating: 4.6,
            aiRating: 4.6
        },
        // 나머지 핀 데이터들
    ];

    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
                <ul>
                    <li>내 정보 관리</li>
                    <li>내 게시물 관리</li>
                    <li>1:1문의 내역</li>
                    <li>찜 목록</li>
                    <li>채팅방</li>
                    <li>ai 서비스</li>
                </ul>
            </div>
            <div className={styles.content}>
                <h1>찜 목록</h1>
                <div className={styles.pinList}>
                    {pins.map(pin => (
                        <PinItem key={pin.id} pin={pin} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuideMyPageLike;
