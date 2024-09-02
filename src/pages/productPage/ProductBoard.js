import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/productPage/ProductBoard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { postsAllGet, postsCityGet, postsKeywordGet } from '../../utils/postData';
import YouTubeSearch from '../guidemypage/YouTubeSearch';
import { fetchFiles } from '../../utils/fileData';

const ProductBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword');
    const city = params.get('city');
    const [products, setProducts] = useState([]); // 상품 목록 스테이트
    const [page, setPage] = useState(0); // 페이지(20개씩임)
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
    const [loading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState(''); // 첫 번째 파일 URL 저장
    const { ref, inView } = useInView({
        threshold: 0, // 요소가 100% 보일 때 트리거
    });

    // 데이터를 더 가져오는 함수
    const fetchMoreData = async () => {
        if (!hasMore || loading) return; // 이미 초기화된 상태에서만 데이터 불러오기
        setLoading(true);
        let results;
        if (city) results = await postsCityGet(city, page); // 페이지도 넘기기
        else if (keyword === '') results = await postsAllGet(page); // 페이지도 넘기기(keyword 없을 땐 전체 검색)
        else results = await postsKeywordGet(keyword, page); // 페이지도 넘기기
        console.log('검색 결과:', results);
        setLoading(false);
        setProducts((prevProducts) => [...prevProducts, ...results]);
        setPage(prevPage => prevPage + 1); // 다음 페이지로 설정
        if (results.length < 20) {
            setHasMore(false);
            console.log('마지막 페이지');
        }

        // 첫 번째 상품의 파일 URL만 가져오기
        if (results.length > 0) {
            const productId = results[0].id;
            const fileData = await fetchFiles(productId);
            if (fileData.length > 0) {
                setFileUrl(fileData[0]); // 첫 번째 파일 URL만 저장
            }
        }
    };

    // 검색어가 바뀔 때마다 데이터를 초기화하고, 새로 가져옴
    useEffect(() => {
        const resetAndFetch = async () => {
            setProducts([]);
            setPage(0);
            setHasMore(true);
            setFileUrl(''); // URL 초기화
            await fetchMoreData();
        };

        resetAndFetch();

    }, [location.search]);

    // inView 상태가 변경될 때마다 데이터를 더 가져옴
    useEffect(() => {
        if (inView && hasMore) {
            fetchMoreData();
        }
    }, [inView, hasMore]);

    return (
        <div className={styles.container}>
            <div>
                <h1 style={{ marginLeft: '40px' }}>{city} 상품 목록</h1>
                {!city && (keyword !== '' && <h3 style={{ marginLeft: '40px' }}>'{keyword}'에 대한 검색 결과입니다</h3>)}
            </div>
            <div className={styles.productList}>
                {products.map((product, index) => (
                    <div
                        key={index}
                        className={styles.productItem}
                        onClick={() => {
                            console.log('넘길때 keyword:', keyword);

                        if (keyword) {
                            navigate(`/postDetails/${product.id}/${keyword}`);
                          } else if (city) {
                            navigate(`/postDetails/${product.id}/${city}`);
                        }
                        }}// 상품 상세 페이지로 이동
   
                    >
                        {/* 상품 이미지 */}
                        <img
                            src={fileUrl || './images/travel.jpg'}
                            alt={product.title}
                            className={styles.productImage} // 고정된 크기를 위한 클래스 추가
                        />
                        <div>
                            <h3>{product.title}</h3>
                            <p>{product.content}</p>
                            <div className={styles.tags}>
                                {/* 상품 태그(#으로 스플릿해서 리스트로 넣어주기) */}
                                {product.tags && product.tags.split('#').map((tag, index) => (
                                    <span key={index} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                            <div className={styles.rating}>
                                {/* 상품 평점 및 리뷰 수 */}
                                <span>별 {product.rating}</span>
                                <span>{product.review || '0'}건의 리뷰</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={ref} className={styles.loadingIndicator}>
                {loading && (
                    <Box>
                        <CircularProgress />
                    </Box>
                )}
                {products.length === 0 &&
                    <h3>검색 결과가 없습니다</h3>}
            </div>

            <div className="App">
                <h1 className={styles.youtubeHeading}>YouTube Video Search</h1>
                <YouTubeSearch keyword={keyword} city={city}/>
            </div>
        </div>
    );
};

export default ProductBoard;
