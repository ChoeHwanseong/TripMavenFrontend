import React, { useEffect, useState } from 'react';
import styles from '../../styles/guidemypage/GuidePost.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost } from '../../utils/productData';
import { fetchedData } from '../../utils/memberData';

const GuidePost = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  // 작성자 아이디 가져오기
  // useEffect(() => {
  //   const getPostData = async () => {
  //     try {
  //       const fetchData = await fetchedData(id);
  //       console.log('fetchData: ',fetchData);
  //       setPosts(fetchData);
  //     } catch (error) {
  //       console.error('에러났당', error);
  //     }
  //   };

  //   getPostData();
  // }, []);


  // 게시글 등록
  const handleCreateClick = () => {
    try {
      const fetchData = createPost();
      console.log('fetchData: ',fetchData);
      setPosts(fetchData);
    } catch (error) {
      console.error('에러났당', error);
    }
  };

  


  return (
    <div className={styles.container}>
    <h2>게시물 등록하기</h2>

    {/* 대표 내용 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>대표 내용</h3>
      <div className={styles.field}>
        <label>제목</label>
        <input type="text" placeholder="제목을 입력하세요" />
      </div>
      <div className={styles.field}>
        <label>해시태그</label>
        <input type="text" placeholder="해시태그를 입력하세요" />
      </div>
      <div className={styles.field}>
        <label>대표 이미지</label>
        <input type="file"/>
      </div>
    </section>

    {/* 여행 주요일정 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>여행 주요일정</h3>
      <div className={styles.field}>
        <label>일정(기간)</label>
        <input type="text" placeholder="일정을 입력하세요" />
      </div>
      <div className={styles.field}>
        <label>여행도시</label>
        <input type="text" placeholder="여행 도시를 입력하세요" />
      </div>
    </section>

    {/* 테마 소개 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>테마 소개</h3>
      {[1, 2, 3].map((day) => (
        <div className={styles.field} key={day}>
          <label>{day}일차</label>
          <textarea placeholder={`${day}일차 일정을 입력하세요`} />
        </div>
      ))}
    </section>

    {/* 호텔 정보 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>호텔 정보</h3>
      <div className={styles.field}>
        <label>호텔</label>
        <input type="text" placeholder="호텔 이름을 입력하세요" />
      </div>
      <div className={styles.field}>
        <label>주소</label>
        <input type="text" placeholder="호텔 주소를 입력하세요" />
      </div>
    </section>

    <button className={styles.submitButton} onClick={handleCreateClick}>등록하기</button>
  </div>
  );
};

export default GuidePost;
