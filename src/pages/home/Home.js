import React, { useContext, useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KoreaWeatherMap from './KoreaWeather';
import RegionEventInfo from './RegionEvent';
import { RoleContext } from '../../components/context/roleContext';
import styles from '../../styles/home/Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { setSearchKeyword } = useContext(RoleContext);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleCityClick = (city) => {
    navigate(`/product?city=${city}`);
  };
  console.log(selectedRegion)

  return (
    <div className={styles.headerimg}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 10, p: 3 }}>
        {/* 검색 바 */}
        <Box sx={{
          mb: 5, p: 3, borderRadius: 3,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: '1px solid #0066ff'
        }}>
          <TextField
            placeholder="검색어를 입력하세요"
            variant="outlined"
            sx={{
              mr: 2, flex: 1,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <TextField
            placeholder="일수를 선택해주세요"
            variant="outlined"
            sx={{
              mr: 2, flex: 1,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Button
            variant="contained"
            sx={{
              py: 1.5, px: 3,
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ffffff',
              backgroundColor: '#0066ff',
              borderRadius: 2,
              '&:hover': { backgroundColor: '#0056b3' }
            }}
            onClick={() => navigate('/product')}
          >
            검색
          </Button>
        </Box>

        {/* 인기 여행지 */}
        <Box sx={{
          background: '#ffffff',
          pl: 3, pt: 3, pr: 3,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f1f1f1',
          mb: '45px', height: '353px'
        }}>
          <Box sx={{ mb: 7 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4" fontWeight="bold">인기 여행지</Typography>
              <Button
                variant="contained"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  backgroundColor: '#0066ff',
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#0056b3' }
                }}
                onClick={() => navigate('/product?keyword=')}
              >
                모두보기
              </Button>
            </Box>
            <Grid container spacing={3}>
              {['부산', '제주', '서울', '강릉', '가평'].map((city, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <Card
                    onClick={() => handleCityClick(city)}
                    sx={{
                      borderRadius: 3,

                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={`/images/mainpage/${index + 1}.png`}
                      alt={city}
                    />
                    <CardContent>
                      <Typography variant="h6" align="center" fontWeight="bold">{city}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* 정보 섹션 */}
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3, borderRadius: 3,
              background: '#f9f9f9',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f1f1f1',
              height: '100%'
            }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>기상 정보</Typography>
              <KoreaWeatherMap
                width="100%"
                height="400px"
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3, borderRadius: 3,
              background: '#f9f9f9',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f1f1f1',
              height: '100%'
            }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>지역 행사</Typography>
              <RegionEventInfo
                width="100%"
                height="400px"
                setSelectedRegion={setSelectedRegion}
                selectedRegion={selectedRegion}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
