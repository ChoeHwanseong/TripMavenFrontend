import React, { useContext } from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';
import { evaluatePronunciation, evaluateVoiceAndText } from '../../utils/PythonServerAPI';
import { TemplateContext } from '../../context/TemplateContext';
import { Typography } from '@mui/material';

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
  const {memberInfo} = useContext(TemplateContext);
  const recognitionRef = React.useRef(null); // SpeechRecognition 인스턴스 참조
  const accumulatedTranscriptRef = React.useRef(''); // 모든 최종 자막을 저장하는 참조
  const [transcript, setTranscript] = React.useState(''); // 자막 상태
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const [isRecognitionDone, setIsRecognitionDone] = React.useState(false); // 음성 인식 완료 여부
  
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

    // 10초 후 음성 인식 종료
    setTimeout(() => {
        recognition.stop();
        setIsAudioPlaying(false); // 음성 인식 중이 아님
        setIsRecognitionDone(true); // 음성 인식이 완료됨
        
    }, 10000); // 10000ms = 10초
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
    recordScreen: false,
    blobOptions: { type: 'audio/wav' },
    mediaStreamConstraints: { audio: true, video: true }
  });

  const convertBlobToFile = (blob, fileName) => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  const handleClick = async ()=>{
    const wavFile = convertBlobToFile(mediaBlob, 'output.wav');
    console.log(wavFile);

    const formDataForPron = new FormData();
    formDataForPron.append('voice', wavFile);
    formDataForPron.append('text', 'transcript');

    const formDataForVoiceAndText = new FormData();
    formDataForVoiceAndText.append('voice',wavFile);
    formDataForVoiceAndText.append('text', 'transcript');//텍스트 데이터
    formDataForVoiceAndText.append('gender', memberInfo.gender=='male'?0:1);

    const pronResponse = await evaluatePronunciation(formDataForPron);
    const VoiceAndTextResponse = await evaluateVoiceAndText(formDataForVoiceAndText);

    console.log(pronResponse);
    console.log(VoiceAndTextResponse);
  };



  return (
    <article style={{marginLeft:'30px'}}>
        <h1>Screen recorder</h1>
        <LiveStreamPreview stream={liveStream} />

        <Player mediaBlob={mediaBlob} />


        {error ? `${status} ${error.message}` : status}
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
            onClick={()=>{startRecording(); startSpeechRecognition();}}
            disabled={status === 'recording'}
            >
            Start recording
            </button>
            <button
            type="button"
            onClick={stopRecording}
            disabled={status !== 'recording'}
            >
            Stop recording
            </button>
        </section>
        
        <section style={{marginTop:'30px'}}>
          <button
          type="button"
          onClick={handleClick}
          disabled={status === 'recording'}
          >
          보내기
          </button>
        </section>

        <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
          {transcript} {/* 음성 인식 결과 표시 */}
        </Typography>
    </article>
  );
}
