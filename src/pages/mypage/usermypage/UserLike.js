import React, { useEffect, useState } from 'react';
import styles from '../../../styles/usermypage/UserLike.module.css';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getLikey } from '../../../utils/postData';
import { fetchFiles } from '../../../utils/fileData';

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

  const  memberId  = localStorage.getItem('membersId');
  const [likeys, setLikeys] = useState([]);
  const [fileUrls, setFileUrls] = useState(null);
  

  // 데이터를 더 가져오는 함수
  const fetchMoreData = async () => {
    if (products.length >= 100) {
      setHasMore(false);
      return;
    }

    const productBoardIds = likeys.map((likey) => likey.productBoard.id);
    console.log('productBoardIds: ', productBoardIds);

     // 이미지 업로드
    const filesUpload = productBoardIds.map(async (productBoardId) => {
      const file = await fetchFiles(productBoardId);
      console.log('Fetched file[0]:', file[0]);
      return file[0];
    });

    const fileUrls = await Promise.all(filesUpload);
    setFileUrls(fileUrls);
    console.log('fileUrls:', fileUrls);


    const newProducts = likeys.map((likey,index) => {

       // Remove HTML tags from the content
    const plainTextContent = likey.productBoard.content.replace(/<[^>]+>/g, '');
    
    // Limit the content to 30 characters
    const truncatedContent = plainTextContent.slice(0, 500);

    setHasMore(false);
      return {
      id: likey.id,
      title: likey.productBoard.title,
      //description: likey.productBoard.content,
      image: fileUrls[index] || 'https://via.placeholder.com/150',  // 이미지 URL (placeholder 이미지)
      tags: likey.productBoard.hashtag,
      rating: (Math.random() * 5).toFixed(1), // 0부터 5까지의 무작위 평점
      reviewCount: Math.floor(Math.random() * 100), // 0부터 100까지의 무작위 리뷰 수
      isLiked: true, // 좋아요 상태를 나타내는 플래그
      timestamp: Date.now() - Math.floor(Math.random() * 10000000000), // Random timestamp within last ~4 months
      city : likey.productBoard.city,
      productId : likey.productBoard.id
    };
  });
    
    
    console.log('상품 안에 likeys: ',likeys)
    
    /* 기존 더미데이터
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
    */

    setProducts(newProducts);
  };


  useEffect(() => {
    console.log('memberId: ', memberId);
    if (inView && hasMore) {
      fetchMoreData();
    }
    // 찜목록
    const likeyList = async () => {
      const likes = await getLikey(memberId);
      console.log('likes: ',likes);
      setLikeys(likes)
    };

    likeyList();

  }, [inView, hasMore, memberId]);




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
          <div key={product.id} className={styles.productItem} 
              onClick={() => navigate(`/guidePostDetails/${product.productId}`)}
          >
            <img src={product.image} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className={styles.tags}>
                  <span className={styles.tag}>
                    {product.tags}
                  </span>
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
