import React from 'react';
import styles from '../../styles/finishQuiz.module.css';
import ScoreCircle from '../guidemypage/guidemypageaiservice/ScoreCircle';
import { useNavigate } from 'react-router-dom';

const QuizResult = ({ isOpen}) => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/aiservice');
      };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h1 className={styles.title}>퀴즈 맞추기 분석 결과</h1>

                <div className={styles.scoreSection}>
                    <div className={styles.scoreCircle}>
                        <ScoreCircle score={60} />
                    </div>
                    <div className={styles.graphSection}>
                        <div className={styles.graph}>
                            <div className={styles.averageBar}></div>
                            <p>평균점수</p>
                        </div>
                        <div className={styles.graph}>
                            <div className={styles.myBar}></div>
                            <p>내점수</p>
                        </div>
                    </div>
                </div>
                <button className={styles.viewQuestionsButton} onClick={handleSubmit}>시작 페이지로 이동</button>
            </div>
        </div>
    );
}

export default QuizResult;