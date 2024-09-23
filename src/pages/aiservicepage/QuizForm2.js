import React, { useState, useEffect } from 'react';
import styles from '../../styles/aiservicepage/Quiz.module.css';
import { fetchData, submitAnswer } from '../../utils/Quiz';  
import { useNavigate } from 'react-router-dom';
import QuizResult from './FinishQuiz';

const QuizForm = () => {
  const [data, setData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [usedQuiz, setUsedQuiz] = useState([]);
  const [score, setScore] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        randomQuiz(fetchedData, []);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getData();
  }, []);

  const randomQuiz = (quizList, usedQuiz) => {
    const availableQuiz = quizList.filter(quiz => !usedQuiz.includes(quiz.id));

    if (availableQuiz.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuiz.length);
      const selectQuiz = availableQuiz[randomIndex];
      setCurrentQuiz(selectQuiz);
      setUsedQuiz([...usedQuiz, selectQuiz.id]);
    } else {
      alert("모든 퀴즈를 다 풀었습니다");
      setCurrentQuiz(null);
      setIsModalOpen(true);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);  // 사용자가 옵션을 클릭할 때 선택된 옵션을 상태로 설정
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/FinishQuiz');
  };

  const handleSubmit = async () => {
    if (currentQuiz && selectedOption) {
      try {
        const isCorrect = selectedOption === currentQuiz.answer;
        await submitAnswer(currentQuiz.id, selectedOption);
        if (isCorrect) {
          setScore(prevScore => {
            const newScore = prevScore + 10;
            console.log('총점', newScore); 
            return newScore;
          });
        }
        randomQuiz(data, usedQuiz);
        setSelectedOption(null);
      } catch (error) {
        console.error('에러 났당 ', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>퀴즈 맞추기</h2>
      {currentQuiz && (
        <>
          <p className={styles.question}> {usedQuiz.length }. {currentQuiz.question}</p>
          <ul className={styles.options}>
            <li>
              <button
                className={`${styles.listItemButton} ${selectedOption === currentQuiz.options1 ? styles.selected : ''}`}
                onClick={() => handleOptionClick(currentQuiz.options1)}
              >
                {currentQuiz.options1}
              </button>
            </li>
            <li>
              <button
                className={`${styles.listItemButton} ${selectedOption === currentQuiz.options2 ? styles.selected : ''}`}
                onClick={() => handleOptionClick(currentQuiz.options2)}
              >
                {currentQuiz.options2}
              </button>
            </li>
            <li>
              <button
                className={`${styles.listItemButton} ${selectedOption === currentQuiz.options3 ? styles.selected : ''}`}
                onClick={() => handleOptionClick(currentQuiz.options3)}
              >
                {currentQuiz.options3}
              </button>
            </li>
            <li>
              <button
                className={`${styles.listItemButton} ${selectedOption === currentQuiz.options4 ? styles.selected : ''}`}
                onClick={() => handleOptionClick(currentQuiz.options4)}
              >
                {currentQuiz.options4}
              </button>
            </li>
          </ul>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={!selectedOption}>
            다음
          </button>
        </>
      )}
       <QuizResult isOpen={isModalOpen} onClose={handleCloseModal} newScore={score} />  
    </div>
  );
};

export default QuizForm;


/*
import React, { useState } from 'react';
import styles from '../../styles/aiservicepage/QuizForm2.module.css';  // CSS 모듈을 import 합니다.
import { useNavigate } from 'react-router-dom';

function QuizForm2() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  // 총 10개의 문제와 각각의 선택지 및 정답을 배열로 정의합니다.
  const questions = [
    {
      question: '1. 관광객과 함께 독도 한달살기에 당첨된 사람은 누구일까요?',
      options: ['1. 정주투', '2. 최항정', '3. 씹구링', '4. 짱이룽'], //최항정
    },
    {
      question: '2. 다음 중 한국의 수도는 어디일까요?',
      options: ['1. 서울', '2. 부산', '3. 대구', '4. 인천'], //나는 부산이 제일 좋아
    },
    {
      question: '3. 다음 중 제주도에서 유명한 관광지는 어디인가요?',
      options: ['1. 설악산', '2. 한라산', '3. 지리산', '4. 북한산'], //한라산 마시면 진짜 머리 깨져
    },
    {
      question: '4. 경복궁이 위치한 도시는 어디인가요?',
      options: ['1. 인천', '2. 대구', '3. 서울', '4. 수원'], //나는 수원 살지롱
    },
    {
      question: '5. 한국의 전통 음식인 김치의 주 재료는 무엇인가요?',
      options: ['1. 당근', '2. 무', '3. 배추', '4. 감자'], //감자김치 진짜 싫다
    },
    {
      question: '6. 다음 중 한국의 전통 건축물인 한옥을 볼 수 있는 곳은 어디인가요?',
      options: ['1. 부산 해운대', '2. 전주 한옥마을', '3. 강릉 경포대', '4. 제주 성산일출봉'], //전주에 분위기 진짜 좋은 술집 내가 알아
    },
    {
      question: '7. 대한민국의 가장 남쪽에 위치한 섬은 어디인가요?',
      options: ['1. 울릉도', '2. 독도', '3. 제주도', '4. 거제도'], //제주도는 겨울에 가야지
    },
    {
      question: '8. 다음 중 한국의 전통 춤인 "부채춤"을 감상할 수 있는 대표적인 장소는 어디인가요?',
      options: ['1. 남산', '2. 국립중앙박물관', '3. 국립국악원', '4. 인사동'], //국립국악원
    },
    {
      question: '9. 부산의 해운대 해변은 어떤 지역으로 유명한가요?',
      options: ['1. 서핑', '2. 해양 레저', '3. 카지노', '4. 스키'], //해양 레저
    },
    {
      question: '10. 한국의 가장 큰 호수는 어디인가요?',
      options: ['1. 충주호', '2. 소양호', '3. 팔당호', '4. 대청호'], //소양호
    }
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);  // 사용자가 옵션을 클릭할 때 선택된 옵션을 상태로 설정
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);  // 다음 문제로 이동할 때 선택된 옵션 초기화
    } 
    else {
      alert("퀴즈가 완료되었습니다!");  // 마지막 문제 후 알림 표시
    }
  };

  const handleCompleteClick = () => {
    navigate('/aiservice');  
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>퀴즈 맞추기</h2>
      <img src="/images/WebTestPageLine.png" style={{ width: '730px' }} alt="Quiz Line" />

      <p className={styles.question}>
        {questions[currentQuestionIndex].question}
      </p>

      <div className={styles.optionList}>
        {questions[currentQuestionIndex].options.map((option) => (
          <button
            key={option}
            className={`${styles.optionButton} ${selectedOption === option ? styles.selected : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>


      <div className={styles.buttonContainer}>
        {currentQuestionIndex < questions.length - 1 ? (
          <button className={styles.nextButton} onClick={handleNextClick}>
            다음
          </button>
        ) : (
          <button className={styles.nextButton} onClick={handleCompleteClick}>
            완료
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizForm2;


*/