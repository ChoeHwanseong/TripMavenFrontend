import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import dummyImg from '../../images/dummyImg.png';

const API_KEY = 'fxK0NInA37%2B5%2FUmqb3ZtIqKfeJDzlDS9iU9A25kDySbSG2wyyzESFN8pUjf1G3sBAqnKnI0ZkDOCaNC8PDJTxg%3D%3D';
const BASE_URL = 'https://apis.data.go.kr/B551011/KorService1';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        height: '90%',
        maxHeight: '600px',
        overflow: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const extractUrl = (htmlString) => {
  const match = htmlString.match(/href="([^"]*)/);
  return match ? match[1] : null;
};

const RegionEventInfo = ({ width = "100%", height = "400px" }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [eventDetails, setEventDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchEvents(selectedRegion);
    } else {
      setEvents([]);
    }
  }, [selectedRegion]);

  const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return dateString;
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}`;
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/areaCode1`, {
        params: {
          serviceKey: decodeURIComponent(API_KEY),
          numOfRows: 20,
          pageNo: 1,
          MobileOS: 'ETC',
          MobileApp: 'TestApp',
          _type: 'json'
        },
        headers: {
          'Accept': 'application/json'
        }
      });
  
      const { response: apiResponse } = response.data;
  
      if (apiResponse && apiResponse.header.resultCode === "0000") {
        const regions = apiResponse.body.items.item;
        setRegions(regions);
      } else {
        throw new Error(apiResponse?.header?.resultMsg || '알 수 없는 API 오류');
      }
    } catch (error) {
      console.error('지역 정보 로딩 실패:', error);
      setError('지역 정보를 불러오는데 실패했습니다: ' + error.message);
    }
  };

  const fetchEvents = async (areaCode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/searchFestival1`, {
        params: {
          serviceKey: decodeURIComponent(API_KEY),
          numOfRows: 10,
          pageNo: 1,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          arrange: 'A',
          listYN: 'Y',
          areaCode: areaCode,
          eventStartDate: '20240812',
          _type: 'json'
        },
        headers: {
          'Accept': 'application/json'
        }
      });
  
      const { response: apiResponse } = response.data;
  
      if (apiResponse && apiResponse.header.resultCode === "0000") {
        const items = apiResponse.body.items.item;
        const fetchedEvents = Array.isArray(items) ? items : items ? [items] : [];
        setEvents(fetchedEvents);
        setCurrentEventIndex(0);
      } else {
        throw new Error(apiResponse?.header?.resultMsg || '알 수 없는 API 오류');
      }
    } catch (error) {
      console.error('행사 정보 로딩 실패:', error);
      setError('행사 정보를 불러오는데 실패했습니다: ' + (error.response?.data?.response?.header?.resultMsg || error.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchEventDetails = async (contentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/detailCommon1`, {
        params: {
          serviceKey: decodeURIComponent(API_KEY),
          contentId: contentId,
          MobileOS: 'ETC',
          MobileApp: 'TestApp',
          defaultYN: 'Y',
          firstImageYN: 'Y',
          areacodeYN: 'Y',
          catcodeYN: 'Y',
          addrinfoYN: 'Y',
          mapinfoYN: 'Y',
          overviewYN: 'Y',
          _type: 'json'
        },
        headers: {
          'Accept': 'application/json'
        }
      });

      const { response: apiResponse } = response.data;

      if (apiResponse && apiResponse.header.resultCode === "0000") {
        const details = apiResponse.body.items.item[0];
        setEventDetails(details);
        setIsModalOpen(true);
      } else {
        throw new Error(apiResponse?.header?.resultMsg || '알 수 없는 API 오류');
      }
    } catch (error) {
      console.error('이벤트 상세 정보 로딩 실패:', error);
      setError('이벤트 상세 정보를 불러오는데 실패했습니다: ' + error.message);
    }
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handlePrevEvent = () => {
    setDirection(-1);
    setCurrentEventIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : events.length - 1
    );
  };

  const handleNextEvent = () => {
    setDirection(1);
    setCurrentEventIndex((prevIndex) => 
      prevIndex < events.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleEventClick = () => {
    if (events[currentEventIndex]) {
      fetchEventDetails(events[currentEventIndex].contentid);
    }
  };

  return (
    <div style={{ width, height, overflow: 'hidden' }}>
      <select 
        value={selectedRegion} 
        onChange={handleRegionChange}
        style={{ marginBottom: '10px', padding: '5px', width: '100%',height:'38px' }}
      >
        <option value="">지역을 선택하세요</option>
        {regions.map((region) => (
          <option key={region.code} value={region.code}>
            {region.name}
          </option>
        ))}
      </select>
  
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 40px)' }}>
          <CircularProgress />
        </Box>
      )}
  
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && events.length > 0 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: 'calc(100% - 40px)',
          overflow: 'hidden'
        }}>
          <button onClick={handlePrevEvent} style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }}>
            <ChevronLeft size={24} />
          </button>
          <div style={{ 
            width: 'calc(100% - 60px)', 
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {events.map((event, index) => (
              <div
                key={event.contentid}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${(index - currentEventIndex) * 100}%`,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: `translateX(${direction * (index === currentEventIndex ? 0 : 100)}%)`,
                  opacity: index === currentEventIndex ? 1 : 0,
                }}
              >
                <img 
                  src={event.firstimage2 || dummyImg}
                  alt={event.title}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '60%', 
                    objectFit: 'cover',
                    marginBottom: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={handleEventClick}
                />
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{event.title}</h3>
                <p style={{ margin: '0 0 3px 0', fontSize: '14px' }}>
                  기간: {formatDate(event.eventstartdate)} ~ {formatDate(event.eventenddate)}
                </p>
                <p style={{ margin: '0', fontSize: '14px' }}>장소: {event.addr1}</p>
              </div>
            ))}
          </div>
          <button onClick={handleNextEvent} style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }}>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {!loading && !error && selectedRegion && events.length === 0 && (
        <p>선택한 지역의 행사 정보가 없습니다.</p>
      )}

      {!loading && !error && !selectedRegion && (
        <p>지역을 선택하면 행사 정보가 표시됩니다.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {eventDetails && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 style={{ marginTop: '0', marginBottom: '10px' }}>{eventDetails.title}</h2>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <img
                src={eventDetails.firstimage || dummyImg}
                alt={eventDetails.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  marginBottom: '20px'
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <p><strong>주소:</strong> {eventDetails.addr1} {eventDetails.addr2}</p>
                <p><strong>전화번호:</strong> {eventDetails.tel || '정보 없음'}</p>
                <p><strong>개요:</strong> {eventDetails.overview}</p>
                {eventDetails.homepage && (
                  <p>
                  <strong>홈페이지:</strong>{' '}
                  <a 
                    href={extractUrl(eventDetails.homepage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#0066ff" }} // 밑줄 제거 및 색상 추가
                  >
                    {extractUrl(eventDetails.homepage)}
                  </a>
                </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RegionEventInfo;
