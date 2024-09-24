import React, { useState, useRef, useEffect, useContext } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, MenuItem, Select, Typography } from '@mui/material';
import styles from '../../styles/aiservicepage/RealTestPage.module.css';
import { createEvaluation } from '../../utils/AiData';
import { evaluateVoiceAndText, videoFace } from '../../utils/PythonServerAPI';
import { TemplateContext } from '../../context/TemplateContext';
import FaceDetection from '../../components/FaceDetection';


const RealTestPage = () => {
  const memberId = localStorage.getItem('membersId');
  const { memberInfo } = useContext(TemplateContext);
  const productboardId = useParams().id;
  const navigate = useNavigate();

  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isVideoConnected, setIsVideoConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recordingStatus, setRecordingStatus] = useState("녹화하기");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [responses, setResponses] = useState([]); // 감정 분석 결과 저장

  const webcamRef = useRef(null);
  const videoBlob = useRef(null);
  const videoChunks = useRef([]);
  const videoRecorderRef = useRef(null);
  const audioBlob = useRef(null);
  const audioChunks = useRef([]);
  const audioRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);  // 녹화 상태 관리

  const accumulatedTranscriptRef = useRef(''); // 모든 최종 자막을 저장하는 참조
  const recognitionRef = useRef(null);
  const intervalRef = useRef(null);  //타이머
  const timeoutRef = useRef(null);  // 타임아웃을 관리하는 ref

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
      })
      .catch((error) => console.error('장치 정보를 가져오는 중 에러 발생:', error));
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  //녹화, 녹음 설정 및 시작하는 함수
  const startRecording = () => {
    
    navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: selectedAudioDevice?.deviceId,
        sampleRate: 16000,
      },
      video: true
    }).then((stream) => {
      if (webcamRef.current) webcamRef.current.srcObject = stream;

      //비디오 녹화
      videoRecorderRef.current = new MediaRecorder(stream);
      videoRecorderRef.current.ondataavailable = (event) => {
        videoChunks.current.push(event.data);
      };

      videoRecorderRef.current.onstop = () => {
        const blob = new Blob(videoChunks.current, { type: 'video/mp4' });
        console.log('비디오 블롭:', blob);
        videoBlob.current = blob;
        videoChunks.current = [];

        if (intervalRef.current) {
          clearInterval(intervalRef.current);  // 타이머 중지
        }

         // 녹화 시간이 얼마나 되었는지 계산
         const duration = Math.floor(stream.getVideoTracks()[0].getSettings().frameRate * videoChunks.current.length); 
         setTimeLeft(duration);  // 녹화 시간을 상태에 저장
      };

      //녹화시작
      videoRecorderRef.current.start();

      // 오디오 녹화
      const audioStream = new MediaStream(stream.getAudioTracks());
      audioRecorderRef.current = new MediaRecorder(audioStream, { mimeType: 'audio/webm;codecs=opus' });
      audioRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      audioRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        console.log('오디오 블롭:', blob);
        audioBlob.current = blob;
        audioChunks.current = [];
      };

      audioRecorderRef.current.start();
      setIsRecording(true);

      // 1초마다 녹화 시간 업데이트
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));  // 0 이하로 내려가지 않도록 설정
      }, 1000);  // 1초마다 호출

      // 60초 후 자동 종료 타이머 설정
      timeoutRef.current = setTimeout(() => {
        stopRecording();  // 60초 후 자동으로 녹화를 중지
      }, 60000);
    }).catch((error) => console.error('Error accessing microphone:', error));

    //오디오 녹화
    navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: selectedAudioDevice?.deviceId,
        sampleRate: 16000,
      }
    }).then((stream) => {
      audioRecorderRef.current = new MediaRecorder(stream, {mimeType: 'audio/webm;codecs=opus'});
      audioRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      audioRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        audioBlob.current = blob;
        audioChunks.current = [];
      };

      audioRecorderRef.current.start();
      setIsRecording(true);

      // 1초마다 녹화 시간 업데이트
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));  // 0 이하로 내려가지 않도록 설정
      }, 1000);  // 1초마다 호출

      // 60초 후 자동 종료 타이머 설정
      timeoutRef.current = setTimeout(() => {
        stopRecording();  // 60초 후 자동으로 녹화를 중지
      }, 60000);
    }).catch((error) => console.error('Error accessing microphone:', error));
  };

  // 녹화 수동 중지 함수
  const stopRecording = () => {
    if (!isRecording) return;  // 이미 녹화가 중지된 상태면 중지하지 않음

    // 비디오 및 오디오 녹화 중지
    videoRecorderRef.current?.stop();
    audioRecorderRef.current?.stop();

    // 타이머 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);  // 자동 종료 타이머 제거
      timeoutRef.current = null;
    }

    // 타이머 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);  // 1초마다 시간 업데이트 타이머 정리
      intervalRef.current = null;
    }

    setIsRecording(false);  // 녹화 상태를 중지로 설정
  };

  const handleButtonClick = async () => {
    if (recordingStatus === "녹화하기") {
      accumulatedTranscriptRef.current = ''; // 누적된 자막 초기화
      startSpeechRecognition(); //음성인식 시작
      startRecording(); //녹화, 녹음 시작
      setRecordingStatus("녹화 중지"); //버튼 문구 바꾸기
    } else if (recordingStatus === "녹화 중지") {
      recognitionRef.current.stop();
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
      navigate(`/resultFinalPage/${productboardId}`);
    }
  };

  //음성인식
  const startSpeechRecognition = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ko-KR';

      recognitionRef.current.onresult = handleResult;
      recognitionRef.current.onerror = handleError;
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
      };
    }

    recognitionRef.current.start();
    setTranscript(''); // 음성 인식 시작 시 트랜스크립트 초기화

    // 60초 후 음성 인식 종료
    setTimeout(() => {
      recognitionRef.current.stop();
    }, 60000);
  };

  const handleResult = (event) => {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    accumulatedTranscriptRef.current += finalTranscript;
    setTranscript(accumulatedTranscriptRef.current + interimTranscript);
  };

  const handleError = (event) => {
    console.error('Speech recognition error', event.error);
  };


  //녹화, 녹음 파일 파이썬 서버에 보내기 + 결과 받아서 데이터베이스에 저장하기
  const uploadVideo = async (videoType) => {
    //비디오 녹화 파일
    const videoFile = new File([videoBlob.current], 'recordedVideo.mp4', { type: 'video/mp4' });
    console.log('비디오 파일:', videoFile);
    const formDataForVideo = new FormData();
    formDataForVideo.append('file', videoFile);

    //오디오 녹화 파일
    const audioFile = new File([audioBlob.current], 'audio222.webm', { type: 'audio/webm' });
    console.log('오디오 파일:', audioFile);
    const formDataForAudio = new FormData();
    formDataForAudio.append('voice', audioFile);
    formDataForAudio.append('text', transcript); //정답 텍스트를 테스트 하는 사람이 입력해줘야함
    formDataForAudio.append('gender', memberInfo.gender == 'male' ? '0' : '1'); //사용자 성별
    formDataForAudio.append('isVoiceTest', '0'); //영상테스트시 0으로, 발음테스트시 1로 하면 됨

    /* 음성 다운 
    console.log(audioBlob.current);
    const url = window.URL.createObjectURL(audioBlob.current);
    // a 태그를 생성하여 다운로드 실행
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'audio2.webm'; // 다운로드할 파일명 설정
    document.body.appendChild(a);
    a.click(); // 클릭 이벤트 실행 (다운로드 시작)
    // 다운로드 후 태그와 URL 해제
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // 메모리 해제
    */

    try {
      const videoResponse = await videoFace(formDataForVideo);
      const audioResponse = await evaluateVoiceAndText(formDataForAudio);
      if (videoResponse.success && audioResponse.success) {
        const resultVideoData = videoResponse.data; //영상 분석 결과
        console.log('resultVideoData:', resultVideoData);
        const resultAudioData = audioResponse.data; //음성 분석 결과
        console.log('resultAudioData:', resultAudioData);

        //문장 내 단어와 빈도수(콤마로 구분)
        const wordlist = resultAudioData.text_analysis.word_list;
        console.log(wordlist);
        let text = "";
        let weight = "";
        if (wordlist) {
          for (let word of wordlist) {
            text = text + "," + word.text;
            weight = weight + "," + word.weight;
          }
        }

        //불필요한 단어와 빈도수(콤마로 구분)
        const fillerWordList = resultAudioData.text_analysis.fillerwords;
        let fillerWords = "";
        let fillerWeights = "";
        if (wordlist) {
          for (let fillerWord of fillerWordList) {
            fillerWords = fillerWords + "," + fillerWord.text;
            fillerWeights = fillerWeights + "," + fillerWord.weight;
          }
        }

        const evaluationResponse = await createEvaluation({
          score: 50,
          fillerwords: fillerWords,
          fillerweights: fillerWeights,
          formal_speak: resultAudioData.text_analysis.speak_end.formal_speak,
          question_speak: resultAudioData.text_analysis.speak_end.question_speak,
          text: text,
          weight: weight,

          tone: resultAudioData.voice_tone.voice_check,
          speed: resultAudioData.speed_result.phonemes_per_min,
          pronunciation: resultAudioData.pronunciation_precision.pronunciation_accuracy,

          cheek: resultVideoData.graphs.cheekbones_graph,
          mouth: resultVideoData.graphs.mouth_graph,
          brow: resultVideoData.graphs.brow_graph,
          eye: resultVideoData.eye.average_blinks,
          nasolabial: resultVideoData.graphs.nasolabial_folds_graph,
          commentEye: resultVideoData.eye.comment,
          commentsFace: resultVideoData.expression_comment,
        }, memberId, productboardId);

        console.log('evaluationResponse:', evaluationResponse);
        setLoadingMessage(""); // 모달 메시지 제거

        // 두 개의 결과를 배열로 전달
        const previousResult = localStorage.getItem("previousResult")
          ? JSON.parse(localStorage.getItem("previousResult"))
          : [];

        const allResults = [...previousResult, resultVideoData]; // 결과를 배열에 추가

        localStorage.setItem("previousResult", JSON.stringify(allResults)); // 두 번째 결과 저장
        console.log('allResults: ', allResults);

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

  // 입력 변경 핸들러
  const handleChange = (e) => {
    setTranscript(e.target.value);
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
          <textarea
            className="form-control"
            value={transcript}
            onChange={handleChange}
            placeholder=" 여기에 자막이 표시됩니다. 
                      오타 났거나 말하는 것과 일치하지 않은 경우 내용을 수정해주세요."
            rows="5"

          />
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
        {/*
        <Button variant="contained" color="primary" onClick={uploadVideo} className={styles.controlButton                                                                                                                                                                                                                                                               }>
          {'보내기'}
        </Button>
         */}
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
