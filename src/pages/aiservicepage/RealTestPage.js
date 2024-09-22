import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, MenuItem, Select, Typography } from '@mui/material';
import styles from '../../styles/aiservicepage/RealTestPage.module.css';
import { createEvaluation } from '../../utils/AiData';
import { videoFace } from '../../utils/PythonServerAPI';
import axios from 'axios';
import FaceDetection from '../../components/FaceDetection';


const RealTestPage = () => {
  const memberId = localStorage.getItem('membersId');
  const productboardId  = useParams().id;
  const navigate = useNavigate();

  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isVideoConnected, setIsVideoConnected] = useState(false);
  const [isAudioConnected, setIsAudioConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recordingStatus, setRecordingStatus] = useState("녹화하기");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const [responses, setResponses] = useState([]); // 감정 분석 결과 저장

  const videoChunks = useRef([]);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoBlob = useRef(null);
  const recognitionRef = useRef(null);

  const questions = [
    "Q: 여행을 하는 중에 컴플레인이 들어 왔을 경우 어떻게 해결을 해야 할까요?",
    "Q: 투어 중 한 관광객이 갑자기 화장실을 급히 가고 싶다고 말합니다. 어떻게 안내하실 건가요?",
    "Q: 관광객 중 한 명이 예상치 못하게 길에서 화장실을 찾기 어렵다고 말하며 도움을 요청합니다. 이럴 때 어떻게 대처하시겠어요?",
    "Q: 여행 도중 관광지가 화장실이 멀리 떨어져 있어 시간이 걸릴 것 같다고 말하는 관광객이 있습니다. 이런 경우 어떻게 응대하시겠습니까?"
  ];

  const firstQuestion = "본인의 여행 상품에 대해 1분안에 말하시오";

  useEffect(() => {
    // 장치 목록 가져오기
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
  }, []);

  const handleRecording = async () => {
    if (isRecording) {
      // 영상 녹화 중지
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: selectedAudioDevice?.deviceId,
        sampleRate: 16000,
      },
      video: true
    }).then((stream) => {
      if (webcamRef.current) webcamRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        videoChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(videoChunks.current, { type: 'video/mp4' });
        videoBlob.current = blob;
        videoChunks.current = [];

         // 녹화 시간이 얼마나 되었는지 계산
        const duration = Math.floor(stream.getVideoTracks()[0].getSettings().frameRate * videoChunks.current.length); 
        setTimeLeft(duration);  // 녹화 시간을 상태에 저장
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }).catch((error) => {
      console.error('Error accessing microphone:', error);
    });
  };

  const handleButtonClick = async () => {
    if (recordingStatus === "녹화하기") {
      handleRecording();
      setRecordingStatus("녹화 중지");
    } else if (recordingStatus === "녹화 중지") {
      handleRecording();
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
      navigate('/resultFinalPage/${productboardId}');
    }
  };

  const uploadVideo = async (videoType) => {
    const videoFile = new File([videoBlob.current], 'recordedVideo.mp4', { type: 'video/mp4' });
    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const response = await videoFace(formData);
      if (response.success) {
        const resultData = response.data;
        console.log('resultData:', resultData);

        const evaluationResponse = await createEvaluation({
          score: 50,
          pronunciation: 50,
          tone: "높다",
          fillerwords: 50,
          fillerweights: "메롱",
          formal_speak: 50,
          question_speak: 50,
          text: "잘한다",
          weight: "여러번",
          cheek: resultData.graphs.cheekbones_graph,
          mouth: resultData.graphs.mouth_graph,
          brow: resultData.graphs.brow_graph,
          eye: resultData.eye.average_blinks,
          nasolabial: resultData.graphs.nasolabial_folds_graph,
          commentEye : resultData.eye.comment,
          commentsFace : resultData.expression_comment, 
        }, memberId, productboardId);

        console.log('evaluationResponse:', evaluationResponse);
        setLoadingMessage(""); // 모달 메시지 제거

        // 두 개의 결과를 배열로 전달
        const previousResult = localStorage.getItem("previousResult") 
        ? JSON.parse(localStorage.getItem("previousResult")) 
        : [];

        const allResults = [...previousResult, resultData]; // 결과를 배열에 추가

        localStorage.setItem("previousResult", JSON.stringify(allResults)); // 두 번째 결과 저장
        console.log('allResults: ',allResults);

        if (videoType === 'second') {
            alert('영상이 성공적으로 제출되었습니다!');
            navigate(`/resultFinalPage/${productboardId}`, {
                state: {
                    responses: allResults, // 두 개의 결과를 배열로 전달
                    videoUrls: [
                        URL.createObjectURL(videoBlob.current), 
                        ...previousResult.map(() => URL.createObjectURL(videoBlob.current))
                    ],
                    videoDuration: timeLeft
                }
            });
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
             <>
             <Webcam ref={webcamRef} audio={true} style={{ width: '100%', height: '100%', display: 'block' }} />
          {/*    <FaceDetection webcamRef={webcamRef} setResponses={setResponses} responses={responses} />  FaceDetection 사용 */}
           </>
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
        <Button variant="contained" color="primary" onClick={handleButtonClick} className={styles.controlButton}>
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
