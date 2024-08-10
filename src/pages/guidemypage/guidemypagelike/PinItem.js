import React from 'react';
import styles from '../../../styles/guidemypage/guidemypagelike/pinItem.module.css';

const PinItem = ({ pin }) => {
    return (
        <div className={styles.pinItem}>
            <img src={pin.image} alt={pin.title} />
            <div className={styles.pinDetails}>
                <div className={styles.pinTitle}>{pin.title}</div>
                <div className={styles.pinTags}>
                    {pin.tags.map(tag => (
                        <span key={tag} className={styles.pinTag}>{tag}</span>
                    ))}
                </div>
                <div className={styles.pinStats}>
                    <span>{pin.reviews}건의 리뷰</span>
                    <span>⭐{pin.rating}</span>
                    <span className={styles.aiRating}>ai 평가 점수 ⭐{pin.aiRating}</span>
                    <span className={styles.pinFavorite}>❤️</span>
                </div>
            </div>
        </div>
    );
};

export default PinItem;
