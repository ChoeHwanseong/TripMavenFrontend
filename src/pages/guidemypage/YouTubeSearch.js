import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/productPage/YouTubeSearch.module.css'; // 스타일링을 위해 CSS 모듈 사용

const YouTubeSearch = ({ keyword , city }) => {
    const [videos, setVideos] = useState([]);
    const keywordTravel= keyword+'여행';
    
    
    console.log('keyword: ',keyword);
    console.log('keywordTravel: ',keywordTravel);

     //const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; 
     //const YOUTUBE_API_KEY = 'AIzaSyCZayRJHfttrAoayZKY-owo_6TslcaEduM'; //1일 할당량 만료 (규림)
    const YOUTUBE_API_KEY = 'AIzaSyCZPSPkT5rNtWvV6lkmREOGemJkoieQAJk'; // 시은
    

    const searchYouTube = async (searchTerm) => {
        if (!searchTerm) return;
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: searchTerm,
                    type: 'video',
                    maxResults: 5,
                    key: YOUTUBE_API_KEY,
                },
            });
            setVideos(response.data.items);
        } catch (error) {
            console.error('Error fetching YouTube data', error);
        }
    };

    useEffect(() => {
        searchYouTube(keywordTravel);
    }, [keywordTravel]);

    return (
        <div className={styles.container}>
            <h2>
                '<span className={styles.keyword}>{keyword}</span>' 관련 추천 영상
            </h2>
            <div className={styles.videoGrid}>
                {videos.map((video) => (
                    <div key={video.id.videoId} className={styles.videoItem}>
                        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                            <h3>{video.snippet.title.length > 10 ? video.snippet.title.slice(0, 10) + '...' : video.snippet.title}</h3>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YouTubeSearch;
