import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Button, Container, MenuItem, Select, Typography } from '@mui/material';

import styles from '../../styles/aiservicepage/RealTestPage.module.css';

const RealTestPage = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const recognitionRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isVideoConnected, setIsVideoConnected] = useState(true);
  const [isAudioConnected, setIsAudioConnected] = useState(true);
  const [transcript, setTranscript] = useState(""); // 최종 자막을 저장하는 상태
  const [recordingStatus, setRecordingStatus] = useState("녹화하기");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    "Q: 여행을 하는 중에 컴플레인이 들어 왔을 경우 어떻게 해결을 해야 할까요?",
    "Q: 투어 중 한 관광객이 갑자기 화장실을 급히 가고 싶다고 말합니다. 어떻게 안내하실 건가요?",
    "Q: 관광객 중 한 명이 예상치 못하게 길에서 화장실을 찾기 어렵다고 말하며 도움을 요청합니다. 이럴 때 어떻게 대처하시겠어요?",
    "Q: 여행 도중 관광지가 화장실이 멀리 떨어져 있어 시간이 걸릴 것 같다고 말하는 관광객이 있습니다. 이런 경우 어떻게 응대하시겠습니까?"
  ];

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
      .catch((error) => {
        console.error('Error getting device information:', error);
      });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false; // 최종 결과만 받도록 설정
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

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      console.log("음성 인식 시작됨");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log("음성 인식 중지됨");
    }
  };

  const handleButtonClick = () => {
    if (recordingStatus === "녹화하기") {
      setRecordingStatus("녹화 중지");
      startRecording();
    } else if (recordingStatus === "녹화 중지") {
      if (currentQuestionIndex < questions.length - 1) {
        setRecordingStatus("다음 문제");
      } else {
        setRecordingStatus("결과 보기");
      }
      stopRecording();
    } else if (recordingStatus === "다음 문제") {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTranscript(""); // 자막 초기화
      setRecordingStatus("녹화하기");
    } else if (recordingStatus === "결과 보기") {
      navigate('/RealTestResult');
    }
  };

  return (
    <Container className={styles.container}>
      <h1>실전 테스트</h1>
      <p>{questions[currentQuestionIndex]}</p>
      <div className={styles.testContainer}>
        <div className={styles.videoBox}>
          {isVideoConnected ? (
            <Webcam ref={webcamRef} audio={false} className={styles.video} />
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
          className={styles.recordButton}
        >
          {recordingStatus}
        </Button>
      </div>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: '20px' }}>
        ※정확한 측정을 위해 얼굴이 전체적으로 잘 보이도록 하고, 주변 소음을 최소화해 주시기 바랍니다.
      </Typography>
    </Container>
  );
};

export default RealTestPage;
