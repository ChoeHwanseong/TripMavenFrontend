import React, { useState } from 'react';
import { Container, Typography, FormControlLabel, RadioGroup, Radio, TextField, Button, Box } from '@mui/material';
import styles from '../../styles/aiservicepage/QuizForm1.module.css';
import { useNavigate } from 'react-router-dom';

function QuizForm1() {
    const navigate = useNavigate();
    const [selectedQuiz, setSelectedQuiz] = useState({
        travelKnowledge: '',
        customerService: '',
        allKnowledge: ''
    });

    const handleRadioChange = (section, value) => {
        setSelectedQuiz(prevState => ({
            ...prevState,
            [section]: value,
        }));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>퀴즈 맞추기</h2>
            <img src="/images/WebTestPageLine.png" style={{ width: '1000px' }} alt="Quiz Line" />

            {/* 첫 번째 섹션 */}
            <div>
                <p className={styles.subtitle}>여행지에 대한 지식 키우기</p>
                <RadioGroup name="travel-knowledge" value={selectedQuiz.travelKnowledge} onChange={(e) => handleRadioChange('travelKnowledge', e.target.value)}>
                    <FormControlLabel value="객관식 문제" control={<Radio />} label="객관식 문제" />
                    <FormControlLabel value="서술형 문제" control={<Radio />} label="서술형 문제" />
                    <FormControlLabel value="혼합형 문제" control={<Radio />} label="객관식과 서술형 혼합형 문제" />
                </RadioGroup>

                {selectedQuiz.travelKnowledge && (
                    <Box mt={2}>
                        <TextField fullWidth placeholder={`${selectedQuiz.travelKnowledge} 입력`} variant="outlined" />
                    </Box>
                )}
            </div>

            {/* 두 번째 섹션 */}
            <div>
                <p className={styles.subtitle}>고객 응대 지식 키우기</p>
                <RadioGroup name="customer-service" value={selectedQuiz.customerService} onChange={(e) => handleRadioChange('customerService', e.target.value)}>
                    <FormControlLabel value="객관식 문제" control={<Radio />} label="객관식 문제" />
                    <FormControlLabel value="서술형 문제" control={<Radio />} label="서술형 문제" />
                    <FormControlLabel value="혼합형 문제" control={<Radio />} label="객관식과 서술형 혼합형 문제" />
                </RadioGroup>

                {selectedQuiz.customerService && (
                    <Box mt={2}>
                        <TextField fullWidth placeholder={`${selectedQuiz.customerService} 입력`} variant="outlined" />
                    </Box>
                )}
            </div>

            {/* 세 번째 섹션 */}
            <div>
                <p className={styles.subtitle}>여행지와 고객응대 모든 지식 키우기</p>
                <RadioGroup name="all-knowledge" value={selectedQuiz.allKnowledge} onChange={(e) => handleRadioChange('allKnowledge', e.target.value)}>
                    <FormControlLabel value="객관식 문제" control={<Radio />} label="객관식 문제" />
                    <FormControlLabel value="서술형 문제" control={<Radio />} label="서술형 문제" />
                    <FormControlLabel value="혼합형 문제" control={<Radio />} label="객관식과 서술형 혼합형 문제" />
                </RadioGroup>

                {selectedQuiz.allKnowledge && (
                    <Box mt={2}>
                        <TextField fullWidth placeholder={`${selectedQuiz.allKnowledge} 입력`} variant="outlined" />
                    </Box>
                )}
            </div>

            {/* 버튼 */}
            <Box textAlign="center" mt={4}>
                <Button variant="contained" sx={{ backgroundColor: '#0066ff', width: '90px' }} onClick={() => { navigate('/quizform2') }}>
                    다음
                </Button>
            </Box>
        </div>
    );
}

export default QuizForm1;
