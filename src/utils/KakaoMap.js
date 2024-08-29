import React, { useEffect } from 'react';

const KakaoMap = ({ address, latitude = 37.5665, longitude = 126.9780, mapContainerId = 'map', level = 3 }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        const initializeMap = (lat, lng) => {
          const container = document.getElementById(mapContainerId);
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: level,
          };
          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        };

        if (address) {
          // Address to coordinates
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              initializeMap(result[0].y, result[0].x);
            } else {
              initializeMap(latitude, longitude); // Default to provided coordinates
            }
          });
        } else {
          initializeMap(latitude, longitude); // Default to provided coordinates
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [address, latitude, longitude, mapContainerId, level]);

  return <div id={mapContainerId} style={{ width: '100%', height: '400px' }}></div>;
};

export default KakaoMap;
