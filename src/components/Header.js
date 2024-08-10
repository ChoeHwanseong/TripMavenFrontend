import React from 'react';
import styles from '../styles/components/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.headerFrame}>
                <button className={styles.logoButton} onClick={() => navigate('/home')}>TripMaven</button>
                <div className={styles.nav}>
                    <div className={styles.inputstyle}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon}/>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="검색어를 입력하세요"
                        />
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
                                    <a><button className={styles.navButton1} onClick={() => navigate('/guideprofile')}>프로필</button></a>
                                    <a><button className={styles.navButton1} onClick={() => navigate('/guidemypageinquirydetails')}>문의내역</button></a>
                                    <a><button className={styles.navButton1} onClick={() => navigate('/logout')}>로그아웃</button></a>
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