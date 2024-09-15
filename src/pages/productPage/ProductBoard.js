import React, { useState, useEffect, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/productPage/ProductBoard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { postsAllGet, postsCityGet, postsSearchWordGet } from '../../utils/postData';
import YouTubeSearch from './YouTubeSearch';
import { fetchFiles } from '../../utils/fileData';
import { Button, Rating } from '@mui/material';
import defaultimg from '../../images/default_profile.png';
import { TemplateContext } from '../../context/TemplateContext';

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
    const { memberInfo } = useContext(TemplateContext);

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
        else results = await postsSearchWordGet(keyword, page); // 페이지도 넘기기
        //console.log('검색 결과:', results);
        setLoading(false);

        // Fetch the first file URL for each product
        const productsWithFiles = await Promise.all(
            results.map(async (product) => {
                const fileData = await fetchFiles(product.id);
                return {
                    ...product,
                    fileUrl: fileData.length > 0 ? fileData[0] : './images/travel.jpg', // 첫 번째 파일 URL 또는 기본 이미지
                };
            })
        );

        console.log('productsWithFiles: ', productsWithFiles);
        setProducts(productsWithFiles);
        console.log('products: ', products);

        setPage((prevPage) => prevPage + 1); // 다음 페이지로 설정
        if (results.length < 20) {
            setHasMore(false);
            console.log('마지막 페이지');
        }

    };

    // 검색어가 바뀔 때마다 데이터를 초기화하고, 새로 가져옴
    useEffect(() => {
        const resetAndFetch = async () => {
            setProducts([]);
            setPage(0);
            setHasMore(true);
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
            <div className="App mb-5" >
                <YouTubeSearch keyword={keyword} city={city}/>
            </div>
            <div className='d-flex justify-content-between'>
                <h1 style={{ marginLeft: '40px' }}>{city} 상품 목록</h1>
                {!city && (keyword !== '' && <h3 style={{ marginLeft: '40px' }}>'{keyword}'에 대한 검색 결과입니다</h3>)}
                {(memberInfo.role == 'GUIDE' || memberInfo.role == 'ADMIN') &&
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#0066ff', '&:hover': { backgroundColor: '#0056b3' } }}
                        onClick={() => navigate(`/guidePost/${memberInfo.id}`)}
                    >
                        게시물 등록 하기
                    </Button>
                }
            </div>
            <div className={styles.productList}>
                {products.map((product, index) => (
                    <div
                        key={index}
                        className={styles.productItem}
                        onClick={() => {
                            console.log('넘길때 keyword:', keyword);

                            if (keyword) {
                                navigate(`/postDetails/${product.id}?keyword=${keyword}`);
                            } else if (city) {
                                navigate(`/postDetails/${product.id}?keyword=${city}`);
                            } else {
                                navigate(`/postDetails/${product.id}`);
                            }
                        }} // 상품 상세 페이지로 이동
                    >
                        <img
                            src={product.fileUrl || './images/travel.jpg'}
                            alt={product.title}
                            className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                            <h3 style={{ fontSize: '2.5rem' }}>[{product.city}][{product.day}] {product.title}</h3>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                                {/* 프로필 이미지 (디폴트 이미지 설정) */}
                                <img
                                    src={defaultimg} // 디폴트 프로필 이미지
                                    alt="profile"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginRight: '10px'
                                    }}
                                />
                                {/* 이름 */}
                                <p style={{ margin: 0 }}>{product.member.name}</p>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <Box sx={{ marginRight: '10px' }}>
                                    {product.review || '0'} 건의 리뷰
                                </Box>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={3.5}
                                    precision={0.5}
                                    readOnly
                                    sx={{ marginRight: '10px' }}
                                />
                                <Box sx={{ marginRight: '10px', ml: 3 }}>
                                    AI 점수
                                </Box>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={4.5}
                                    precision={0.5}
                                    readOnly
                                    sx={{
                                        '& .MuiRating-iconFilled': {
                                            color: 'blue',
                                        },
                                    }}
                                />
                            </Box>

                            <div className={styles.tags}>
                                {product.hashtag && product.hashtag.split('#').filter(Boolean).map((tag, index) => (
                                    <span key={index} className={styles.tag}>#{tag}</span>
                                ))}
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

            
        </div>
    );
};

export default ProductBoard;
