import React from 'react';
import styles from '../../../styles/guidemypage/guidemypageaiservice/ScoreCircle.module.css';

const ScoreCircle = ({ score }) => {
    const degree = (score / 100) * 360;
    const leftStyle = degree > 180 ? { transform: 'rotate(180deg)' } : { transform: `rotate(${degree}deg)` };
    const rightStyle = degree > 180 ? { transform: `rotate(${degree - 180}deg)` } : {};

    return (
        <div className={styles.scoreCircle}>
            <div className={styles.score}>{score}</div>
            <div className={styles.scoreOverlay} style={rightStyle}></div>
            {degree > 180 && <div className={`${styles.scoreOverlay} ${styles.left}`} style={leftStyle}></div>}
        </div>
    );
};

export default ScoreCircle;
