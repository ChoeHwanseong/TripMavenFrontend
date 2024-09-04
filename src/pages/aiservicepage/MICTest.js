import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { VolumeDown, VolumeUp, PlayArrow, Pause, Replay } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const MICTest = () => {
    const webcamRef = useRef(null);
    const audioRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [timer, setTimer] = useState(60); // 1분 타이머
    const timerIntervalRef = useRef(null);
    const [audioDevices, setAudioDevices] = useState([]); //오디오 리스트
    const [selectedAudioDevice, setSelectedAudioDevice] = useState(null); //선택한 오디오
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [value, setValue] = useState(30);
    const navigate = useNavigate();


    useEffect(() => {
        // 카메라와 마이크 장치 정보 가져오기
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const audioDevicesList = devices.filter((d) => d.kind === 'audioinput');
                setAudioDevices(audioDevicesList);
                if (audioDevicesList.length > 0) {
                    setSelectedAudioDevice(audioDevicesList[0]); // 첫 번째 마이크 장치를 기본으로 선택
                }
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
            audio: { deviceId: selectedAudioDevice?.deviceId }
        })
            .then((stream) => {
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    /*
    const [isRecording, setIsRecording] = useState(false);
    const mediaStreamRef = useRef(null);
    const socketRef = useRef(null);
    const audioContextRef = useRef(null);
    const processorRef = useRef(null);


    useEffect(() => {
        if (isRecording) {
          // 마이크 입력 캡처 시작
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
              mediaStreamRef.current = stream;
    
              // 오디오 컨텍스트 및 프로세서 설정
              audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
              const source = audioContextRef.current.createMediaStreamSource(stream);
              processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
    
              source.connect(processorRef.current);
              processorRef.current.connect(audioContextRef.current.destination);
    
              // 오디오 데이터가 준비되면 호출되는 이벤트 핸들러
              processorRef.current.onaudioprocess = (e) => {
                if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    
                // 오디오 버퍼 데이터를 WebSocket을 통해 전송
                const inputData = e.inputBuffer.getChannelData(0);
                socketRef.current.send(inputData.buffer);
              };
    
              // WebSocket 설정
              socketRef.current = new WebSocket('ws://localhost:8765');
              socketRef.current.onopen = () => console.log('WebSocket connected');
              socketRef.current.onclose = () => console.log('WebSocket disconnected');
              socketRef.current.onerror = (error) => console.error('WebSocket error:', error);
            })
            .catch(err => console.error('Error accessing microphone:', err));
        } else {
          // 녹음 중지 시 리소스 해제
          if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
          }
          if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
          }
          if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
          }
          if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
          }
        }
        }, [isRecording]);
        */

    return (
        <Container sx={{ mt: '20px', width: '1100px' }}>
            <Typography variant="h4" gutterBottom align="left" sx={{ mt: '120px', fontWeight: 'bold' }}>
                장비 테스트
            </Typography>
            <img src="../../images/WebTestPageLine.png" alt="Line Image" />
            <Typography variant="h5" gutterBottom align="center" sx={{ mt: '13px', mb: '13px' }}>
                지금부터 마이크체크를 시작하겠습니다.<br />
                마이크 아이콘을 누른 후, <br />5초 이내에 “안녕하세요! 만나서 반갑습니다.”을 소리 내어 읽어주세요.
            </Typography>
            <Grid container>
                <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
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
                        <img src='../../images/micImg.png' style={{ width: '180px', height: '180px' }} alt="Mic" />
                        <Box sx={{ mt: 4 }}>
                            마이크 상태를 사전에 확인해주세요.<br />
                            (이어폰에 있는 마이크도 사용 가능합니다.)
                        </Box>
                        <Box sx={{ position: 'absolute', bottom: '14px', right: '14px' }}>
                            <img
                                src='../../images/micIcon.png'
                                style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                alt="MicIcon"
                                onClick={handleStartRecording}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <Grid item sx={{ width: '400px' }}>
                    <Select
                        value={selectedAudioDevice?.deviceId || ''}
                        displayEmpty
                        onChange={(e) => setSelectedAudioDevice(audioDevices.find((d) => d.deviceId === e.target.value))}
                        sx={{ width: '400px' }}
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
            <Typography variant="body2" color={isAudioPlaying ? 'success.main' : 'error'} align="left" sx={{ mt: 2, ml: '335px' }}>
                {isAudioPlaying ? '마이크 작동 중' : '*인식이 되지 않습니다.'}
            </Typography>
            <Typography variant="h7" align="center" display="block" sx={{ mt: 5, color: '#979797' }}>
                ※정확한 측정을 위해 주변 소음을 최소화해 주시기 바랍니다.
            </Typography>
            
            <Stack display="flex" justifyContent="center" direction="row" spacing={3} sx={{ mt: '25px' }}>
                <Button variant="contained" sx={{ backgroundColor: '#0066ff', '&:hover': { backgroundColor: '#0056b3' } }}>
                    발음 테스트 바로 가기
                </Button>
                <Button variant="outlined" onClick={() => { navigate('/pronunciationtesttutorial') }}>
                    유의사항 확인
                </Button>
            </Stack>
        </Container >
    );
};

export default MICTest;
