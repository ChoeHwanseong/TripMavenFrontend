import React, { useState, useEffect, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/productPage/ProductBoard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { postsAllGet, postsCityGet, postsKeywordGet } from '../../utils/postData';

const ProductBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //검색어 받기
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword');
    const city = params.get('city');

    const [products, setProducts] = useState([]); //상품 목록 스테이트
    const [page, setPage] = useState(0); //페이지(20개씩임)
    const [hasMore, setHasMore] = useState(true); //더 불러올 데이터가 있는지 여부 
    const [loading, setLoading] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0, // 요소가 100% 보일 때 트리거
    });

    //나중에 sort 방식 설정하는 드롭메뉴 만들어서 해도 ㄱㅊ을듯
    //스프링 부트에서 처리

    // 데이터를 더 가져오는 함수
    const fetchMoreData = async () => {
        //필요항목
        // tags         //태그(product엔터티에 추가해야함)(#으로구분해서 적는걸로, 나중에 #으로 스플릿)
        // rating       //점수(리뷰점수인가여? ai점수인가여?)
        // reviewCount  //리뷰 수(고객 리뷰에서 카운트해야함)
        // image        //대표 이미지 URL (placeholder 이미지)(없으면 기본 이미지)

        if (!hasMore || loading) return; //이미 초기화된 상태에서만 데이터 불러오기

        setLoading(true);
        let results;
        if (city) results = await postsCityGet(city, page); //페이지도 넘기기
        else if (keyword === '') results = await postsAllGet(page); //페이지도 넘기기(keyword 없을땐 전체 검색)
        else results = await postsKeywordGet(keyword, page); //페이지도 넘기기
        console.log('검색 결과:', results);
        setLoading(false);
        setProducts((prevProducts) => [...prevProducts, ...results]);
        setPage(prevPage => prevPage + 1); // 다음 페이지로 설정

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
            <div>
                <h1 style={{marginLeft:'40px'}}>{city} 상품 목록</h1>
                {!city && (keyword !== '' && <h3 style={{marginLeft:'40px'}}>'{keyword}'에 대한 검색 결과입니다</h3>)}
                
            </div>

            <div className={styles.productList} >
                {products.map((product, index) => (
                    <div key={index} className={styles.productItem} onClick={()=>navigate(`/product?keyword=${keyword}`)}>
                        {/* 상품 이미지 */}
                        <img src={product.image || './images/travel.jpg'} alt={product.title} />
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
                                <span>⭐ {product.rating}</span>
                                <span>{product.reviewCount || '0'}건의 리뷰</span>
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
