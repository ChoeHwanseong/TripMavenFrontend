import React, { useState, useEffect, useRef } from 'react'; // useRef를 추가
import { Box, Button, Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const MICTest = () => {
    const [isMicActive, setIsMicActive] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [audioDevices, setAudioDevices] = useState([]);
    const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [timer, setTimer] = useState(10); // 10초 타이머 초기값
    const [micError, setMicError] = useState(false); // 마이크 인식 여부
    const recognitionRef = useRef(null); // SpeechRecognition 인스턴스 참조
    const navigate = useNavigate();

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const audioDevicesList = devices.filter((d) => d.kind === 'audioinput');
                setAudioDevices(audioDevicesList);
                if (audioDevicesList.length > 0) {
                    setSelectedAudioDevice(audioDevicesList[0]);
                } else {
                    setMicError(true); // 마이크가 없는 경우 에러 상태로 설정
                }
            })
            .catch((error) => {
                console.error('Error getting device information:', error);
                setMicError(true); // 장치 정보를 가져오는 데 실패한 경우 에러 상태로 설정
            });
    }, []);

    const handleStartRecording = () => {
        setTranscript(''); // 이전 자막 초기화
        setIsMicActive(true);
        setTimer(10); // 타이머 초기화
        setMicError(false); // 마이크 에러 상태 초기화

        navigator.mediaDevices.getUserMedia({
            audio: { deviceId: selectedAudioDevice?.deviceId }
        })
            .then((stream) => {
                const audioRef = new Audio();
                audioRef.srcObject = stream;
                audioRef.play();
                setIsAudioPlaying(true);

                startSpeechRecognition();
                startTimer(); // 타이머 시작
            })
            .catch((error) => {
                console.error('Error getting user media:', error);
                setMicError(true); // 마이크 접근 실패 시 에러 상태로 설정
            });
    };


    const startSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition; // ref로 인스턴스 참조
        recognition.lang = 'ko-KR'; // 한국어 설정
        recognition.interimResults = false; // 중간 결과를 실시간으로 보여주지 않음
        recognition.continuous = true; // 인식이 한 번만 실행되도록 설정

        recognition.onresult = (event) => {
            const transcriptResult = event.results[0][0].transcript;
            setTranscript(transcriptResult); // 이전 결과를 덮어쓰기
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsMicActive(false);
            recognition.stop();
        };

        recognition.onend = () => {
            if (isMicActive) {
                recognition.start(); // 자동 종료되면 다시 시작
            } else {
                setIsMicActive(false);
                setIsAudioPlaying(false);
            }
        };

        recognition.start();

        // 10초 후 음성 인식 종료
        setTimeout(() => {
            recognition.stop();
        }, 10000); // 10000ms = 10초
    };

    const startTimer = () => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown); // 타이머 종료
                    if (recognitionRef.current) {
                        recognitionRef.current.stop(); // 타이머가 종료될 때 음성 인식 종료
                    }
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000); // 1초마다 타이머 감소
    };

    return (
        <Container sx={{ mt: '20px', width: '1100px' }}>
            <Typography variant="h4" gutterBottom align="left" sx={{ mt: '120px', fontWeight: 'bold' }}>
                장비 테스트
            </Typography>
            <img src="../../images/WebTestPageLine.png" alt="Line Image" />
            <Typography variant="h5" gutterBottom align="center" sx={{ mt: '13px', mb: '13px' }}>
                지금부터 마이크체크를 시작하겠습니다.<br />
                <strong>[마이크체크]</strong> 버튼을 누른 후, <br />10초 이내에 “안녕하세요! 만나서 반갑습니다.”을 소리 내어 읽어주세요.
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
                        {isMicActive ? (
                            <>
                                <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
                                    {transcript || "음성을 인식 중입니다..."} {/* 음성 인식 결과 표시 */}
                                </Typography>
                                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                                    남은 시간: {timer}초 {/* 타이머 표시 */}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <img src='../../images/micImg.png' style={{ width: '180px', height: '180px' }} alt="Mic" />
                                <Box sx={{ mt: 4 }}>
                                    마이크 상태를 사전에 확인해주세요.<br />
                                    (이어폰에 있는 마이크도 사용 가능합니다.)
                                </Box>
                            </>
                        )}
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
            {/* 마이크 인식 여부에 따른 상태 메시지 표시 */}
            <Typography variant="body2" color={isAudioPlaying ? 'success.main' : 'error'} align="left" sx={{ mt: 2, ml: '335px' }}>
                {isAudioPlaying ? '마이크 작동 중' : (micError ? '*인식이 되지 않습니다.' : '')}
            </Typography>
            <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src='../../images/micIcon.png'
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                        alt="MicIcon"
                        onClick={handleStartRecording}
                    />
                </Box>
            </Grid>
            <Typography variant="h7" align="center" display="block" sx={{ mt: 2, color: '#979797' }}>
                ※정확한 측정을 위해 주변 소음을 최소화해 주시기 바랍니다.
            </Typography>
            
            <Stack display="flex" justifyContent="center" direction="row" spacing={3} sx={{ mt: '25px' }}>
                <Button variant="contained" sx={{ backgroundColor: '#0066ff', '&:hover': { backgroundColor: '#0056b3' } }} onClick={()=>{navigate('/pronunciationtest')}}>
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