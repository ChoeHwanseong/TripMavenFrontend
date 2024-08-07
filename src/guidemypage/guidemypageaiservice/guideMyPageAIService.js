import React from 'react';
import styles from '../../styles/guidemypageaiservice/GuideMyPageAIService.module.css';
import AIServices from './AIService';

const GuideMyPageAIService = () => {
    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
                <ul>
                    <li>내 정보 관리</li>
                    <li>내 게시물 관리</li>
                    <li>1:1문의 내역</li>
                    <li>찜 목록</li>
                    <li>채팅방</li>
                    <li>ai 서비스</li>
                </ul>
            </div>
            <div className={styles.content}>
                <AIServices />
            </div>
        </div>
    );
};

export default GuideMyPageAIService;