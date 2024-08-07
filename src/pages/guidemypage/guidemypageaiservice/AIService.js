import React from 'react';
import styles from '../../../styles/guidemypage/guidemypageaiservice/AIService.module.css';
import RadarChart from './randarChart';
import ScoreCircle from './scoreCircle';

const AIService = () => {
    const scores = [
        { period: '가장 마지막', score: 60 },
        { period: '최근 3개월', score: 70 },
        { period: '최근 6개월', score: 80 },
        { period: '최근 1년', score: 90 },
    ];

    const data = [
        { id: 9621, type: '모의테스트', description: '우도 히든 스팟 탐험: 함께 떠나는 특별한 여행 (중급)', date: '2024-08-01', score: 80 },
        { id: 1212, type: '실전 테스트', description: '우도에서 즐기는 완벽한 하루: 가이드와 함께하는 숨은 명소 탐방 (실화)', date: '2023-12-31', score: 60 },
        { id: 9622, type: '모의테스트', description: '우도 여행 가이드: 섬 속의 작은 낙원 탐험 (기초)', date: '2024-03-19', score: 40 },
    ];

    return (
        <div className={styles.aiServices}>
            <h2>ai 서비스</h2>
            <div className={styles.chartContainer}>
                {scores.map((score, index) => (
                    <RadarChart key={index} period={score.period} score={score.score} />
                ))}
            </div>
            <div className={styles.scoreContainer}>
                <ScoreCircle score={60} />
                <button className={styles.button}>AI 교육 들으러가기</button>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>검사번호</th>
                            <th>분류</th>
                            <th>AI 평가항목</th>
                            <th>작성일</th>
                            <th>평가 점수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.type}</td>
                                <td>{item.description}</td>
                                <td>{item.date}</td>
                                <td>{item.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button}>선택삭제</button>
                <button className={styles.button}>모의 테스트 결과 목록</button>
                <button className={styles.button}>실전 테스트 결과 목록</button>
            </div>
        </div>
    );
};

export default AIService;