import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import '../../styles/webrecord/DeviceCheckComponent.module.css'; // CSS 파일을 따로 만들어서 스타일을 관리

const DeviceCheckComponent = () => {
  const webcamRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(60); // 1분 타이머
  const timerIntervalRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // 카메라와 마이크 장치 정보 가져오기
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        setVideoDevices(devices.filter((d) => d.kind === 'videoinput'));
        setAudioDevices(devices.filter((d) => d.kind === 'audioinput'));
        // 기본 카메라와 마이크 선택
        setSelectedVideoDevice(devices.find((d) => d.kind === 'videoinput'));
        setSelectedAudioDevice(devices.find((d) => d.kind === 'audioinput'));
      })
      .catch((error) => {
        console.error('Error getting device information:', error);
      });

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimer(60); // 타이머 초기화

    navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedVideoDevice?.deviceId },
      audio: { deviceId: selectedAudioDevice?.deviceId }
    })
      .then((stream) => {
        webcamRef.current.srcObject = stream;
        audioRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start();

        // 마이크 테스트
        audioRef.current.play();
        setIsAudioPlaying(true);

        timerIntervalRef.current = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      })
      .catch((error) => {
        console.error('Error getting user media:', error);
      });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsAudioPlaying(false);
    mediaRecorderRef.current.stop();
    clearInterval(timerIntervalRef.current);
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'recording.webm');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className='device-check-component'>
      <div className='d-flex justify-content-between'>
        <div className='video-section'>
          <Webcam ref={webcamRef} video={{ deviceId: selectedVideoDevice?.deviceId }} />
          <select className='form-select mt-2' value={selectedVideoDevice?.deviceId || 'default'}
            onChange={(e) => setSelectedVideoDevice(videoDevices.find((d) => d.deviceId === e.target.value))}
          >
            <option key='default' value='default'>
              {'웹캠을 선택하세요'}
            </option>
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

        <div className='audio-section'>
          <audio ref={audioRef} style={{ display: 'none' }} />
          {isAudioPlaying ? (
            <p className='audio-status text-success'>마이크 작동 중</p>
          ) : (
            <p className='audio-status text-danger'>마이크 작동 안됨</p>
          )}
          <select className='form-select mt-2' value={selectedAudioDevice?.deviceId || 'default'}
            onChange={(e) => setSelectedAudioDevice(audioDevices.find((d) => d.deviceId === e.target.value))}
          >
            <option key='default' value='default'>
              {'마이크를 선택하세요'}
            </option>
            {audioDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='controls mt-3'>
        {isRecording ? (
          <button className='btn btn-danger' onClick={handleStopRecording}>녹화 중지</button>
        ) : (
          <button className='btn btn-success' onClick={handleStartRecording}>녹화 시작</button>
        )}
        <p className='timer ms-3'>남은 시간: {timer} 초</p>
        <button className='btn btn-secondary ms-3' onClick={downloadRecording}>영상 다운로드</button>
      </div>
    </div>
  );
};

export default DeviceCheckComponent;
