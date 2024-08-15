import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/productPage/ProductBoard.module.css';
import { useLocation } from 'react-router-dom';

const ProductBoard = () => {
    const [products, setProducts] = useState([]); // 상품 목록을 관리하는 상태 변수
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부를 관리하는 상태 변수
    const { ref, inView } = useInView({
        threshold: 0, // 요소가 100% 보일 때 트리거
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city');

    // 데이터를 더 가져오는 함수
    const fetchMoreData = () => {
        // 만약 현재 제품 수가 100개 이상이면 더 이상 데이터를 가져오지 않음
        if (products.length >= 100) { // 100은 총 제품 수라고 가정
            setHasMore(false);
            return;
        }

        // 데이터를 가져오는 것을 시뮬레이션
        const newProducts = Array.from({ length: 20 }, (_, index) => ({
            title: `Product ${products.length + index + 1}`, // 새로운 제품 제목
            description: 'This is a description.', // 제품 설명
            image: 'https://via.placeholder.com/150', // 이미지 URL (placeholder 이미지)
            tags: ['경주', '기차', '연인', '친구', '황리단길'], // 태그(지금은 디폴트지만 내용에 맞게 가져와야 함)
            rating: (Math.random() * 5).toFixed(1), // 0부터 5까지의 무작위 평점
            reviewCount: Math.floor(Math.random() * 100) // 0부터 100까지의 무작위 리뷰 수
        }));

        // 기존 제품 목록에 새로운 제품을 추가하여 상태를 업데이트
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    };

    // 컴포넌트가 처음 렌더링될 때 fetchMoreData 함수를 호출하여 초기 데이터를 가져옵니다.
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
                <h3>'{city}'의 대한 검색 결과 입니다</h3>
            </div>
            <div className={styles.productList}>
                {/* 제품 목록을 렌더링 */}
                {products.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                        {/* 제품 이미지 */}
                        <img src={product.image} alt={product.title} />
                        <div>
                            {/* 제품 제목 */}
                            <h3>{product.title}</h3>
                            {/* 제품 설명 */}
                            <p>{product.description}</p>
                            {/* 제품 태그 */}
                            <div className={styles.tags}>
                                {product.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>
                                        #{tag}
                                    </span>
                                ))}
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
                {hasMore && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default ProductBoard;