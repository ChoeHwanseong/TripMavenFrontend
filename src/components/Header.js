import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { productFetchTitleAndContent } from '../utils/productData';
import { menuData } from '../config/MyPageEndPoint';
import { RoleContext } from './context/roleContext';


const Header = () => {
    const navigate = useNavigate();

    // 입력한 검색어 관리
    const {role, setRole,searchKeyword, setSearchKeyword} = useContext(RoleContext);

    // 검색어에 따라 searchPost 상태 업데이트
    const handleInputPost = (event) => {
        setSearchKeyword(event.target.value);
    };

    // enter를 이용한 검색
    const handleEnterPress = (event) => {
        //console.log(event.key); //디버그용
        if (event.key === 'Enter') {
        performSearch();
        
        }
    }
    // 검색
    const performSearch = async () => {
        console.log('검색 실행:', searchKeyword);
        try {
            //const results = await productFetchTitleAndContent(searchPost);
            //console.log('검색 결과:', results);
            navigate('/product'); 
        } catch (error) {
            console.error('검색 중 에러 발생:', error);
        }
    };
    
    //role에 따라서 마이페이지에 있는 메뉴 변경하기
    //로그인한 사용자 role 가져오기
    let menuList = menuData[role]
    //console.log(role); //디버그용
    //console.log(menuList); //디버그용

    return (
        <header className={styles.header}>
            <div className={styles.headerFrame}>
                <button className={styles.logoButton} onClick={() => navigate('/home')}>TripMaven</button>
                <button className={styles.navbutton2} onClick={()=>{setRole('user')}}>고객</button>
                <button className={styles.navbutton2} onClick={()=>{setRole('guide')}}>가이드</button>
                <button className={styles.navbutton2} onClick={()=>{setRole('admin')}}>관리자</button>
                <div className={styles.nav}>
                    
                    <div className={styles.inputstyle}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="검색어를 입력하세요"
                            onChange={handleInputPost}
                            onKeyDown={handleEnterPress}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} onClick={()=>performSearch()}/>
                    </div>
                    <div className={styles.navFrame}>
                        <div className={styles.navItems}>
                            <button className={styles.navButton} onClick={() => navigate('/home')}>Home</button>
                            <button className={styles.navButton} onClick={() => navigate('/aiservice')}>AI 서비스</button>
                            <div className={styles.dropdown}>
                                <button className={styles.dropdownButton}>
                                    마이 페이지
                                    <svg
                                        className={styles.dropdownIcon}
                                        width="9"
                                        height="6"
                                        viewBox="0 0 9 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.98622 5.30911C4.85946 5.43134 4.68755 5.5 4.50831 5.5C4.32906 5.5 4.15715 5.43134 4.03039 5.30911L0.206369 1.62092C0.141806 1.56078 0.0903082 1.48884 0.0548807 1.4093C0.0194533 1.32975 0.00080548 1.2442 2.55226e-05 1.15763C-0.000754434 1.07107 0.0163492 0.985216 0.0503381 0.905091C0.084327 0.824966 0.134521 0.752172 0.19799 0.690957C0.26146 0.629742 0.336934 0.581331 0.42001 0.54855C0.503085 0.515768 0.592098 0.499272 0.681854 0.500025C0.77161 0.500777 0.860312 0.518762 0.942784 0.552931C1.02526 0.5871 1.09985 0.636769 1.1622 0.699038L4.50831 3.92629L7.85441 0.699038C7.9819 0.580277 8.15265 0.514562 8.32989 0.516048C8.50713 0.517533 8.67668 0.5861 8.80201 0.70698C8.92734 0.827861 8.99843 0.991383 8.99997 1.16233C9.00151 1.33327 8.93338 1.49796 8.81024 1.62092L4.98622 5.30911Z"
                                            fill="#1E1E1E"
                                        />
                                    </svg>
                                </button>
                                <div className={styles.dropdownContent}>
                                    {/* 마이페이지 메뉴 넣기 */}
                                    {menuList && menuList.map((item, index) => {
                                        //console.log(item); //디버그용
                                        //console.log(item.name); //디버그용
                                        if(item.name){
                                            return <a key={index}><button className={styles.navButton1} onClick={()=>navigate(item.path)}>{item.name}</button></a>
                                        }
                                    })}
                                </div>
                            </div>
                            <button className={styles.navButton} onClick={() => navigate('/registerguide')}>가이드 등록</button>
                        </div>
                        <button className={styles.loginButton} onClick={() => navigate('/login')}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default Header;