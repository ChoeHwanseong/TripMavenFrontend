import React, { useState, useEffect, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/productPage/ProductBoard.module.css';
import { useLocation } from 'react-router-dom';
import { productFetchTitleAndContent } from '../../utils/productData';
import { RoleContext } from '../../components/context/roleContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProductBoard = () => {
    const location = useLocation();
    //검색어를 context로 관리함. template.js에 있음
    const {searchKeyword, setSearchKeyword} = useContext(RoleContext);

    const [products, setProducts] = useState([]); // 상품 목록 스테이트
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부를 관리하는 상태 변수
    const { ref, inView } = useInView({
        threshold: 0, // 요소가 100% 보일 때 트리거
    });

    // 데이터를 더 가져오는 함수
    const fetchMoreData = async () => {
        // 만약 현재 제품 수가 100개 이상이면 더 이상 데이터를 가져오지 않음
        if (products.length >= 100) { // 100은 총 제품 수라고 가정
            setHasMore(false);
            return;
        }

        //필요항목
        // tags         //태그(product엔터티에 추가해야함)(#으로구분해서 적는걸로, 나중에 #으로 스플릿)
        // rating       //점수(리뷰점수인가여? ai점수인가여?)
        // reviewCount  //리뷰 수(고객 리뷰에서 카운트해야함)
        // image        //대표 이미지 URL (placeholder 이미지)(없으면 기본 이미지)

        const results = await productFetchTitleAndContent(searchKeyword);
        console.log('검색 결과:', results);

        // 기존 제품 목록에 새로운 제품을 추가하여 상태를 업데이트
        setProducts((prevProducts) => [...prevProducts, ...results]);
    };

    // 컴포넌트가 처음 렌더링될 때 fetchMoreData 함수를 호출하여 초기 데이터 가져오기
    useEffect(() => {
        fetchMoreData();
    }, []);

    // inView 상태가 변경될 때마다 데이터를 더 가져옵니다.
    useEffect(() => {
        if (inView && hasMore) {
            fetchMoreData();
        }
    }, [inView, hasMore]);

    return (
        <div className={styles.container}>
            <div>
                <h1>상품 게시판</h1>
                <h3>'{searchKeyword}'의 대한 검색 결과 입니다</h3>
            </div>
            
            <div className={styles.productList}>
                {/* 제품 목록을 렌더링 */}
                {products && products.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                        {/* 제품 이미지 */}
                        <img src={product.image} alt={product.title} />
                        <div>
                            {/* 제품 제목 */}
                            <h3>{product.title}</h3>
                            {/* 제품 설명 */}
                            <p>{product.content}</p>
                            {/* 제품 태그 */}
                            <div className={styles.tags}>

                                {/*product.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>
                                        #{tag}
                                    </span>
                                ))*/}
                            </div>
                            {/* 제품 평점 및 리뷰 수 */}
                            <div className={styles.rating}>
                                <span>⭐ {product.rating}</span>
                                <span>{product.reviewCount}건의 리뷰</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={ref} className={styles.loadingIndicator}>
                {hasMore && 
                <Box>
                    <CircularProgress />
                </Box>}
            </div>
        </div>
    );
};

export default ProductBoard;