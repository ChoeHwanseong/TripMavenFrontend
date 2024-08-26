import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Box, Button, Container, Grid, MenuItem, Select, Typography } from '@mui/material';

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
    <Container sx={{ mt: '20px', width: '1100px' }}>
      <Typography variant="h4" gutterBottom align="left" sx={{ mt: '120px', fontWeight: 'bold' }}>
        모의 테스트
      </Typography>
      <img src="../../images/WebTestPageLine.png" />
      <Typography variant="h5" gutterBottom align="center" sx={{ mt: '13px', mb: '13px' }}>
        Q: 여행을 하는 중에 컴플레인이 들어 왔을 경우 어떻게 해결을 해야 할까요?
      </Typography>
      <Grid container>
        <Grid item xs={5.4} sx={{ ml: '50px' }}>
          <Webcam
            ref={webcamRef}
            videoConstraints={{ deviceId: selectedVideoDevice?.deviceId }}
            style={{ width: '100%', height: 360, backgroundColor: '#F8F8F8', border: '1px solid #000000', borderRadius: 5 }}
          />
        </Grid>
        <Grid item xs={5.4} sx={{ ml: '50px' }}>
          <Box
            sx={{
              width: '100%',
              height: 360,
              bgcolor: '#F8F8F8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #000000',
              borderRadius: '5px'
            }}
          >
            녹화 영상 미리보기
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="left" alignItems="center" sx={{ mt: 2, ml: '53px' }}>
        <Grid item>
          <Select
            value={selectedVideoDevice?.deviceId || ''}
            displayEmpty
            onChange={(e) => setSelectedVideoDevice(videoDevices.find((d) => d.deviceId === e.target.value))}
            sx={{ width: '215px' }}
          >
            <MenuItem value="">웹캠을 선택하세요</MenuItem>
            {videoDevices.map((device) => (
              <MenuItem key={device.deviceId} value={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select
            value={selectedAudioDevice?.deviceId || ''}
            displayEmpty
            onChange={(e) => setSelectedAudioDevice(audioDevices.find((d) => d.deviceId === e.target.value))}
            sx={{ width: '215px', ml: '10px' }}
          >
            <MenuItem value="">마이크를 선택하세요</MenuItem>
            {audioDevices.map((device) => (
              <MenuItem key={device.deviceId} value={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Typography variant="body2" color={isAudioPlaying ? 'success.main' : 'error'} align="left" sx={{ mt: 1, ml: '63px' }}>
        {isAudioPlaying ? '마이크 작동 중' : '*얼굴 인식이 되지 않습니다.'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2, ml: '70px' }}>
        <Typography variant="body2" sx={{ mr:'240px' }}>
          남은 시간: {timer} 초
        </Typography>
        {isRecording ? (
          <Button variant="contained" color="error" onClick={handleStopRecording} sx={{ backgroundColor: "#0066ff", mt: '-10px' }}>
            녹화 중지
          </Button>
        ) : (
          <Button variant="contained" onClick={handleStartRecording} sx={{ backgroundColor: "#0066ff", mt: '-10px' }}>
            녹화 시작
          </Button>
        )}


      </Box>
      <Typography variant="h7" align="center" display="block" sx={{ mt: 5,color:'#979797' }}>
        ※정확한 측정을 위해 얼굴이 전체적으로 잘 보이도록 하고, 주변 소음을 최소화해 주시기 바랍니다.
      </Typography>
    </Container>
  );
};

export default DeviceCheckComponent;
