import React from 'react';
import styles from '../../../styles/guidemypage/guidemypageaiservice/guideMyPageAIService.module.css';
import AIServices from './aIService';
import SideMenu from '../../../components/sideMenu';

const GuideMyPageAIService = () => {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <AIServices />
            </div>
        </div>
    );
};

export default GuideMyPageAIService;
