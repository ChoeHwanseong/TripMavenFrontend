import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Select, MenuItem, Typography, CircularProgress, Grid } from '@mui/material';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import moment from 'moment';

// GeoJSON 파일들을 import 합니다
import seoulGeo from '../../data/Seoul.geojson';
import busanGeo from '../../data/busan.geojson';
import daeguGeo from '../../data/daegu.geojson';
import incheonGeo from '../../data/Incheon.geojson';
import gwangjuGeo from '../../data/gwangju.geojson';
import daejeonGeo from '../../data/daejeon.geojson';
import ulsanGeo from '../../data/ulsan.geojson';
import sejongGeo from '../../data/sejong.geojson';
import gyeonggiGeo from '../../data/gyeonggi.geojson';
import gangwonGeo from '../../data/Gangwon.geojson';
import chungbukGeo from '../../data/chungbuk.geojson';
import chungnamGeo from '../../data/chungnam.geojson';
import jeonbukGeo from '../../data/jeonbuk.geojson';
import jeonnamGeo from '../../data/jeonnam.geojson';
import gyeongbukGeo from '../../data/gyeongbuk.geojson';
import gyeongnamGeo from '../../data/gyeongnam.geojson';
import jejuGeo from '../../data/jeju.geojson';

const API_KEY = '48c33cc2626bc56bc2e94df1221b05b1';

const cityNameMapping = {
  '서울특별시': 'Seoul,KR',
  '부산광역시': 'Busan,KR',
  '대구광역시': 'Daegu,KR',
  '인천광역시': 'Incheon,KR',
  '광주광역시': 'Gwangju,KR',
  '대전광역시': 'Daejeon,KR',
  '울산광역시': 'Ulsan,KR',
  '세종특별자치시': 'Sejong,KR',
  '경기도': 'Suwon,KR',
  '강원도': 'Chuncheon,KR',
  '충청북도': 'Cheongju,KR',
  '충청남도': 'Hongseong,KR',
  '전라북도': 'Jeonju,KR',
  '전라남도': 'Muan,KR',
  '경상북도': 'Andong,KR',
  '경상남도': 'Changwon,KR',
  '제주특별자치도': 'Jeju City,KR'
};

// 서울 정보
const seoulDistricts = {
  '서울특별시 종로구': 'Jongno-gu,Seoul,KR',
  '서울특별시 중구': 'Jung-gu,Seoul,KR',
  '서울특별시 용산구': 'Yongsan-gu,Seoul,KR',
  '서울특별시 성동구': 'Seongdong-gu,Seoul,KR',
  '서울특별시 광진구': 'Gwangjin-gu,Seoul,KR',
  '서울특별시 동대문구': 'Dongdaemu-gu,Seoul,KR',
  '서울특별시 중랑구': 'Jungnang-gu,Seoul,KR',
  '서울특별시 성북구': 'Seongbuk-gu,Seoul,KR',
  '서울특별시 강북구': 'Gangbuk-gu,Seoul,KR',
  '서울특별시 도봉구': 'Dobong-gu,Seoul,KR',
  '서울특별시 노원구': 'Nowon-gu,Seoul,KR',
  '서울특별시 은평구': 'Eunpyeong-gu,Seoul,KR',
  '서울특별시 서대문구': 'Seodaemun-gu,Seoul,KR',
  '서울특별시 마포구': 'Mapo-gu,Seoul,KR',
  '서울특별시 양천구': 'Yangcheon-gu,Seoul,KR',
  '서울특별시 강서구': 'Gangseo-gu,Seoul,KR',
  '서울특별시 구로구': 'Guro-gu,Seoul,KR',
  '서울특별시 금천구': 'Geumcheon-gu,Seoul,KR',
  '서울특별시 영등포구': 'Yeongdeungpo-gu,Seoul,KR',
  '서울특별시 동작구': 'Dongjak-gu,Seoul,KR',
  '서울특별시 관악구': 'Gwanak-gu,Seoul,KR',
  '서울특별시 서초구': 'Seocho-gu,Seoul,KR',
  '서울특별시 강남구': 'Gangnam-gu,Seoul,KR',
  '서울특별시 송파구': 'Songpa-gu,Seoul,KR',
  '서울특별시 강동구': 'Gangdong-gu,Seoul,KR'
};

// 부산 정보
const busanDistricts = {
  '부산광역시 중구': 'Jung District,KR',
  '부산광역시 서구': 'Seo District,KR',
  '부산광역시 동구': 'Dong District,KR',
  '부산광역시 영도구': 'Yeongdo District,KR',
  '부산광역시 부산진구': 'Busanjin District,KR',
  '부산광역시 동래구': 'Dongnae District,KR',
  '부산광역시 남구': 'Nam District,KR',
  '부산광역시 북구': 'Buk District,KR',
  '부산광역시 해운대구': 'Haeundae District,KR',
  '부산광역시 사하구': 'Saha District,KR',
  '부산광역시 금정구': 'Geumjeong District,KR',
  '부산광역시 강서구': 'Gangseo District,KR',
  '부산광역시 연제구': 'Yeonje District,KR',
  '부산광역시 수영구': 'Suyeong District,KR',
  '부산광역시 사상구': 'Sasang District,KR',
  '부산광역시 기장군': 'Gijang,KR'
};

//강원 정보
const gangwonDistricts = {
  '강원특별자치도 춘천시': 'Chuncheon, KR',
  '강원특별자치도 원주시': 'Wonju, KR',
  '강원특별자치도 강릉시': 'Gangneung, KR',
  '강원특별자치도 동해시': 'Wonju, KR',
  '강원특별자치도 태백시': "T'aebaek, KR",
  '강원특별자치도 속초시': 'Sokcho, KR',
  '강원특별자치도 삼척시': 'Wonju, KR',
  '강원특별자치도 홍천군': 'Hongcheon-gun, KR',
  '강원특별자치도 횡성군': 'Hoengseong-gun, KR',
  '강원특별자치도 영월군': 'Yeongwol-gun, KR',
  '강원특별자치도 평창군': 'Pyeongchang-gun, KR',
  '강원특별자치도 정선군': 'Jeongseon-gun, KR',
  '강원특별자치도 철원군': 'Cheorwon-gun, KR',
  '강원특별자치도 화천군': 'Hwacheon-gun, KR',
  '강원특별자치도 양구군': 'Yanggu-gun, KR',
  '강원특별자치도 인제군': 'Inje-gun, KR',
  '강원특별자치도 고성군': 'Goseong-gun, KR',
  '강원특별자치도 양양군': 'Yangyang-gun, KR'
};

//인천 정보
const incheonDistricts = {
  '인천광역시 중구': 'Jung-gu, KR',
  '인천광역시 동구': 'Dong-gu, KR',
  '인천광역시 미추홀구': 'Nam-gu,KR',
  '인천광역시 연수구': 'Yeonsu-gu,KR',
  '인천광역시 남동구': 'Namdong-gu,KR',
  '인천광역시 부평구': 'Bupyeong-gu,KR',
  '인천광역시 계양구': 'Gyeyang-gu,KR',
  '인천광역시 서구': 'Seo-gu,KR',
  '인천광역시 강화군': 'Ganghwa-gun,KR',
  '인천광역시 옹진군': 'Ongjin, KP'
};

//광주 정보

//대구 정보

//대전 정보

//울산 정보

//세종 정보

//경기 정보

//강원 정보

//충북 정보

//충남 정보

//전북 정보

//전남 정보

//경북 정보

//경남 정보

//제주 정보

const regionSettings = {
  '서울특별시': { scale: 49000, center: [126.9895, 37.5651], geoData: seoulGeo },
  '부산광역시': { scale: 36000, center: [129.0756, 35.1996], geoData: busanGeo },
  '대구광역시': { scale: 34000, center: [128.6014, 35.8154], geoData: daeguGeo },
  '인천광역시': { scale: 20000, center: [126.5232, 37.4963], geoData: incheonGeo },
  '광주광역시': { scale: 55000, center: [126.8516, 35.1601], geoData: gwangjuGeo },
  '대전광역시': { scale: 45000, center: [127.3845, 36.3504], geoData: daejeonGeo },
  '울산광역시': { scale: 31000, center: [129.2514, 35.5584], geoData: ulsanGeo },
  '세종특별자치시': { scale: 40000, center: [127.2894, 36.5700], geoData: sejongGeo },
  '경기도': { scale: 10000, center: [127.0096, 37.6150], geoData: gyeonggiGeo },
  '강원도': { scale: 8000, center: [128.2000, 37.8000], geoData: gangwonGeo },
  '충청북도': { scale: 10000, center: [127.7000, 36.7000], geoData: chungbukGeo },
  '충청남도': { scale: 12000, center: [126.8000, 36.5500], geoData: chungnamGeo },
  '전라북도': { scale: 12000, center: [127.1500, 35.7200], geoData: jeonbukGeo },
  '전라남도': { scale: 7500, center: [126.7500, 34.7600], geoData: jeonnamGeo },
  '경상북도': { scale: 8000, center: [128.7000, 36.4000], geoData: gyeongbukGeo },
  '경상남도': { scale: 9000, center: [128.2500, 35.2600], geoData: gyeongnamGeo },
  '제주특별자치도': { scale: 25000, center: [126.5500, 33.4190], geoData: jejuGeo }
};

const getWeatherIcon = (iconCode) => {
  return `http://openweathermap.org/img/wn/${iconCode}.png`;
};

const DetailedWeatherMap = ({ selectedRegion: externalSelectedRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState(externalSelectedRegion || '부산광역시');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickedDistrict, setClickedDistrict] = useState(null);

  useEffect(() => {
    if (externalSelectedRegion) {
      setSelectedRegion(externalSelectedRegion);
    }
  }, [externalSelectedRegion]);

  useEffect(() => {
    if (selectedRegion) {
      const regionName = cityNameMapping[selectedRegion] || selectedRegion;
      fetchWeatherData(regionName);
    }
  }, [selectedRegion]);

  const fetchWeatherData = async (locationName) => {
    setLoading(true);
    setError(null);
    try {
      const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${API_KEY}&units=metric`);
      setCurrentWeather(currentWeatherResponse.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${API_KEY}&units=metric`);
      const formattedForecast = forecastResponse.data.list.map(item => ({
        time: moment(item.dt * 1000).format('MM-DD HH:mm'),
        temp: item.main.temp,
        description: item.weather[0].description,
        pop: item.pop * 100, // Probability of precipitation (%)
        weatherIcon: item.weather[0].icon
      }));
      setForecast(formattedForecast.slice(0, 32));
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('날씨 데이터를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (event) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    setCurrentWeather(null);
    setForecast([]);
    setClickedDistrict(null);
  };

  const handleDistrictClick = useCallback((geo) => {
    const districtName = geo.properties.SGG_NM;
    setClickedDistrict(districtName);
    if (selectedRegion === '서울특별시' && seoulDistricts[districtName]) {
      fetchWeatherData(seoulDistricts[districtName]);
    } else if (selectedRegion === '부산광역시' && busanDistricts[districtName]) {
      fetchWeatherData(busanDistricts[districtName]);
    } else if (selectedRegion === '인천광역시' && incheonDistricts[districtName]) {
      fetchWeatherData(incheonDistricts[districtName]);
    } else if (selectedRegion === '강원도' && gangwonDistricts[districtName]) {
      fetchWeatherData(gangwonDistricts[districtName]);
    }
  }, [selectedRegion]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ backgroundColor: 'white', padding: 1, border: '1px solid #ccc' }}>
          <Typography variant="body2">{`시간: ${label}`}</Typography>
          <Typography variant="body2">{`온도: ${payload[0].value}°C`}</Typography>
          <Typography variant="body2">{`강수확률: ${payload[1].value.toFixed(1)}%`}</Typography>
          <Typography variant="body2">{`날씨: ${payload[0].payload.description}`}</Typography>
          <img src={getWeatherIcon(payload[0].payload.weatherIcon)} alt="Weather icon" />
        </Box>
      );
    }
    return null;
  };

  const memoizedGeoData = useMemo(() => {
    if (selectedRegion && regionSettings[selectedRegion]) {
      return regionSettings[selectedRegion].geoData;
    }
    return null;
  }, [selectedRegion]);

  if (!memoizedGeoData) {
    return <Typography>Loading map data...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, margin: 'auto', padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Select
            value={selectedRegion}
            onChange={handleRegionChange}
            fullWidth
            size="small"
            defaultValue="부산광역시"
          >
            {Object.keys(cityNameMapping).map((region) => (
              <MenuItem key={region} value={region}>{region}</MenuItem>
            ))}
          </Select>

          {selectedRegion && regionSettings[selectedRegion] && (
            <Box sx={{ marginTop: 2, height: 300, border: '1px solid #ccc', overflow: 'hidden' }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: regionSettings[selectedRegion].scale,
                  center: regionSettings[selectedRegion].center,
                }}
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              >
                <Geographies geography={memoizedGeoData}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={clickedDistrict === geo.properties.SGG_NM ? "#afe859" : "#66ccff"}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#afe859" },
                          pressed: { outline: "none" },
                        }}
                        onClick={() => handleDistrictClick(geo)}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
            </Box>
          )}

          {clickedDistrict && (
            <Typography variant="body2" sx={{ mt: 1 }}/>
          )}

          {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
          {error && <Typography color="error" variant="body2">{error}</Typography>}

          {currentWeather && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="subtitle1">선택된 지역: {clickedDistrict || selectedRegion}</Typography>
              <Box display="flex" alignItems="center">
                <img src={getWeatherIcon(currentWeather.weather[0].icon)} alt="Weather icon" 
                style={{ width: '60px', height: '60px', backgroundColor:'lightgray'}}/>
                <Box ml={1}>
                  <Typography variant="body2">온도: {currentWeather.main.temp}°C</Typography>
                  <Typography variant="body2">날씨: {currentWeather.weather[0].description}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          {forecast.length > 0 && (
            <Box sx={{ height: 400 }}>
              <Typography variant="subtitle1" gutterBottom>4일간 기상 예보</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecast}>
                  <XAxis 
                    dataKey="time" 
                    angle={0}
                    textAnchor="end"
                    height={70}
                    interval={5}
                    // defaultProps 대신 직접 prop 설정
                    allowDataOverflow={false}
                    allowDecimals={true}
                    allowDuplicatedCategory={true}
                  />
                  <YAxis 
                    yAxisId="left"
                    // YAxis에 대한 추가 prop 설정 (필요한 경우) 콘솔에서 경고가 심해서 바꿀 예정
                    orientation="left"
                    domain={['auto', 'auto']}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
                    // YAxis에 대한 추가 prop 설정 (필요한 경우)
                    domain={[0, 100]}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#8884d8" name="온도 (°C)" />
                  <Line yAxisId="right" type="monotone" dataKey="pop" stroke="#82ca9d" name="강수확률 (%)" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedWeatherMap;
