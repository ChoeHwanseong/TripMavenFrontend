import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PronunciationTest = () => {
    const audioRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [timer, setTimer] = useState(60); // 1분 타이머
    const timerIntervalRef = useRef(null);
    const [audioDevices, setAudioDevices] = useState([]);
    const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                setAudioDevices(devices.filter((d) => d.kind === 'audioinput'));
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
        setTimer(60);

        navigator.mediaDevices.getUserMedia({
            audio: { deviceId: selectedAudioDevice?.deviceId }
        })
            .then((stream) => {
                audioRef.current.srcObject = stream;
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
                mediaRecorderRef.current.start();

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
        navigate('/analysisresult');
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data]);
        }
    };

    return (
        <Container sx={{ mt: '20px', width: '1100px' }}>
            <Typography variant="h4" gutterBottom align="left" sx={{ mt: '120px', fontWeight: 'bold' }}>
                발음 테스트
            </Typography>
            <img src="../../images/WebTestPageLine.png" alt="Line Image" />
            <Typography variant="h5" gutterBottom align="center" sx={{ mt: '13px', mb: '13px' }}>
                버튼을 누르고 아래에 있는 문장을 읽으세요
            </Typography>
            <Grid container>
                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', ml:'23px' }}>
                    <Box
                        sx={{
                            width: '1150px', height: '400px',
                            bgcolor: '#F8F8F8', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            border: '1px solid #000000', borderRadius: '5px',
                            flexDirection: 'column', textAlign: 'center',
                            position: 'relative'
                        }}
                    >
                        <img
                            src='../../images/speakIcon.png'
                            alt='speak Icon'
                            style={{
                                position: 'absolute',
                                top: '40px',
                                left: '40px'
                            }}
                        />
                        <Box sx={{ mt: 3, fontSize: '20px', textAlign: 'left', mb: 3,ml:'-300px' }}>
                            -분당 운중동 한국학중앙연구원<br />
                            <br />
                            -신분당선 환승역과 신논현역 사이<br />
                            <br />
                            -점검 전담반실과 검거 전담반실 점거 뒤 이뤄진 위법사항 점검<br />
                            <br />
                            -유관 기관과의 관련 문의 협의 완료 중인 국회법제사법위원회<br />
                            <br />
                            -스웨덴 왕립과학원 노벨위원회<br />
                            <br />
                            -역대 최연소 30세 307일만에 2만 5000득점을 기록
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="left" sx={{ mt: 2, ml: '145px' }}>
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
            <Typography variant="body2" color={isAudioPlaying ? 'success.main' : 'error'} align="left" sx={{ mt: 2, ml: '150px', mb: '20px' }}>
                {isAudioPlaying ? '마이크 작동 중' : '*인식이 되지 않습니다.'}
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '30px', color: '#979797', fontSize: '16px' }}>
                버튼을 눌러 녹음을 완료 하세요!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ border: 'none', background: 'none' }} onClick={handleStartRecording}>
                    <img src='../../images/micIcon.png' style={{ width: '80px', height: '80px' }} alt="MicIcon" />
                </button>
            </Box>
        </Container>
    );
};

export default PronunciationTest;
