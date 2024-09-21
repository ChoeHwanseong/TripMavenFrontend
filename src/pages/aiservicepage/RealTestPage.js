import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, MenuItem, Select, Typography } from '@mui/material';
import styles from '../../styles/aiservicepage/RealTestPage.module.css';
import useMediaRecorder from './webrecord/useModiaRecorder';
import { createEvaluation } from '../../utils/AiData';
import axios from 'axios';

const RealTestPage = () => {
  const memberId = localStorage.getItem('membersId');
  const productboardId  = useParams().id;
  const navigate = useNavigate();
  const webcamStreamRef = useRef(null);
  const webcamRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isVideoConnected, setIsVideoConnected] = useState(false); // 웹캠 연결 상태
  const [isAudioConnected, setIsAudioConnected] = useState(false); // 마이크 연결 상태
  const [transcript, setTranscript] = useState("");
  const [recordingStatus, setRecordingStatus] = useState("녹화하기");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { startRecording, stopRecording, getBlob, isRecording } = useMediaRecorder();

  const questions = [
    "Q: 여행을 하는 중에 컴플레인이 들어 왔을 경우 어떻게 해결을 해야 할까요?",
    "Q: 투어 중 한 관광객이 갑자기 화장실을 급히 가고 싶다고 말합니다. 어떻게 안내하실 건가요?",
    "Q: 관광객 중 한 명이 예상치 못하게 길에서 화장실을 찾기 어렵다고 말하며 도움을 요청합니다. 이럴 때 어떻게 대처하시겠어요?",
    "Q: 여행 도중 관광지가 화장실이 멀리 떨어져 있어 시간이 걸릴 것 같다고 말하는 관광객이 있습니다. 이런 경우 어떻게 응대하시겠습니까?"
  ];

  const firstQuestion = "본인의 여행 상품에 대해 1분안에 말하시오";




  useEffect(() => {
    console.log('useEffect에서 memberId: ', memberId);
    console.log('useEffect에서 productboardId: ', productboardId);

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
      .catch((error) => console.error('장치 정보를 가져오는 중 에러 발생:', error));
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (webcamStreamRef.current) {
          webcamStreamRef.current.srcObject = stream; // 웹캠 비디오 스트림 연결
        }
        setIsVideoConnected(true);
        setIsAudioConnected(true);
      })
      .catch((error) => {
        console.error('웹캠과 마이크 접근 중 에러 발생:', error);
        setIsVideoConnected(false);
        setIsAudioConnected(false);
      });
  }, []);

  useEffect(() => {
    if (isFirstQuestion && timeLeft > 0 && isRecording) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isFirstQuestion && isRecording) {
      stopRecording();
      setRecordingStatus("전송하기");
    }
  }, [timeLeft, isFirstQuestion, isRecording]);

  const handleButtonClick = async () => {
    if (recordingStatus === "녹화하기") {
      startRecording(webcamStreamRef.current.srcObject);
      setRecordingStatus("녹화 중지");
    } else if (recordingStatus === "녹화 중지") {
      stopRecording();
      setRecordingStatus("전송하기");
    } else if (recordingStatus === "전송하기") {
      setLoadingMessage("영상 전송 중");
      await uploadVideo(isFirstQuestion ? 'first' : 'second');
      
      if (isFirstQuestion) {
        setRecordingStatus("다음 문제");
      } else {
        setRecordingStatus("결과 보기");
      }
    } else if (recordingStatus === "다음 문제") {
      setIsFirstQuestion(false);
      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
      setTranscript("");
      setRecordingStatus("녹화하기");
      setLoadingMessage("");
    } else if (recordingStatus === "결과 보기") {
      navigate('/RealTestResult');
    }
  };

  // 영상 또는 음성 전송 함수
  const uploadVideo = async (videoType) => {
    try {
      // webm 형식을 mp4로 변환하여 Blob 생성
      const videoBlob = new Blob([getBlob()], { type: 'video/mp4' });
      const videoFormData = new FormData();
      videoFormData.append('file', videoBlob, 'video.mp4');

      console.log('videoBlob :', videoBlob);


 //// 영상 길이 출력 시작
       // 비디오 시간을 출력하기 위한 비디오 엘리먼트 생성
      const videoUrl = URL.createObjectURL(videoBlob);
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;

      // 비디오 메타데이터 로드 후, 영상 길이 출력
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;
        console.log(`전송된 영상의 길이: ${duration}초`);
        URL.revokeObjectURL(videoUrl); // 메모리 해제
      };
 //// 영상 길이 출력 끝

      // 영상 전송
      const response = await axios.post('http://localhost:8282/face/', videoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('전송디버깅 결과 response :', response);

      if (response.status === 200) {
        const resultData = response.data;
        setLoadingMessage("");

        // Spring 서버로 결과 전송
        const evaluationResponse = await createEvaluation({
          score: 50,
          pronunciation: 50,
          tone: "높다",
          fillerwords: 50,
          formal_speak: 50,
          question_speak: 50,
          text: "잘한다",
          weight: "여러번",
          cheek: resultData.graphs.cheekbones_graph,
          mouth: resultData.graphs.mouth_graph,
          brow: resultData.graphs.brow_graph,
          eye: resultData.graphs.eye_bar_graph,
          nasolabial: resultData.graphs.nasolabial_folds_graph
        },memberId,productboardId);

        console.log('evaluationResponse: ',evaluationResponse);

        if (videoType === 'second') {
          alert('영상이 성공적으로 제출되었습니다!');
          navigate(`/resultFinalPage/${productboardId}`, { state: { response: resultData } });
        }
      } else {
        setLoadingMessage("");
        alert('영상 제출 중 문제가 발생했습니다.');
      }
    } catch (error) {
      setLoadingMessage("");
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
            <Webcam
              ref={webcamStreamRef}
              audio={true}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
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
