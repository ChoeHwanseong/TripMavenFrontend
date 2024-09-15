import React, { useContext } from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';
import { evaluatePronunciation, evaluateVoiceAndText } from '../../utils/PythonServerAPI';
import { TemplateContext } from '../../context/TemplateContext';
import { Typography,Box } from '@mui/material';

//이것도 화면 아니면 오디오 구현
function Player({ mediaBlob, audio }) {
  if (!mediaBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(mediaBlob)} controls />;
  }

  return (
    <video
      src={URL.createObjectURL(mediaBlob)}
      width={520}
      height={480}
      controls
    />
  );
}


//화면 구현
function LiveStreamPreview({ stream }) {
  let videoPreviewRef = React.useRef();

  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return <video ref={videoPreviewRef} width={520} height={480} autoPlay />;
}



export default function ScreenRecorderApp() {
  const recognitionRef = React.useRef(null); // SpeechRecognition 인스턴스 참조
  const accumulatedTranscriptRef = React.useRef(''); // 모든 최종 자막을 저장하는 참조
  let recognitionTimeoutRef = React.useRef(null); // 타임아웃 참조

  const { memberInfo } = useContext(TemplateContext);
  const [transcript, setTranscript] = React.useState(''); // 자막 상태
  const [isRecording, setIsRecording] = React.useState(false);
  const [isRecognitionDone, setIsRecognitionDone] = React.useState(false); // 음성 인식 완료 여부
  const [timer, setTimer] = React.useState(10); // 10초 타이머 초기

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition; // ref로 인스턴스 참조
    recognition.lang = 'ko-KR'; // 한국어 설정
    recognition.interimResults = false; // 중간 결과를 무시
    recognition.continuous = true; // 음성 인식 유지용

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
    setIsRecording(true);

    // 10초 후 음성 인식 자동 종료
    recognitionTimeoutRef.current = setTimeout(() => {
      stopSpeechRecognition();
    }, 10000); 
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // 음성 인식 종료
      setIsRecording(false); // 녹음 중이 아님
      setIsRecognitionDone(true); // 음성 인식 완료
    }
    if (recognitionTimeoutRef.current) {
      clearTimeout(recognitionTimeoutRef.current); // 타임아웃 취소
    }
  };


  let {
    error,
    status,

    mediaBlob,
    liveStream,
    getMediaStream,

    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording

  } = useMediaRecorder({
    recordScreen: false, //스크린 ㄴㄴ
    blobOptions: { type: 'audio/wav' }, //wav타입 블롭으로
    mediaStreamConstraints: { audio: true, video: false } //오디오만 
  });

  //블롭 객체를 파일로 변환
  const convertBlobToFile = (blob, fileName) => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  const handleClick = async () => {
    //음성 인식할 시간 기다려 주기
    const wavFile = convertBlobToFile(mediaBlob, 'output.wav'); //wav 파일로 변환
    console.log('녹음한 파일 wav로 변환:', wavFile);
    console.log('input으로 선택한 파일:', selectedFile);


    const formDataForPron = new FormData();
    formDataForPron.append('voice', wavFile);
    formDataForPron.append('text', '쉬는시간');

    const formDataForVoiceAndText = new FormData();
    formDataForVoiceAndText.append('voice', wavFile);
    formDataForVoiceAndText.append('text', '쉬는시간'); //텍스트 데이터에 영어 노노. 한국어 분석이라 오류남
    formDataForVoiceAndText.append('gender', memberInfo.gender == 'male' ? '0' : '1');

    const pronResponse = await evaluatePronunciation(formDataForPron);
    const VoiceAndTextResponse = await evaluateVoiceAndText(formDataForVoiceAndText);

    console.log('pronResponse:', pronResponse);
    console.log('VoiceAndTextResponse', VoiceAndTextResponse);
  };

  //테스트용으로 파일 받아서 보내봤는데 잘되네... 녹음하는건 뭐가 문제냐
  const [selectedFile, setSelectedFile] = React.useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);  // 여러 파일을 선택할 수 있으면 files 배열 사용
  };

  return (
    <article style={{ marginLeft: '30px' }}>
      <h1>음성 녹화</h1>
      <h4>{error ? `${status} ${error.message}` : status}</h4>
      <input type="file" onChange={handleFileChange} />
      <LiveStreamPreview stream={liveStream} />
      <Player mediaBlob={mediaBlob} />
      
      <section>
        <button
          type="button"
          onClick={getMediaStream}
          disabled={status === 'ready'}
        >
          Share screen
        </button>
        <button
          type="button"
          onClick={() => { startRecording(); startSpeechRecognition(); }}
          disabled={status === 'recording'}
        >
          Start recording
        </button>
        <button
          type="button"
          onClick={() => { stopRecording(); stopSpeechRecognition(); }}
          disabled={status !== 'recording'}
        >
          Stop recording
        </button>
      </section>

      <section style={{ marginTop: '30px' }}>
        <button
          type="button"
          onClick={handleClick}
          disabled={status === 'recording'}
        >
          보내기
        </button>
      </section>

      <Box
        sx={{
          width: '500px', height: 370,
          bgcolor: '#F8F8F8', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          border: '1px solid #000000', borderRadius: '5px',
          flexDirection: 'column', textAlign: 'center',
          position: 'relative'
        }}
      >
        {transcript && isRecognitionDone ? (
          // 음성 인식이 끝났고 자막이 있을 때 자막 유지
          <>
            <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
              {transcript} {/* 음성 인식 결과 표시 */}
            </Typography>
          </>
        ) : (
          isRecording ? (
            <>
              <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>

                {transcript || "음성을 인식 중입니다..."}<br /> {/* 실시간 음성 인식 결과 표시 */}
              </Typography>
              <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                남은 시간: {timer}초 {/* 타이머 표시 */}
              </Typography>
            </>
          ) : (
            <>
              <img
                src='../../images/speakIcon.png'
                alt='speak Icon'
                style={{
                  top: '40px',
                  left: '40px'
                }}
              />
            </>
          )
        )}

      </Box>
    </article>
  );
}
