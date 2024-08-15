import React, { useContext } from 'react';
import styles from '../../styles/home/Home.module.css';
import { useNavigate } from 'react-router-dom';
import KoreaWeatherMap from './KoreaWeather'; // KoreaWeather import
import RegionEventInfo from './RegionEvent';
import { RoleContext } from '../../components/context/roleContext';

const Home = () => {
  const navigate = useNavigate();
  const {setSearchKeyword} = useContext(RoleContext);

  const handleCityClick = (city) => {
    //setSearchKeyword(city);
    navigate(`/product?city=${city}`);
  };

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
          placeholder="일수를 선택해주세요"
          className={styles.searchInput}
        />
        <button className={styles.searchButton} onClick={()=>navigate('/product')}>검색</button>
      </div>

      <div className={styles.popularDestinations}>
        <div className={styles.destinationsTitleViewAllButton}>
          <h2 className={styles.destinationsTitle}>인기 여행지</h2>
          <div className={styles.buttonStyle}>
            <button className={styles.viewAllButton} onClick={() => navigate('/product?keyword=')}>모두보기</button>
          </div>
        </div>
        <div className={styles.destinationList}>
          {['부산', '제주', '서울', '강릉', '가평'].map((city, index) => (
            <div key={index} className={styles.destinationCard} onClick={()=>handleCityClick(city)}>
              <img
                src={`/images/mainpage/${index + 1}.png`} // 시발 한글 못읽어
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
          <h3 className={styles.infoTitle}>기상정보</h3>
          <KoreaWeatherMap width="100%" height="400px" />
        </div>
        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>지역 행사</h3>
          <RegionEventInfo width="100%" height="400px" />
        </div>
      </div>
    </div>
  );
};

export default Home;
