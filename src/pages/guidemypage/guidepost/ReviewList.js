import React, { useState, useEffect } from 'react';
import styles from '../../../styles/guidemypage/giudePost/ReviewList.module.css';
import { Avatar } from '@mui/material';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';
import { reviewGet } from '../../../utils/reviewData';

const ReviewList = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await reviewGet(id);
        console.log('Fetched review data: ', reviewData);
        setReviews(reviewData); // 리뷰 데이터를 배열로 설정
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (id) {
      getReviews();
    }
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.max(0, Math.floor(rating));
    const halfStar = rating % 1 !== 0;
    const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0));

    console.log('fullStars:', fullStars, 'halfStar:', halfStar, 'emptyStars:', emptyStars);

    const generateStars = (count, Component) => (
      Array.from({ length: count }, (_, index) => (
        <Component className={styles.reviewRating} key={`${Component.name}-${index}`} />
      ))
    );

    return (
      <>
        {generateStars(fullStars, Star)}
        {halfStar && <StarHalf className={styles.reviewRating} key="half-star" />}
        {generateStars(emptyStars, StarBorder)}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.reviewHeader}>
        <span className={styles.reviewHeaderTitle}>리뷰</span>
        <span className={styles.reviewCount}>{reviews.length}건의 리뷰</span>
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={styles.reviewItem}>
            <Avatar alt={review.name} src={review.avatar} className={styles.avatar} />
            <div className={styles.reviewDetails}>
              <div className={styles.reviewerName}>{review.name}</div>
              <div className={styles.reviewTitle}>{review.reviewTitle}</div>
              <div className={styles.reviewText}>{review.content}</div>
              <div className={styles.reviewRating}>
                {renderStars(review.rating)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default ReviewList;
