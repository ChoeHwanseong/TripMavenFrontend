import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/guidemypage/GuidePost.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postPost } from '../../utils/postData';

const GuidePost = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState(null);
  const membersId= localStorage.getItem('membersId');
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const hashtagRef = useRef(null);
  const filesgRef = useRef(null);
  const dayRef = useRef(null);
  const cityRef = useRef(null);
  const hotelRef = useRef(null);
  const hotelAdRef = useRef(null);
  const contentRef = useRef(null);

  // 게시글 등록
  const handlePost = async() => {
    try {
        const createData = { title: titleRef.current.value,
                            hashtag : hashtagRef.current.value,
                            files : filesgRef.current.value,
                            day : dayRef.current.value,
                            city  : cityRef.current.value,
                            hotel : hotelRef.current.value,
                            hotelAd : hotelAdRef.current.value,
                            content: contentRef.current.value,
                            member_id: membersId
                          };
        await postPost(createData);
        navigate('/guidemypost');

    } catch (error) {
        console.error('Error updating answer:', error);
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
        <input type="text" placeholder="제목을 입력하세요" ref={titleRef}/>
      </div>
      <div className={styles.field}>
        <label>해시태그</label>
        <input type="text" placeholder="해시태그를 입력하세요" ref={hashtagRef}/>
      </div>
      <div className={styles.field}>
        <label>대표 이미지</label>
        <input type="file" ref={filesgRef}/>

      </div>
    </section>

    {/* 여행 주요일정 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>여행 주요일정</h3>
      <div className={styles.field}>
        <label>일정(기간)</label>
        <input type="text" placeholder="일정을 입력하세요" ref={dayRef}/>
      </div>
      <div className={styles.field}>
        <label>여행도시</label>
        <input type="text" placeholder="여행 도시를 입력하세요" ref={cityRef}/>
      </div>
    </section>

    {/* 테마 소개 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>테마 소개</h3>
      {[1, 2, 3].map((day) => (
        <div className={styles.field} key={day}>
          <label>{day}일차</label>
          <textarea placeholder={`${day}일차 일정을 입력하세요`} ref={contentRef}/>
        </div>
      ))}
    </section>

    {/* 호텔 정보 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>호텔 정보</h3>
      <div className={styles.field}>
        <label>호텔</label>
        <input type="text" placeholder="호텔 이름을 입력하세요" ref={hotelRef}/>
      </div>
      <div className={styles.field}>
        <label>주소</label>
        <input type="text" placeholder="호텔 주소를 입력하세요" ref={hotelAdRef}/>
      </div>
    </section>

    <button className={styles.submitButton} onClick={handlePost}>등록하기</button>
  </div>
  );
};

export default GuidePost;
