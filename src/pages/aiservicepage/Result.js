import React from 'react';
import styles from '../../styles/aiservicepage/Result.module.css';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from '../aiservicepage/BasicDataset';

const Result = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>발음 테스트 총 결과</h2>
            <img src="../../images/WebTestPageLine.png" alt="Line Image" style={{ width: '1100px', marginBottom: '20px' }} />
            <div className={styles.resultbox}>
                <h3 className={styles.boxheader}>종합 점수</h3>
                {/* Flex 컨테이너를 사용하여 왼쪽 상단에 정렬 */}
                <div className={styles.chartContainer}>
                    <Gauge
                        value={75}
                        startAngle={-110}
                        endAngle={110}
                        sx={{
                            width: '200px',
                            height: '130px',
                            mt: '10px',
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 20,
                                transform: 'translate(0px, 0px)',
                            },
                        }}
                        text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />
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
                    <p className={styles.chartPtag}>당신의 발음은 전체적으로 매우 명확하고
                        정확합니다.  <br /> 특히, 단어의 발음에서 뛰어
                        난능력을 보여주며, <br /> 핵심 단어들에 대해
                        완벽한 발음을 유지하고 있습니다. <br /> 이러한
                        능력은 관광객들이 당신의 설명을 쉽게
                        이해하고, <br />편안한 여행 경험을 제공하는
                        데 큰 강점이 될 것입니다.</p>
                </div>
                {/* 
                <div class={styles.progressContainer}>
                    <div class={styles.progressBar}></div>
                    <span class={styles.progressText}>75%</span>
                </div>
                */}
                <div className={styles.improvContainer}>
                    <span className={styles.improvHeader}>개선할 부분</span>
                    <div className={styles.improv1}>
                        <span className={styles.improvTitle}>속도 조절<br /></span>
                        <p className={styles.improvResult}>
                            :말하는 속도가 때때로 너무 빠르거나 일정하지 않은 경향이 있습니다. <br />
                            이는 중요한 정보를 전달할 때 듣는 이가 따라가기 어려울 수 있습니다. <br />
                            천천히 말하는 연습을 통해 말의 흐름을 좀 더 자연스럽게 유지해 보세요. <br />
                            한 문장을 말한 후 짧은 호흡을 통해 속도를 조절하는 것이 효과적입니다. <br />
                        </p>
                    </div>
                    <div className={styles.improv1}>
                        <span className={styles.improvTitle}>끝 음절 처리<br /></span>
                        <p className={styles.improvResult}>
                            :말하는 속도가 때때로 너무 빠르거나 일정하지 않은 경향이 있습니다. <br />
                            이는 중요한 정보를 전달할 때 듣는 이가 따라가기 어려울 수 있습니다. <br />
                            천천히 말하는 연습을 통해 말의 흐름을 좀 더 자연스럽게 유지해 보세요. <br />
                            한 문장을 말한 후 짧은 호흡을 통해 속도를 조절하는 것이 효과적입니다. <br />
                        </p>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
