import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'fxK0NInA37%2B5%2FUmqb3ZtIqKfeJDzlDS9iU9A25kDySbSG2wyyzESFN8pUjf1G3sBAqnKnI0ZkDOCaNC8PDJTxg%3D%3D';
const BASE_URL = 'https://apis.data.go.kr/B551011/KorService1';

// 간단한 모달 컴포넌트
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
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'auto'
      }}>
        <button onClick={onClose} style={{ float: 'right' }}>Close</button>
        {children}
      </div>
    </div>
  );
};

const RegionEventInfo = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchEvents(selectedRegion);
    }
  }, [selectedRegion]);

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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    fetchEventDetails(event.contentid);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <select 
        value={selectedRegion} 
        onChange={handleRegionChange}
        style={{ marginBottom: '20px', padding: '5px' }}
      >
        <option value="">지역을 선택하세요</option>
        {regions.map((region) => (
          <option key={region.code} value={region.code}>
            {region.name}
          </option>
        ))}
      </select>

      {loading && <p>로딩 중...</p>}

      {!loading && !error && events.length === 0 && selectedRegion && (
        <p>선택한 지역의 행사 정보가 없습니다.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {events.map((event) => (
          <div 
            key={event.contentid} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onClick={() => handleEventClick(event)}
          >
            <div style={{ 
              width: '100%', 
              height: '100px',
              overflow: 'hidden'
            }}>
              <img 
                src={event.firstimage2 || 'https://via.placeholder.com/300x150?text=No+Image'}
                alt={event.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover'
                }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x150?text=No+Image';
                }}
              />
            </div>
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{event.title}</h3>
              <p style={{ margin: '0 0 3px 0', fontSize: '14px' }}>기간: {event.eventstartdate} ~ {event.eventenddate}</p>
              <p style={{ margin: '0', fontSize: '14px' }}>장소: {event.addr1}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {eventDetails && (
          <div>
            <h2>{selectedEvent?.title}</h2>
            <img 
              src={eventDetails.firstimage || 'https://via.placeholder.com/400x300?text=No+Image'} 
              alt={eventDetails.title}
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '20px' }}
            />
            <p><strong>전화번호:</strong> {eventDetails.tel || '정보 없음'}</p>
            <p><strong>주소:</strong> {eventDetails.addr1} {eventDetails.addr2}</p>
            <p><strong>개요:</strong> {eventDetails.overview}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RegionEventInfo;