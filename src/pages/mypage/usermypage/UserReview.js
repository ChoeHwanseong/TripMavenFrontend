import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/usermypage/UserReview.module.css';
import { useNavigate } from 'react-router-dom';
import { reviewGet } from '../../../utils/reviewData';
import { TemplateContext } from '../../../context/TemplateContext';


const UserReview = () => {
  const navigate = useNavigate();
  const {memberInfo} = useContext(TemplateContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 리뷰 가져오기
        const resultReviews = await reviewGet(memberInfo.id);
        setReviews(resultReviews);

      } catch (error) {
        console.error('리뷰 데이터 조회 중 에러:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>작성한 리뷰</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>번호</th>
                <th>상품명</th>
                <th>제목</th>
                <th>작성일</th>
                <th>상품 보기</th>
              </tr>
            </thead>
            <tbody>

              {reviews ? (
                reviews.map((review) => (
                  <tr key={review.id} className={styles.reviewRow} onClick={() => navigate(`/reviewDetailsUpdate/${review.id}`)}>
                    <td>{review.id}</td>
                    <td>{review.productBoard.title}</td>
                    <td>{review.title}</td>
                    <td>{review.createdAt.split('T')[0]}</td>
                    <td onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/mypage/postDetails/${review.productBoard.id}`);
                    }}>바로가기</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">작성하신 리뷰가 없습니다.</td>
                </tr>
              )}



            </tbody>
          </table>

          <div className={styles.pagination}>
            <span className={styles.pageControl}>&lt;</span>
            <span className={styles.pageNumber}>1</span>
            <span className={styles.pageControl}>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
