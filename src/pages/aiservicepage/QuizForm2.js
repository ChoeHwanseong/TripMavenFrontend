import React, { useState } from 'react';
import { Typography, Button, List, ListItem, ListItemButton, ListItemText, RadioGroup, FormControlLabel, Radio, TextField, Box } from '@mui/material';
import styles from '../../styles/aiservicepage/QuizForm2.module.css';

function QuizForm2() {
  const [step, setStep] = useState(1);  // 현재 퀴즈 페이지를 결정하는 상태
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState({
    travelKnowledge: '',
    customerService: '',
    allKnowledge: ''
  });

  const options = ['나훈이', '최항정', '씹구링', '짱이룽', '노졸깝','정주투'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleRadioChange = (section, value) => {
    setSelectedQuiz(prevState => ({
      ...prevState,
      [section]: value,
    }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);  // 현재 스텝을 증가시켜 다음 퀴즈로 이동
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>퀴즈 맞추기</h2>
      <img src="/images/WebTestPageLine.png" style={{ width: '1000px' }} alt="Quiz Line" />

      {step === 1 && (
        <>
          {/* 첫 번째 퀴즈 */}
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
        </>
      )}

      {step === 2 && (
        <>
          {/* 두 번째 퀴즈 */}
          <Typography variant="h6" gutterBottom className={styles.question}>
            1. 관광객과 함께 독도 한달살기에 당첨된 사람은 누구일까요?
          </Typography>

          <List>
            {options.map((option) => (
              <ListItem key={option} disablePadding>
                <ListItemButton 
                  onClick={() => handleOptionClick(option)}
                  selected={selectedOption === option}
                  className={styles.listItemButton}
                >
                  <ListItemText primary={option} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* 버튼 */}
      <Box textAlign="center" mt={4}>
        {step < 2 ? (
          <Button variant="contained" sx={{ backgroundColor: '#0066ff', width: '90px' }} onClick={handleNext}>
            다음
          </Button>
        ) : (
          <Button variant="contained" sx={{ backgroundColor: '#0066ff', width: '90px' }} onClick={handleNext}>
            완료
          </Button>
        )}
      </Box>
    </div>
  );
}

export default QuizForm2;
