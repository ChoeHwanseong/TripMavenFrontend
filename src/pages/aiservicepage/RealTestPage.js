import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, MenuItem, Select, Typography } from '@mui/material';
import styles from '../../styles/aiservicepage/RealTestPage.module.css';
import { createEvaluation } from '../../utils/AiData';
import axios from 'axios';
import { videoFace } from '../../utils/PythonServerAPI';


const RealTestPage = () => {
  const memberId= localStorage.getItem('memberId');
  const { productboardId } = useParams();
  const navigate = useNavigate();

  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isVideoConnected, setIsVideoConnected] = useState(false); // 웹캠 연결 상태
  const [isAudioConnected, setIsAudioConnected] = useState(false); // 마이크 연결 상태
  const [transcript, setTranscript] = useState("");
  const lastFinalTranscriptRef = useRef(''); // 마지막으로 인식된 최종 자막을 저장
  const accumulatedTranscriptRef = useRef(''); // 모든 최종 자막을 저장하는 참조

  const [recordingStatus, setRecordingStatus] = useState("녹화하기");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { startRecording, stopRecording, getBlob, isRecording } = useMediaRecorder();

  const videoChunks = useRef([]);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null); // SpeechRecognition 인스턴스 참조
  const videoBlob = useRef(null);
  //const [videoBlob, setVideoBlob] = useState(null); // 녹음된 오디오 데이터를 저장
  const [isRecording, setIsRecording] = useState(false);

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
        //모든 장비 가져오기
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        const audioInputs = devices.filter((d) => d.kind === 'audioinput');

        //모든 명단 스테이트로 저장
        setVideoDevices(videoInputs);
        setAudioDevices(audioInputs);

        //첫번째 장비 선택하기
        setSelectedVideoDevice(videoInputs[0] || null);
        setSelectedAudioDevice(audioInputs[0] || null);

        //연결됐는지 여부
        setIsVideoConnected(videoInputs.length > 0);
        setIsAudioConnected(audioInputs.length > 0);
<<<<<<< HEAD
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
=======

        // console.log('Video Devices:', videoInputs); // 디버깅 로그
        // console.log('Audio Devices:', audioInputs); // 디버깅 로그
      })
      .catch((error) => console.error('장치 정보를 가져오는 중 에러 발생:', error));
>>>>>>> d6574a35fe0e7268679d569aaddad8b2ec1196ad
  }, []);

  const handleRecording = async () => {
    if (isRecording) { //영상 녹화되는 중이면 끄기
      //음성 인식 중지
      await recognitionRef.current.stop();
      //영상 녹화 중지
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") await mediaRecorderRef.current.stop(); 
      setIsRecording(false);
      uploadVideo(isFirstQuestion ? 'first' : 'second');
    }
    else {
      lastFinalTranscriptRef.current = ''; // 마지막 최종 자막 초기화
      accumulatedTranscriptRef.current = ''; // 누적된 자막 초기화
      navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedAudioDevice?.deviceId,
          sampleRate: 16000,  // 16kHz 샘플레이트
        },
        video: true
      })
        .then(stream => {
          if (webcamRef.current) webcamRef.current.srcObject = stream; // 웹캠 비디오 스트림 연결

          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            videoChunks.current.push(event.data);
          };

          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(videoChunks.current, { type: 'video/mp4' });
            console.log('오디오 멈춤, 블롭:', blob);
            videoBlob.current = blob; // 비디오 데이터를 Blob으로 저장
            videoChunks.current = []; // 저장 후 초기화
          };

          mediaRecorderRef.current.start();
          setIsRecording(true);
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });

      startSpeechRecognition(); // 음성 인식 시작
    }
  };

  useEffect(() => {
    if (isFirstQuestion && timeLeft > 0 && isRecording) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isFirstQuestion && isRecording) {
      stopRecording();
      setRecordingStatus("전송하기");
      setRecordingStatus("다음 문제");
    }
  }, [timeLeft, isFirstQuestion, isRecording]);

  const handleButtonClick = async () => {
    if (recordingStatus === "녹화하기") {
      handleRecording();
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
    }
    else if (recordingStatus === "녹화 중지") {
      await handleRecording();
      setLoadingMessage("영상 전송 중");
      if (isFirstQuestion) setRecordingStatus("다음 문제"); 
      else setRecordingStatus("결과 보기");
    }
    else if (recordingStatus === "다음 문제") {
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
    }
    else if (recordingStatus === "결과 보기") {
      setLoadingMessage("영상 전송 중");
      uploadVideo('second');
    }
  };


  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition; // ref로 인스턴스 참조
    recognition.lang = 'ko-KR'; // 한국어 설정
    recognition.interimResults = false; // 중간 결과를 무시
    recognition.continuous = true; // 음성 인식을 10초 동안 강제로 유지

    recognition.onresult = (event) => {
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const finalTranscript = event.results[i][0].transcript.trim();
          // 중복된 최종 결과가 없는 경우만 추가
          if (!accumulatedTranscriptRef.current.includes(finalTranscript)) {
            accumulatedTranscriptRef.current += ' ' + finalTranscript; // 최종 결과를 누적
            setTranscript(accumulatedTranscriptRef.current.trim()); // 자막 업데이트
          }
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      recognition.stop();
    };

    recognition.onend = () => {
      // 음성 인식이 자동으로 종료되지 않도록 빈 onend 핸들러
    };

    recognition.start();

    // 60초 후 음성 인식 종료
    setTimeout(() => {
      recognition.stop();
    }, 60000); // 10000ms = 10초
  };


  const uploadVideo = async (videoType) => {
    const videoFile = new File([videoBlob], 'recordedVideo.mp4', { type: 'video/mp4' });
    console.log('녹화된 파일:',videoFile);
    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const response = await videoFace(formData); //영상 분석 결과 받기
      console.log('response: ',response);

      if (response.success) {
        const resultData = await response.data;
        setLoadingMessage("");
        console.log('resultData: ',resultData);

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
              ref={webcamRef}
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
