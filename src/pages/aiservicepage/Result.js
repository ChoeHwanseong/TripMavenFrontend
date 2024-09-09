import React from 'react';
import WordCloud from 'react-d3-cloud';
import styles from '../../styles/aiservicepage/Result.module.css';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from '../aiservicepage/BasicDataset';

// 모든 가능한 긍정적인 키워드
const allKeywords = [
    { text: '명확한 발음', value: 1000 },
    { text: '정확한 억양', value: 900 },
    { text: '자연스러운 말투', value: 800 },
    { text: '풍부한 표현력', value: 750 },
    { text: '부드러운 소리', value: 700 },
    { text: '안정적인 속도', value: 650 },
    { text: '감정이 풍부한 목소리', value: 600 },
    { text: '세심한 발음', value: 580 },
    { text: '차분한 억양', value: 550 },
    { text: '생동감 있는 표현', value: 520 },
    { text: '또렷한 목소리', value: 500 },
    { text: '균형 잡힌 속도', value: 480 },
    { text: '조화로운 말투', value: 450 },
    { text: '청명한 발음', value: 430 },
    { text: '일관된 억양', value: 400 },
    { text: '감정을 담은 말투', value: 380 },
    { text: '고급스러운 표현', value: 360 },
    { text: '명료한 소리', value: 340 },
    { text: '부드러운 속도', value: 320 },
    { text: '섬세한 발음', value: 300 },
    { text: '유창한 말하기', value: 280 },
    { text: '정확한 표현', value: 260 },
    { text: '안정감 있는 목소리', value: 240 },
    { text: '청중을 끌어들이는 말투', value: 220 },
    { text: '긍정적인 억양', value: 200 },
    { text: '흐름이 좋은 발음', value: 180 },
    { text: '자신감 있는 말하기', value: 160 },
    { text: '자연스러운 소리', value: 140 },
    { text: '유연한 억양 조절', value: 120 },
    { text: '따뜻한 목소리 톤', value: 100 },
    { text: '풍성한 감정 표현', value: 90 },
    { text: '분명한 말투', value: 80 },
    { text: '매끄러운 말하기', value: 70 },
    { text: '에너지 넘치는 표현', value: 60 },
    { text: '활기찬 목소리', value: 50 },
];

// 주어진 데이터에서 랜덤하게 n개의 항목을 선택하는 함수
const getRandomKeywords = (data, n) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};

// 워드클라우드에 사용할 랜덤 키워드 15개
const wordCloudData = getRandomKeywords(allKeywords, 15);

// 글꼴 크기와 회전 각도를 조정하는 함수
const fontSizeMapper = word => Math.log2(word.value) * 8;
const rotate = () => (Math.random() > 0.5 ? 0 : 90);

const Result = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>발음 테스트 총 결과</h2>
            <div className={styles.chartPtagContainer}>
                <img
                    src="../../images/WebTestPageLine.png"
                    alt="Line Image"
                    style={{ width: '1060px', marginRight: '20px' }}
                />
            </div>
            <div className={styles.resultbox}>
                <h3 className={styles.boxheader}>종합 점수</h3>
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
                </div>
                <div className={styles.totalContainer}>
                    <p className={styles.totalPtag}>
                        당신의 발음은 전체적으로 매우 명확하고 정확합니다.
                        특히, 단어의 발음에서 뛰어난 능력을 보여주며,
                        핵심 단어들에 대해 완벽한 발음을 유지하고 있습니다.
                        이러한 능력은 관광객들이 당신의 설명을 쉽게 이해하고,
                        편안한 여행 경험을 제공하는 데 큰 강점이 될 것입니다.
                    </p>
                </div>
                {/* 개선할 부분과 워드클라우드가 가로로 정렬된 컨테이너 */}
                <div className={styles.improvWordCloudContainer}>
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
                    </div>
                    {/* 워드클라우드 추가 */}
                    <div className={styles.wordCloudContainer}>
                        <h3 className={styles.wordCloudheader}>키워드</h3>
                        <WordCloud
                            data={wordCloudData}
                            fontSizeMapper={fontSizeMapper}
                            rotate={rotate}
                            width={300}
                            height={300}
                            font="Impact"
                            fill={(d, i) => (i % 2 === 0 ? "#1f77b4" : "#ff7f0e")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
