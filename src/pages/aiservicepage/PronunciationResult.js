import React, { useEffect } from 'react';
import WordCloud from 'react-d3-cloud';
import styles from '../../styles/aiservicepage/Result.module.css';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from './BasicDataset';



// 랜덤하게 항목을 선택하는 함수
const getRandomKeywords = (data, n) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};



// 글씨 크기와 각도를 조정하는 함수
const fontSizeMapper = word => Math.log2(word.value) * 8;
const rotate = () => (Math.random() > 0.5 ? 0 : 90);



const PronunciationResult = () => {

    useEffect(() => {
        // 컴포넌트가 마운트될 때 스크롤을 최상단으로 이동
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>발음 테스트 결과</h2>
            <div className={styles.chartPtagContainer}>
                <img
                    src="../../images/WebTestPageLine.png"
                    alt="Line Image"
                    style={{ width: '1060px', marginRight: '20px' }}
                />
            </div>
            <div className={styles.resultbox}>
                <h3 className={styles.boxheader}>점수</h3>
                <div className={styles.chartContainer}>
                    <Gauge
                    className={styles.circlechart}
                        value={75}
                        startAngle={-110}
                        endAngle={110}
                        sx={{
                            width: '200px',
                            height: '150px',
                            mt: '20px',
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 20,
                                transform: 'translate(0px, 0px)',
                            },
                        }}
                        text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />
                    {/*
                    <LineChart
                        className={styles.linechart}
                        dataset={dataset}
                        xAxis={[{ dataKey: 'x' }]}
                        series={[{ dataKey: 'y' }]}
                        height={180}
                        width={320}
                        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                        grid={{ vertical: true, horizontal: true }}
                    />
                    */}
                </div>
                <div className={styles.totalContainer}>
                    <p className={styles.totalPtag}>
                        당신의 발음은 전체적으로 매우 명확하고 정확합니다.
                    </p>
                </div>
                
                <div className={styles.improvWordCloudContainer}>
                    <div className={styles.improvContainer}>
                        <span className={styles.improvHeader}>개선할 부분</span>
                        <div className={styles.improv1}>
                            <span className={styles.improvTitle}>속도 조절</span>
                            <p className={styles.improvResult}>
                                :말하는 속도가 때때로 너무 빠르거나 일정하지 않은 경향이 있습니다. <br />
                            </p>
                        </div>
                        <div className={styles.improv1}>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>처음 화면으로 이동</button>
            </div>
        </div>
    );
};

export default PronunciationResult;
