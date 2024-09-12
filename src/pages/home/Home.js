import React, { useContext, useState } from 'react';
import { Box, Button, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegionEventInfo from './RegionEvent';
import GuideRankings from './GuideRanking';
import DetailedWeatherMap from './DetailedWeatherMap';  // 새로 추가된 import
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
    setWeatherSelectedRegion(region); // 이벤트 지역 변경 시 날씨 지도도 업데이트
  };

  return (
    <div className={styles.headerimg}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 10, p: 3 }}>
        
{/*킹*/}
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
              <Typography variant="h6" fontWeight="bold" gutterBottom/>
              <GuideRankings /> 
            </Box>
          </Grid>
        </Grid>

        {/* 상세 날씨 정보  */}
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
