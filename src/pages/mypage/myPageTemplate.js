import React from 'react';
import styles from '../../styles/mypage/myPageTemplate.module.css';
import SideMenu from '../../components/sideMenu';
import { Outlet } from 'react-router-dom';

//마이페이지 템플릿
const MyPageTemplate = () => {
    return (
        <div className={styles.page}>
            <SideMenu/>
            <div className={styles.content}>
                {/* 여기에 컨텐츠 내용이 들어감 */}
                <Outlet/>
            </div>
        </div>
    );
};

export default MyPageTemplate;