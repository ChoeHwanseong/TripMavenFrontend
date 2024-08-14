import React from 'react';
import styles from '../../styles/guidemypage/GuidePost.module.css';

const GuidePost = () => {
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

    <button className={styles.submitButton}>등록하기</button>
  </div>
  );
};

export default GuidePost;
