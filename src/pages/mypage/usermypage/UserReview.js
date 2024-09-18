import React, { useEffect, useState } from 'react';
import styles from '../../../styles/usermypage/UserReview.module.css';
import { useNavigate } from 'react-router-dom';
import { reviewGet } from '../../../utils/reviewData';
import { postGetBymemberId } from '../../../utils/postData';
import { fetchFile } from '../../../utils/fileData';


const UserReview = () => {
  const navigate = useNavigate();
  const membersId = localStorage.getItem('membersId');
  const [reviews, setReviews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [availableReviews, setAvailableReviews] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        // 게시글 가져오기
        const resultPosts = await postGetBymemberId(membersId);
        console.log('게시글 가져오기 resultPosts: ', resultPosts);
  
        // 게시글 파일 이미지 가져오기
        const postsWithImages = await Promise.all(
          resultPosts.map(async (post) => {
            const file = post.files.split(',')[0];

            const image = await fetchFile(file, post.id);
            console.log('게시글 파일 이미지 가져오기image: ', image);
  
            return {
              ...post,
              image,
            };
          })
        );
        
        console.log('postsWithImages: ',postsWithImages)
        // 게시글 세팅
        setPosts(postsWithImages);

  

        // 리뷰 가져오기
        const resultReviews = await reviewGet(membersId);
        console.log('리뷰resultReviews: ',resultReviews);
        setReviews(resultReviews);
  
      } catch (error) {
        console.error('리뷰 데이터 조회 중 에러:', error);
      }
    };
  
    fetchData();
  }, [membersId]);
  



  useEffect(() => {
   /*
    if (posts) {
      console.log('가져온 게시글 데이터:', posts);

      const updatedReviews = posts.map(post => ({
        id: post.id,
        image: post.files,
        description: `[${post.city} ${post.day}] ${post.title} ${post.hashtag}`,
      }));

      setAvailableReviews(updatedReviews);
    }*/

  }, [posts]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.reviewSection}>
          <div className={styles.header}>
            <h1>리뷰 작성</h1>
          </div>

          <div className={styles.reviewList} >      

{posts.map((post)=>(
                <div className={styles.reviewItem}>
                  <img src={post.image || '../../../images/travel.jpg'} alt="review" className={styles.reviewImage} />
                  <span className={styles.reviewText}>[{post.city} {post.day}] {post.title} {post.hashtag}</span>
                  <button
                    className={styles.reviewButton}
                    onClick={() => navigate(`/reviewdetails/${post.id}`)}
                  >
                    리뷰 작성
                  </button>
                  <button
                    className={styles.reviewButton}
                    onClick={() => navigate(`/postDetails/${post.id}`)}
                  >
                    게시글 보러가기
                  </button>

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

            {reviews ? (
                reviews.map((review) => (
                  <tr key={review.id}  className={styles.reviewRow} onClick={()=>navigate(`/reviewDetailsUpdate/${review.id}`)}>
                    <td>{review.id}</td>
                    <td>{review.productBoard.title}</td>
                    <td>{review.title}</td>
                    <td>{review.createdAt.split('T')[0]}</td>
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
