import React, { useEffect, useState } from 'react';
import styles from '../../styles/usermypage/UserLike.module.css';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const UserLike = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);// 상품 목록을 관리하는 상태 변수
  const [displayedProducts, setDisplayedProducts] = useState([]);// 더 불러올 데이터가 있는지 여부를 관리하는 상태 변수
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const { ref, inView } = useInView({
    threshold: 0, // 요소가 100% 보일 때 트리거
  });

  // 데이터를 더 가져오는 함수
  const fetchMoreData = () => {
    if (products.length >= 100) {
      setHasMore(false);
      return;
    }

    const newProducts = Array.from({ length: 20 }, (_, index) => ({
      id: products.length + index + 1, 
      title: `Product ${products.length + index + 1}`, // 새로운 제품 제목
      description: 'This is a description.', // 제품 설명
      image: 'https://via.placeholder.com/150', // 이미지 URL (placeholder 이미지)
      tags: ['경주', '기차', '연인', '친구', '황리단길'], // 태그(지금은 디폴트지만 내용에 맞게 가져와야 함)
      rating: (Math.random() * 5).toFixed(1), // 0부터 5까지의 무작위 평점
      reviewCount: Math.floor(Math.random() * 100), // 0부터 100까지의 무작위 리뷰 수
      isLiked: true, // 좋아요 상태를 나타내는 플래그
      timestamp: Date.now() - Math.floor(Math.random() * 10000000000), // Random timestamp within last ~4 months
    }));

    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreData();
    }
  }, [inView, hasMore]);

  useEffect(() => {
    let sortedProducts = [...products];
    
    // Apply sorting
    if (sortOption === 'oldest') {
      sortedProducts.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortOption === 'latest') {
      sortedProducts.sort((a, b) => b.timestamp - a.timestamp);
    }
    
    // Apply search filter
    if (searchTerm) {
      sortedProducts = sortedProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setDisplayedProducts(sortedProducts);
  }, [products, sortOption, searchTerm]);

  const handleLikeToggle = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isLiked: !product.isLiked } : product
      )
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>찜 목록</h1>
        <img className={styles.likeicon} src="../../../images/likeicon.png" alt="Like Icon" />
      </div>
      <div className={styles.controls}>
        <select className={styles.sortSelect} value={sortOption} onChange={handleSortChange}>
          <option value="latest">최근 순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="상품명 또는 태그로 검색"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.productList}>
        {displayedProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.image} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className={styles.tags}>
                {product.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
              <div className={styles.rating}>
                <span>⭐ {product.rating}</span>
                <span>{product.reviewCount}건의 리뷰</span>
              </div>
            </div>
            <img
              className={`${styles.likeicon1} ${styles.likeicon}`}
              src={product.isLiked ? "../../../images/likeicon.png" : "../../../images/emptylikeicon.png"}
              alt="Toggle Like"
              onClick={() => handleLikeToggle(product.id)}
            />
          </div>
        ))}
      </div>
      <div ref={ref} className={styles.loadingIndicator}>
        {hasMore && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default UserLike;
