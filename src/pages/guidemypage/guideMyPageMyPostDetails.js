// MyPostDetails.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/guidemypage/guideMyPageMyPostDetails.module.css';

const GuideMyPageMyPostDetails = () => {
  const navigate = useNavigate();

  const [activeDays, setActiveDays] = useState([]); //다중 스테이트 관리를 위한 배열
  const [allOpen, setAllOpen] = useState(false); // 모두 열기/닫기 상태 관리

  const toggleDay = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((activeDay) => activeDay !== day));
    } else {
      setActiveDays([...activeDays, day]);
    }
  };

  const toggleAllDays = () => {
    if (allOpen) {
      setActiveDays([]); // 모두 닫기
    } else {
      setActiveDays([1, 2, 3]); // 모두 열기(하드코딩인데 바꿔야함)
    }
    setAllOpen(!allOpen); // 상태 변경
  };

  return (
    <div className={styles.container}>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>내 게시물 상세보기 <span className={styles.editIcon}>✏️</span></h1>
        </div>

        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>작성번호</th>
              <td>7681</td>
              <th>작성일</th>
              <td>2024-03-19</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>경주</td>
              <th>찜</th>
              <td>0</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colSpan="3">[경주 2박 3일] 경주월드 #불국사 #놀이공원</td>
            </tr>
            <tr>
              <th>내용</th>
              <td colSpan="3">[경주 2박 3일] 경주월드 #불국사 #놀이공원 ...</td>
            </tr>
            <tr>
              <th>등록여부</th>
              <td>평가 대기</td>
              <th>AI 점수</th>
              <td>미등록</td>
            </tr>
          </tbody>
        </table>

        <button className={styles.aiButton}>AI 교육 들어보기</button>

        <div className={styles.imageGallery}>
          <img src="/path/to/image1.jpg" alt="이미지1" className={styles.image} />
          <img src="/path/to/image2.jpg" alt="이미지2" className={styles.image} />
          <img src="/path/to/image3.jpg" alt="이미지3" className={styles.image} />
        </div>

        <div className={styles.description}>
          <h2>[제주 가족 여행] 실속여행 제주 3일 #유도집중관광 #스카이워터쇼 #송악산 #돌레길 #카멜리아힐</h2>
          <p className={styles.tags}>#제주 #유도 #돌레길 #가족여행</p>
        </div>

        <div className={styles.reviewSection}>
          <span>125건의 리뷰</span> <span className={styles.starRating}>⭐ 4.5</span> <span className={styles.aiRating}>ai 평가 점수 ⭐ 4.7</span>
        </div>

        <div className={styles.itinerary}>
          <h2>여행 주요 일정</h2>
          <div className={styles.details}>
            <div className={styles.row}>
              <span className={styles.label}>일정</span>
              <span className={styles.value}>2박 3일</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>여행도시</span>
              <span className={styles.value}>제주</span>
            </div>
          </div>

          <div className={styles.toggleAllButtonFlex}>
            <button className={styles.toggleAllButton} onClick={toggleAllDays}>
              {allOpen ? '모두 닫기' : '모두 열기'}
            </button>
          </div>

          <div className={styles.accordion}>
            {[1, 2, 3].map((day) => (
              <div key={day} className={styles.accordionItem}>
                <div className={styles.accordionHeader} onClick={() => toggleDay(day)}>
                  <span>{day}일차</span>
                  <button className={styles.toggleButton}>
                    {activeDays.includes(day) ? '상세 닫기' : '상세 보기'}
                  </button>
                </div>
                {activeDays.includes(day) && (
                  <div className={styles.accordionContent}>
                    {/* 각 일정의 활동 내용 */}
                    <div className={styles.timeline}>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelinePoint}></div>
                        <div className={styles.timelineContent}>
                          <h4>스카이워터쇼</h4>
                          <p>문섬의 다양한 수중 액티비티와 문섬의 파노라마 전망</p>
                          <img src="/path/to/image1.jpg" alt="스카이워터쇼" />
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelinePoint}></div>
                        <div className={styles.timelineContent}>
                          <h4>고사리 흑돼지 불고기</h4>
                          <p>제주의 대표적인 흑돼지 불고기</p>
                          <img src="/path/to/image2.jpg" alt="고사리 흑돼지 불고기" />
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelinePoint}></div>
                        <div className={styles.timelineContent}>
                          <h4>쇼핑센터</h4>
                          <p>제주도의 특산품 제주특산 기념품 쇼핑 방문</p>
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelinePoint}></div>
                        <div className={styles.timelineContent}>
                          <h4>공항으로 이동</h4>
                          <p>제주시-김포공항 이동 (약 1시간 소요)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.hotelInfo}>
          <h2>호텔 정보</h2>
          <div className={styles.details}>
            <div className={styles.row}>
              <span className={styles.label}>호텔</span>
              <span className={styles.value}>제주 신라 호텔</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>주소</span>
              <span className={styles.value}>서귀포 중문관광로 72번길 75</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>연락처</span>
              <span className={styles.value}>064-735-5114</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>홈페이지</span>
              <span className={styles.value}>
                <a href="https://www.shillahotels.com" target="_blank" rel="noopener noreferrer">
                  The Shilla Hotels & Resorts
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton}>수정 하기</button>
          <button className={styles.actionButton}>삭제 하기</button>
          <button className={styles.actionButton} onClick={()=>navigate('/guidemypagemypost')}>목록</button>
        </div>
      
      </main>
    </div>  
  );
};

export default GuideMyPageMyPostDetails;