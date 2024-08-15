import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/guidemypage/GuidePost.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import {  productFetchData, updatePost } from '../../utils/productData';

const GuideUpdatePost = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState({});
  const navigate = useNavigate();

  
  const titleRef = useRef(null);
  const hashtagRef = useRef(null);
  const filesgRef = useRef(null);
  const dayRef = useRef(null);
  const cityRef = useRef(null);
  const hotelRef = useRef(null);
  const hotelAdRef = useRef(null);
  const contentRef = useRef(null);

  // 게시글 기존 데이터 뿌려주기
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await productFetchData(id);
        console.log('fetchedData',fetchedData)
        setPosts(fetchedData || {});
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getData();
  }, [id]);

  // 수정된 값 저장
  const newTitle = async () =>{
    setPosts({...posts,title:titleRef.current.value})
  };
  const newHashtag = async () =>{
    setPosts({...posts,hashtag:hashtagRef.current.value})
  };
  const newFiles = async () =>{
    const filename = filesgRef.current.files[0];
    setPosts({...posts,files:filename})
  };
  const newDay = async () =>{
    setPosts({...posts,day:dayRef.current.value})
  };
  const newCity = async () =>{
    setPosts({...posts,city:cityRef.current.value})
  };
  const newHotel = async () =>{
    setPosts({...posts,hotel:hotelRef.current.value})
  };
  const newHotelAd = async () =>{
    setPosts({...posts,hotelAd:hotelAdRef.current.value})
  };
  const newContent = async () =>{
    setPosts({...posts,content:contentRef.current.value})
  };





  // 게시글 수정
  const handlePost = async() => {
    try {
        const updateData = { title: titleRef.current.value,
                            hashtag : hashtagRef.current.value,
                            files : posts.files,
                            day : dayRef.current.value,
                            city  : cityRef.current.value,
                            hotel : hotelRef.current.value,
                            hotelAd : hotelAdRef.current.value,
                            content: contentRef.current.value,
                            members_id: id
                          };
        console.log('updateData: ',updateData)
        await updatePost(updateData);
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
        <input type="text" placeholder="제목을 입력하세요" ref={titleRef} onChange={newTitle} value={posts.title}/>
      </div>
      <div className={styles.field}>
        <label>해시태그</label>
        <input type="text" placeholder="해시태그를 입력하세요" ref={hashtagRef} onChange={newHashtag} value={posts.hashtag}/>
      </div>
      <div className={styles.field}>
        <label>대표 이미지</label>
        <input type="file" ref={filesgRef} onChange={newFiles}/>

      </div>
    </section>

    {/* 여행 주요일정 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>여행 주요일정</h3>
      <div className={styles.field}>
        <label>일정(기간)</label>
        <input type="text" placeholder="일정을 입력하세요" ref={dayRef} onChange={newDay} value={posts.day}/>
      </div>
      <div className={styles.field}>
        <label>여행도시</label>
        <input type="text" placeholder="여행 도시를 입력하세요" ref={cityRef} onChange={newCity} value={posts.city}/>
      </div>
    </section>

    {/* 테마 소개 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>테마 소개</h3>
      {[1, 2, 3].map((day) => (
        <div className={styles.field} key={day}>
          <label>{day}일차</label>
          <textarea placeholder={`${day}일차 일정을 입력하세요`} ref={contentRef} onChange={newContent} value={posts.content}/>
        </div>
      ))}
    </section>

    {/* 호텔 정보 섹션 */}
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>호텔 정보</h3>
      <div className={styles.field}>
        <label>호텔</label>
        <input type="text" placeholder="호텔 이름을 입력하세요" ref={hotelRef} onChange={newHotel} value={posts.hotel}/>
      </div>
      <div className={styles.field}>
        <label>주소</label>
        <input type="text" placeholder="호텔 주소를 입력하세요" ref={hotelAdRef} onChange={newHotelAd} value={posts.hotelAd}/>
      </div>
    </section>

    <button className={styles.submitButton} onClick={handlePost}>수정하기</button>
  </div>
  );
};

export default GuideUpdatePost;
