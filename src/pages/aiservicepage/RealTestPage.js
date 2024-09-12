import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Button, Container, MenuItem, Select, Typography } from '@mui/material';
import styles from '../../styles/aiservicepage/RealTestPage.module.css';

const RealTestPage = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const [recordedChunksFirst, setRecordedChunksFirst] = useState([]); // 첫 번째 영상
  const [recordedChunksSecond, setRecordedChunksSecond] = useState([]); // 두 번째 영상
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isVideoConnected, setIsVideoConnected] = useState(true);
  const [isAudioConnected, setIsAudioConnected] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [recordingStatus, setRecordingStatus] = useState("녹화하기");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(""); // 모달 메시지

  const questions = [
    "Q: 여행을 하는 중에 컴플레인이 들어 왔을 경우 어떻게 해결을 해야 할까요?",
    "Q: 투어 중 한 관광객이 갑자기 화장실을 급히 가고 싶다고 말합니다. 어떻게 안내하실 건가요?",
    "Q: 관광객 중 한 명이 예상치 못하게 길에서 화장실을 찾기 어렵다고 말하며 도움을 요청합니다. 이럴 때 어떻게 대처하시겠어요?",
    "Q: 여행 도중 관광지가 화장실이 멀리 떨어져 있어 시간이 걸릴 것 같다고 말하는 관광객이 있습니다. 이런 경우 어떻게 응대하시겠습니까?"
  ];
  
  const firstQuestion = "본인의 여행 상품에 대해 1분안에 말하시오";

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        const audioInputs = devices.filter((d) => d.kind === 'audioinput');
        setVideoDevices(videoInputs);
        setAudioDevices(audioInputs);
        setSelectedVideoDevice(videoInputs[0] || null);
        setSelectedAudioDevice(audioInputs[0] || null);
        setIsVideoConnected(videoInputs.length > 0);
        setIsAudioConnected(audioInputs.length > 0);
      })
      .catch((error) => console.error('Error getting device information:', error));
  
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'ko-KR';
  
    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      setTranscript(prevTranscript => prevTranscript + finalTranscript);
    };
  }, []);

  useEffect(() => {
    if (isFirstQuestion && timeLeft > 0 && isRecording) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isFirstQuestion && isRecording) {
      stopRecording();
      setRecordingStatus("다음 문제");
    }
  }, [timeLeft, isFirstQuestion, isRecording]);

  const startRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      const stream = webcamRef.current.stream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          if (isFirstQuestion) {
            setRecordedChunksFirst((prev) => [...prev, event.data]);
          } else {
            setRecordedChunksSecond((prev) => [...prev, event.data]);
          }
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log("녹화 시작됨");
    }

    if (recognitionRef.current) {
      recognitionRef.current.start();
      console.log("음성 인식 시작됨");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("녹화 중지됨");
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log("음성 인식 중지됨");
    }
  };

  const handleButtonClick = () => {
    if (recordingStatus === "녹화하기") {
      // 영상 녹화를 시작
      setRecordingStatus("녹화 중지");
      startRecording();
    } else if (recordingStatus === "녹화 중지") {
      // 영상 녹화를 중지하고 서버로 전송
      stopRecording();
      setLoadingMessage("영상 전송 중"); // 모달 메시지 설정
      uploadVideo(isFirstQuestion ? 'first' : 'second'); // 첫 번째 또는 두 번째 영상 전송
    
      if (isFirstQuestion) {
        setRecordingStatus("다음 문제");
      } else {
        setRecordingStatus("결과 보기");
      }
    } else if (recordingStatus === "다음 문제") {
      // 두 번째 질문으로 변경 및 상태 업데이트
      setIsFirstQuestion(false);
      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
      setTranscript("");
      setRecordedChunksFirst([]); // 첫 번째 영상 녹화 데이터 초기화
      setRecordingStatus("녹화하기");
      setLoadingMessage(""); // 모달 메시지 숨기기
    } else if (recordingStatus === "결과 보기") {
      // 두 번째 영상 전송 및 결과 페이지 이동
      setLoadingMessage("영상 전송 중");
      uploadVideo('second'); // 두 번째 영상 전송
    }
  };

  const uploadVideo = async (videoType) => {
    const recordedChunks = videoType === 'first' ? recordedChunksFirst : recordedChunksSecond;
    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('file', videoBlob, 'recordedVideo.webm');
  
    try {
      const response = await fetch('http://localhost:8282/face/', {
        method: 'POST',
        body: formData
      });

      console.log('response :: ',response);
  
      if (response.ok) {
        const resultData = await response.text();

        console.log('resultData :: ',resultData); // 빈 배열... 왜 ?

        setLoadingMessage(""); // 모달 숨기기
        if (videoType === 'second') {
          alert('영상이 성공적으로 제출되었습니다!');
          navigate('/RealTestResult', { state: { response: resultData } });
        }
      } else {
        alert('영상 제출 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('영상 제출 중 에러 발생:', error);
      alert('영상 제출 중 에러가 발생했습니다.');
    }
  };

  return (
    <Container className={styles.container}>
      <h1>실전 테스트</h1>
      <p>{isFirstQuestion ? firstQuestion : questions[currentQuestionIndex]}</p>
      <p>{isFirstQuestion && `남은 시간: ${timeLeft}초`}</p>
      <div className={styles.testContainer}>
        <div className={styles.videoBox}>
          {isVideoConnected ? (
            <Webcam ref={webcamRef} audio={true} className={styles.video} />
          ) : (
            <Typography variant="body2" color="error" align="center">
              * 웹캠이 연결되지 않았습니다.
            </Typography>
          )}
        </div>
        <div className={styles.textBox}>
          <p>{transcript}</p>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.selectContainer}>
          <Select
                        value={selectedVideoDevice?.deviceId || ''}
                        displayEmpty
                        onChange={(e) => setSelectedVideoDevice(videoDevices.find((d) => d.deviceId === e.target.value))}
                        className={styles.selectControl}
                      >
                        <MenuItem value="">웹캠을 선택하세요</MenuItem>
                        {videoDevices.map((device) => (
                          <MenuItem key={device.deviceId} value={device.deviceId}>
                            {device.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <Select
                        value={selectedAudioDevice?.deviceId || ''}
                        displayEmpty
                        onChange={(e) => setSelectedAudioDevice(audioDevices.find((d) => d.deviceId === e.target.value))}
                        className={styles.selectControl}
                      >
                        <MenuItem value="">마이크를 선택하세요</MenuItem>
                        {audioDevices.map((device) => (
                          <MenuItem key={device.deviceId} value={device.deviceId}>
                            {device.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick}
                      className={styles.controlButton}
                    >
                      {recordingStatus}
                    </Button>
                  </div>
                  {loadingMessage && (
                    <div className={styles.modal}>
                      <div className={styles.modalContent}>
                        <Typography variant="h6">{loadingMessage}</Typography>
                      </div>
                    </div>
                  )}
                </Container>
              );
            };
            
            export default RealTestPage;
            