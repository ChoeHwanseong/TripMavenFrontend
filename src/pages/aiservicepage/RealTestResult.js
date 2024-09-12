import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/aiservicepage/RealTestResult.module.css';
import bgVideo from '../../videos/BG-video.mp4';
import axios from 'axios';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="#000000" d="M8 5v14l11-7L8 5z"/>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="#000000" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const RewindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="#000000" d="M11 19V5l-7 7 7 7zm9-14l-7 7 7 7V5z"/>
  </svg>
);

const ForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="#000000" d="M13 5v14l7-7-7-7zm-9 14l7-7-7-7v14z"/>
  </svg>
);

const RealTestResult = ( {response} ) => {
  const questions = [
    "우도의 경관을 해변에서 즐길 수 있는 주요 액티비티는 무엇인가요?",
    "투어 중 한 관광객이 갑자기 화장실을 급히 가고 싶다고 말합니다. 어떻게 안내하실 건가요?",
    "관광객 중 한 명이 예상치 못하게 길에서 화장실을 찾기 어렵다고 말하며 도움을 요청합니다. 이럴 때 어떻게 대처하시겠어요?",
    "여행 도중 관광지가 화장실이 멀리 떨어져 있어 시간이 걸릴 것 같다고 말하는 관광객이 있습니다. 이런 경우 어떻게 응대하시겠습니까?"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용


  const [result, setResult] = useState(null);
  const [eyeGraph, setEyeGraph] = useState(null);
  const [mouthGraph, setMouthGraph] = useState(null);
  const [cheekbonesGraph, setCheekbonesGraph] = useState(null);
  const [browGraph, setBrowGraph] = useState(null);
  const [nasolabialFoldsGraph, setNasolabialFoldsGraph] = useState(null);

  useEffect(() => {
    const getResults = async () => {



        const data = response.data;
        console.log('data: ', data);
        setResult(data);

        // base64로 인코딩된 그래프 이미지 설정
        setEyeGraph(`data:image/png;base64,${data.graphs.eye_bar_graph}`);
        setMouthGraph(`data:image/png;base64,${data.graphs.mouth_graph}`);
        setCheekbonesGraph(`data:image/png;base64,${data.graphs.cheekbones_graph}`);
        setBrowGraph(`data:image/png;base64,${data.graphs.brow_graph}`);
        setNasolabialFoldsGraph(`data:image/png;base64,${data.graphs.nasolabial_folds_graph}`);
    
    };

    if (response) {
      getResults();
    }
  }, [response]);




  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  const handleRewind = () => {
    videoRef.current.currentTime -= 10;
  };

  const handleForward = () => {
    videoRef.current.currentTime += 10;
  };

  const handleRetakeTest = () => {
    navigate('/RealTestPage'); // RealTestPage로 이동
  };

  return (
    <div className={styles.container}>
      <h1>실전 테스트 분석결과</h1>
      <div className={styles.aiAssessment}>


      {result && (
                <div>
                    <h2>Analysis Result:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>

                    {eyeGraph && (
                        <div>
                            <h3>Eye Blink Graph</h3>
                            <img src={eyeGraph} alt="Eye Blink Graph" />
                        </div>
                    )}
                    {mouthGraph && (
                        <div>
                            <h3>Mouth Movement Graph</h3>
                            <img src={mouthGraph} alt="Mouth Movement Graph" />
                        </div>
                    )}
                    {cheekbonesGraph && (
                        <div>
                            <h3>Cheekbones Movement Graph</h3>
                            <img src={cheekbonesGraph} alt="Cheekbones Movement Graph" />
                        </div>
                    )}
                    {browGraph && (
                        <div>
                            <h3>Brow Movement Graph</h3>
                            <img src={browGraph} alt="Brow Movement Graph" />
                        </div>
                    )}
                    {nasolabialFoldsGraph && (
                        <div>
                            <h3>Nasolabial Folds Movement Graph</h3>
                            <img src={nasolabialFoldsGraph} alt="Nasolabial Folds Movement Graph" />
                        </div>
                    )}
                </div>
            )}









        <div className={styles.question}>
          <span>Q: "{questions[currentQuestionIndex]}"</span>
        </div>
        <video className={styles.videoPlayer} ref={videoRef} width="100%" controls>
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoControls}>
          <button onClick={playVideo} className={styles.iconButton}><PlayIcon /></button>
          <button onClick={pauseVideo} className={styles.iconButton}><PauseIcon /></button>
          <button onClick={handleRewind} className={styles.iconButton}><RewindIcon /></button>
          <button onClick={handleForward} className={styles.iconButton}><ForwardIcon /></button>
        </div>
        {currentQuestionIndex > 0 && (
          <button className={styles.arrowButtonLeft} onClick={handlePrevious}>{"<"}</button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <button className={styles.arrowButtonRight} onClick={handleNext}>{">"}</button>
        )}
      </div>
      <div className={styles.feedbackContainer}>
        <div className={styles.feedback}>
          <strong>전반적인 피드백:</strong> 목소리 톤과 속도가 경쾌해서 시청자들이 편안하게 들을 수 있었습니다. 
          다양한 자료를 사용하여 청중의 관심을 잘 유지하였습니다. 
          문장에 대한 인식과 분석이 잘 되었으나, 설명 중간에 중요한 키워드나 핵심 포인트가 명확히 전달되지 않은 점이 조금 아쉽습니다.
        </div>
        <div className={styles.feedback}>
          <strong>긍정적 피드백:</strong> 활기차게 다양한 시청자에게 어필한 점이 인상적이었습니다. 안심감을 전달하며 침착하게 발표하였습니다.
        </div>
        <div className={styles.feedback}>
          <strong>개선점 피드백:</strong> 설명 중간에 중요한 포인트를 강조할 때 조금 더 명확하게 전달하면 좋겠습니다.
        </div>
      </div>
      <div className={styles.keywordContainer}>
        <div className={styles.keywordBox}>
          <h3><strong>내가 획득한 키워드</strong></h3>
          <img src='../../images/keyword1.png'  alt="내가 획득한 키워드" />
        </div>
        <div className={styles.keywordBox}>
          <h3><strong>내가 획득하지 못한 키워드</strong></h3>
          <img src='../../images/keyword2.png'  alt="내가 획득못한 키워드" />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>키워드 보러가기</button>
        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleRetakeTest}>테스트 다시 보기</button>
      </div>
    </div>
  );
};

export default RealTestResult;
