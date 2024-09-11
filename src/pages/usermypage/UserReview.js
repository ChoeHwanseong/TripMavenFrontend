import React, { useEffect, useState } from 'react';
import styles from '../../styles/usermypage/UserReview.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewGet } from '../../utils/reviewData';
import { postGetByEmail } from '../../utils/postData';
import { fetchedData } from '../../utils/memberData';


const UserReview = () => {
  const navigate = useNavigate();
  const availableReviews = [
    {
      id: 1,
      image: 'https://via.placeholder.com/80',
      description: '[경주 2박 3일] 경주월드#놀이공원 #불국사 #석굴암 #황리단길 #동궁과 월지',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/80',
      description: '[보성 녹차 체험]힐링 여행#녹차밭 #보성 차밭 빛 축제 #율포해수욕장 #제암산 자연휴양림',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/80',
      description: '[제주 가족 여행]실속여행 제주 3일#우도집중관광 #스카이워터쇼 #송악산 둘레길 #카멜리아힐',
    },
  ];

  const writtenReviews = [
    { id: 2, productName: '부산호@@◎◎ㅇㄴㄹ', title: '조아요', date: '2024-08-01' },
    { id: 1, productName: '경주◎ㅇ◎ㅇㅇㄹ', title: '안조아요', date: '2023-12-31' },
  ];

  const  membersId  = localStorage.getItem('membersId');
  const [reviews,setReviews] = useState(null);
  const [posts,setPosts] = useState(null);
  const [members,setMembers] = useState(null);
  

  useEffect(()=>{

    // 멤버 정보 가져오기
   
    const getMember = async () => {
      const memberResult = await fetchedData(membersId);
      console.log('회원 결과: ',memberResult);
      setMembers(memberResult);
    };

    // 게시글 가져오기
    const getPosts = async () => {
      const result = await postGetByEmail(members.email);
      console.log('게시글result: ',result);
      setPosts(result);
    };
 
    // 리뷰 가져오기
    const getReview = async () => {
      const result = await reviewGet(membersId);
      console.log('리뷰result',result);
      setReviews(result);
    };

    getMember();
    getPosts();
    getReview();

  },[membersId]);


  


  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.reviewSection}>
          <div className={styles.header}>
            <h1>리뷰 작성</h1>
          </div>

          <div className={styles.reviewList}>
            {availableReviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <img src={review.image} alt="review" className={styles.reviewImage} />
                <span className={styles.reviewText}>{review.description}</span>
                <button className={styles.reviewButton} onClick={()=>navigate(`/reviewdetails/43`)}>리뷰 작성</button>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <span className={styles.pageControl}>&lt;</span>
            <span className={styles.pageNumber}>1</span>
            <span className={styles.pageControl}>&gt;</span>
          </div>
        </div>

        <div>
          <h2>작성한 리뷰</h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>번호</th>
                <th>상품명</th>
                <th>제목</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {writtenReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.productName}</td>
                  <td>{review.title}</td>
                  <td>{review.date}</td>
                </tr>
              ))}
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

