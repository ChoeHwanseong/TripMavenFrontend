import React, { useContext, useState } from 'react';
import { Box, Button, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegionEventInfo from './RegionEvent';
import GuideRankings from './GuideRanking';
import DetailedWeatherMap from './DetailedWeatherMap';
import styles from '../../styles/home/Home.module.css';
import { useFormik } from 'formik';

const Home = () => {
  const navigate = useNavigate();
  const [weatherSelectedRegion, setWeatherSelectedRegion] = useState(null);
  const [eventSelectedRegion, setEventSelectedRegion] = useState(null);

  const handleCityClick = (city) => {
    navigate(`/product?city=${city}`);
  };

  const formik = useFormik({ 
    initialValues: {
      keyword: '',
      days: '', 
    },
    onSubmit: (values) => {
      navigate(`/product?keyword=${values.keyword}&days=${values.days}`);
    },
  });

  const handleEventRegionChange = (region) => {
    setEventSelectedRegion(region);
    setWeatherSelectedRegion(region);
  };

  const handleAIServiceClick = () => {
    navigate('/aiservice');
  };

  return (
    <div className={styles.headerimg}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 10, p: 3 }}>
        
        {/* 인기 여행지 */}
        <div>
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
        </div>

        {/* AI 소개 섹션 */}
        <Box sx={{
          background: '#ffffff',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f1f1f1',
          mb: '45px'
        }}>
          <Typography variant="h4" fontWeight="bold" mb={3}/>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image="/images/aiRobot.png"
                  alt="AI Travel Planner"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                AI가 당신의 완벽한 가이드를 서포트합니다!
              </Typography>
              <Typography variant="body1" paragraph>
                우리의 AI 서비스는 당신의 가이드 능력에 맞는 최적의 서비스르 제공합니다. 
                재밌는 퀴즈, 실전 테스트까지 - AI와 함께 특별한 경험을 체험하세요.
              </Typography>
              <Button
                variant="contained"
                onClick={handleAIServiceClick}
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  backgroundColor: '#0066ff',
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#0056b3' }
                }}
              >
                AI 서비스 체험하기
              </Button>
            </Grid>
          </Grid>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">지역 행사</Typography>
                {eventSelectedRegion && (
                  <Button
                    variant="contained"
                    onClick={() => handleCityClick(eventSelectedRegion.name)}
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      backgroundColor: '#0066ff',
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#0056b3' }
                    }}
                  >
                    {`${eventSelectedRegion.name} - 추천 상품`}
                  </Button>
                )}
              </Box>
              <RegionEventInfo
                width="100%"
                height="400px"
                selectedRegion={eventSelectedRegion}
                setSelectedRegion={handleEventRegionChange}
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
              <Typography variant="h6" fontWeight="bold" gutterBottom>가이드 순위</Typography>
              <GuideRankings /> 
            </Box>
          </Grid>
        </Grid>

        {/* 상세 날씨 정보 */}
        <Box sx={{
          background: '#ffffff',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f1f1f1',
          mb: '45px',
          mt: '40px'
        }}>
          <Typography variant="h4" fontWeight="bold" mb={3}>기상 정보</Typography>
          <DetailedWeatherMap />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
