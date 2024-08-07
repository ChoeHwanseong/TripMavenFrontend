import React from 'react';
import styles from '../../styles/home/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="날짜를 선택해주세요"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>검색</button>
      </div>

      <div className={styles.popularDestinations}>
        <h2 className={styles.destinationsTitle}>인기 여행지</h2>
        <div className={styles.destinationList}>
          {['부산', '제주', '서울', '강릉', '가평'].map((city, index) => (
            <div key={index} className={styles.destinationCard}>
              <img
                src={`./path/to/image${index + 1}.jpg`} // replace with actual paths
                alt={city}
                className={styles.destinationImage}
              />
              <div className={styles.destinationName}>{city}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>날씨</h3>
          <ul className={styles.infoList}>
            {['부산', '서울', '제주', '강릉', '전주', '가평'].map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>지역 뉴스</h3>
          <ul className={styles.infoList}>
            {['부산', '서울', '제주', '강릉', '전주', '가평'].map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
