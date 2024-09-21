import React from 'react';
import styles from '../../../styles/guidemypage/guidemypagelike/GuideMyPageLike.module.css';
import PinItem from './PinItem';

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
