import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { menuData } from '../config/MyPageEndPoint';
import { RoleContext } from './context/roleContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GuideRegistration from '../pages/registerguidepage/RegisterGuide';
import { ButtonGroup } from '@mui/material';
import { Button } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid primary',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
};

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname);

    //product 페이지 벗어나면 검색어 없애는 함수
    const handleSearchKeyword = () => {
        if(!location.pathname.includes('/product')){
            setSearchKeyword('');
        }
    };

    //엔드포인트 변할때마다 검색어 없애는 함수 호출
    useEffect(()=>{
        handleSearchKeyword();
    },[location.pathname])

    //검색어 스테이트
    const [searchKeyword, setSearchKeyword] = useState('');

    //로그인한 사용자 role 가져오기(로그인 구현하면 변경할 예정)
    const { role, setRole } = useContext(RoleContext);
    //role에 따라서 마이페이지에 있는 메뉴 변경하기
    let menuList = menuData[role]

    // Modal 상태 관리
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 검색어에 따라 searchPost 상태 업데이트
    const handleChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    // 엔터키로 이동
    const handleEnterPress = (event) => {
        if (event.key === 'Enter') handleNavigatePage();
    }
    //검색 이동
    const handleNavigatePage = () => {
        console.log('검색 실행:', searchKeyword);
        navigate(`/product?keyword=${searchKeyword}`);
    }

    //console.log(role); //디버그용
    //console.log(menuList); //디버그용

    return (
        <header className={styles.header}>
            <div className={styles.headerFrame}>

                <button className={styles.logoButton} onClick={() => { navigate('/home'); }}>TripMaven</button>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={() => { setRole('user') }}>고객</Button>
                    <Button onClick={() => { setRole('guide') }}>가이드</Button>
                    <Button onClick={() => { setRole('admin') }}>관리자</Button>
                </ButtonGroup>

                <div className={styles.nav}>
                    <div className={styles.inputstyle}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="검색어를 입력하세요"
                            value={searchKeyword}
                            onChange={handleChange}
                            onKeyDown={handleEnterPress}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} onClick={handleNavigatePage} />
                    </div>
                    <div className={styles.navFrame}>
                        <div className={styles.navItems}>
                            <button className={styles.navButton} onClick={() => {  navigate('/home') }}>Home</button>
                            <button className={styles.navButton} onClick={() => {  navigate('/aiservice') }}>AI 서비스</button>
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
                                        if (item.name) {
                                            return <a key={index}><button className={styles.navButton1} onClick={() => { navigate(item.path) }}>{item.name}</button></a>
                                        }
                                    })}
                                </div>
                            </div>
                            <button className={styles.navButton} onClick={handleOpen}>가이드 등록</button>
                        </div>
                        
                        
                        {!localStorage.getItem("token") ?
                                <NavLink className={styles.loginButton} to="/login" >로그인</NavLink>
                                :
                                <NavLink onClick={()=>localStorage.clear()} className={styles.loginButton} to="/home" >로그아웃</NavLink>
                        }
                    </div>
                </div>
            </div>
            {/* 모달 컴포넌트 */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <GuideRegistration />
                </Box>
            </Modal>
        </header>
    );
}


export default Header;



