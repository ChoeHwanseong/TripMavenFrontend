import React from 'react';
import styles from '../../styles/aiservicepage/PrecautionsPage1.module.css';

const PrecautionsPage1 = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>유의사항</h2>
            <p className={styles.subtitle}>정확한 분석을 위해 화면이 녹화되는 동안 아래 사항들을 유의해주세요.</p>
            <div className={styles.content}>
                <div className={styles.textSection}>
                    <img src="/images/recordpage1_bar.png" className={styles.bar}/>
                    <div>
                        <img src="/images/recordpage1_01.png" className={styles.number}/>
                    </div>
                    <h4 className={styles.stepTitle}>FACE LOCATION</h4>
                    <p className={styles.instruction}>얼굴 전체가 화면에 들어오도록 해주세요.</p>
                    <p className={styles.detail}>얼굴 전체가 화면에 자연스럽게 들어오도록 웹캠의 각도를 조정하세요.<br />
                        머리 꼭대기부터 턱까지 모두 화면에 보이도록 합니다.</p>
                </div>
                <div className={styles.imageSection}>
                    <img src="/images/recordpage1.png" alt="얼굴 인식" className={styles.image} />
                </div>
            </div>
        </div>
    );
};

export default PrecautionsPage1;
