import React from 'react';
import styles from '../../../styles/guidemypage/guidemypageaiservice/GuideMyPageAIService.module.css';
import AIServices from './AIService';

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
