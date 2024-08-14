import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import axios from 'axios';

// 대한민국 지도 데이터 URL
const geoUrl = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-geo.json';
// 한국어 지역명과 영어 지역명 매핑
const regionNameMap = {
  '서울특별시': 'Seoul,KR',
  '부산광역시': 'Busan,KR',
  '대구광역시': 'Daegu,KR',
  '인천광역시': 'Incheon,KR',
  '광주광역시': 'Gwangju,KR',
  '대전광역시': 'Daejeon,KR',
  '울산광역시': 'Ulsan,KR',
  '세종특별자치시': 'Sejong,KR',
  '경기도': 'Gyeonggi-do,KR',
  '강원도': 'Gangwon-do,KR',
  '충청북도': 'Chungcheongbuk-do,KR',
  '충청남도': 'Chungcheongnam-do,KR',
  '전라북도': 'Jeollabuk-do,KR',
  '전라남도': 'Jeollanam-do,KR',
  '경상북도': 'Gyeongsangbuk-do,KR',
  '경상남도': 'Gyeongsangnam-do,KR',
  '제주특별자치도': 'Jeju-do,KR',
};
// OpenWeatherMap API 키
const API_KEY = '48c33cc2626bc56bc2e94df1221b05b1';

const KoreaWeatherMap = () => {
  // 날씨 데이터, 선택된 지역, 로딩 상태, 에러 상태를 위한 state
  const [weatherData, setWeatherData] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // 모든 지역의 날씨 정보를 동시에 요청
        const promises = Object.entries(regionNameMap).map(([koreanName, englishName]) =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${englishName},KR&appid=${API_KEY}&units=metric`)
        );
        const responses = await Promise.all(promises);
        const newWeatherData = {};
        // 응답 데이터를 파싱하여 weatherData 객체 생성
        responses.forEach((response, index) => {
          const koreanName = Object.keys(regionNameMap)[index];
          const { name, main, weather } = response.data;
          newWeatherData[koreanName] = {
            city: koreanName,
            temperature: main.temp,
            summary: weather[0].description,
            icon: weather[0].icon
          };
        });
        console.log('Fetched weather data:', newWeatherData);
        setWeatherData(newWeatherData);
        setError(null);
      } catch (err) {
        setError('날씨 정보를 가져오는데 실패했습니다: ' + err.message);
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 지역별 날씨 정보 반환 함수
  const getRegionWeather = (geo) => {
    const mapRegionName = geo.properties.name;
    const weather = weatherData[mapRegionName];
    //console.log('Getting weather for:', mapRegionName, weather);
    return weather || { city: mapRegionName, error: '날씨 정보 없음' };
  };

  if (loading) return <div>날씨 정보를 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ width: '100%', height: '350px', display: 'flex' }}>
      <div style={{ width: '80%', height: '100%' }}> {/* 지도 영역 확대 */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 5500, // 스케일 증가 
            center: [129, 35.5] // 중심점 조정
          }}
          style={{ width: '100%', height: '100%' }} // 지도 크기를 컨테이너에 맞춤
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const weather = getRegionWeather(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={weather.error ? '#F5F4F6' : '#1E88E5'}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: '#FFA500' }, // 호버 시 색상 변경
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => {
                      setSelectedRegion(weather);
                    }}
                    onMouseLeave={() => {
                      setSelectedRegion(null);
                    }}
                  />
                );
              })
            }
          </Geographies>
          </ComposableMap>
      </div>
      <div style={{ width: '20%', padding: '5px', overflowY: 'auto' }}> {/* 날씨 정보 영역 축소 및 스크롤 가능하게 */}
        <h3 style={{ margin: '0 0 10px 0' }}>날씨</h3>
        {selectedRegion ? (
          <div>
            <h5 style={{ margin: '0 0 5px 0' }}>{selectedRegion.city}</h5>
            {selectedRegion.error ? (
              <p>{selectedRegion.error}</p>
            ) : (
              <>
                <p style={{ margin: '0 0 5px 0' }}>온도: {selectedRegion.temperature}°C</p>
                <p style={{ margin: '0 0 5px 0' }}>날씨: {selectedRegion.summary}</p>
                <img 
                  src={`http://openweathermap.org/img/wn/${selectedRegion.icon}@2x.png`} 
                  alt="weather icon"
                  style={{ width: '50px', height: '50px' }} // 아이콘 크기 조정
                />
              </>
            )}
          </div>
        ) : (
          <p>지역을 선택하세요</p>
        )}
      </div>
    </div>
  );
};

export default KoreaWeatherMap;
