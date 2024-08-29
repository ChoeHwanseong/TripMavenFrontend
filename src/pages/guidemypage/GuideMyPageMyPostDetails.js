import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/guidemypage/GuideMyPageMyPostDetails.module.css';
import { postDelete } from '../../utils/postData';
import { fetchFiles } from '../../utils/fileData';

const GuideMyPageMyPostDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [activeDays, setActiveDays] = useState([1, 2, 3]);
  const [allOpen, setAllOpen] = useState(false);
  const [fileUrls, setFileUrls] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getFiles = async () => {
      try {
        const fileUrl = await fetchFiles(state.id);
        setFileUrls([fileUrl]); // 받아온 파일 URL을 배열로 저장
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
  
    getFiles();
  }, [state.id]);

  const toggleDay = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((activeDay) => activeDay !== day));
    } else {
      setActiveDays([...activeDays, day]);
    }
  };

  const toggleAllDays = () => {
    if (allOpen) {
      setActiveDays([]);
    } else {
      setActiveDays([1, 2, 3]);
    }
    setAllOpen(!allOpen);
  };

  const deletePost = async () => {
    const confirmed = window.confirm("진짜 삭제?");
    if (confirmed) {
      try {
        await postDelete(state.id);
        navigate('/guidemypost');
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>내 게시물 상세보기<img src="../../images/pen.svg" className={styles.editIcon} /></h1>
        </div>

        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>작성번호</th>
              <td>{state.id}</td>
              <th>작성일</th>
              <td>{state.createdAt.split('T')[0]}</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>{state.city}</td>
              <th>찜</th>
              <td>{state.likey === 'null' ? state.likey : 0}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colSpan="3">{state.title}</td>
            </tr>
            <tr>
              <th>등록 여부</th>
              <td>{state.isActive === 1 ? '게시글 등록' : state.isActive === 2 ? '미등록' : '널~'}</td>
              <th>AI 점수</th>
              <td>{state.productEvaluation ? '점수가서와서 뿌려라!' : '널~'}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.buttonControl}>
          <button className={styles.aiButton} onClick={()=>{navigate(`/postHeader/${state.id}`)}}>AI 교육 들어보기</button>
        </div>
      
        <div className={styles.imageGallery}>
          {fileUrls.length > 0 ? (
            fileUrls.map((fileUrl, index) => (
              <img
                key={index}
                src={fileUrl} // Blob URL을 이미지 src로 사용
                alt={`업로드된 파일 ${index + 1}`}
                className={styles.image}
              />
            ))
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>

        <div className={styles.description}>
          <h2>{state.title}</h2>
          <p className={styles.tags}>{state.hashtag}</p>
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
              <span className={styles.value}>{state.city}</span>
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
                    <div className={styles.timeline}>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelinePoint}></div>
                        <div className={styles.timelineContent}>
                          <h4>스카이워터쇼</h4>
                          <p>문섬의 다양한 수중 액티비티와 문섬의 파노라마 전망</p>
                          <img src="../images/skywatershow.png" alt="스카이워터쇼" />
                        </div>
                      </div>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelinePoint}></div>
                        <div className={styles.timelineContent}>
                          <h4>고사리 흑돼지 불고기</h4>
                          <p>제주의 대표적인 흑돼지 불고기</p>
                          <img src="../images/gosariblackpig.png" alt="고사리 흑돼지 불고기" />
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
              <span className={styles.value}>{state.hotel}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>주소</span>
              <span className={styles.value}>{state.hotelAd}</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={() => { navigate(`/guideUpdatePost/${state.id}`) }}>수정 하기</button>
          <button className={styles.actionButton} onClick={deletePost}>삭제 하기</button>
          <button className={styles.actionButton} onClick={() => navigate('/guidemypost')}>목록</button>
        </div>
      </main>
    </div>
  );
};

export default GuideMyPageMyPostDetails;
