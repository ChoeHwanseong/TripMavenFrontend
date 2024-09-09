import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/aiservicepage/PronunciationTest.module.css'
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';


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
        <div className={styles.container}>
            <h4 className={styles.title}>발음 테스트</h4>
            <img src="../../images/WebTestPageLine.png" alt="Line Image" className={styles.lineImage} />
            <h5 className={styles.subtitle}>버튼을 누르고 아래에 있는 문장을 읽으세요</h5>
            <div className={styles.gridContainer}>
                <div className={styles.contentBox}>
                    <img src='../../images/speakIcon.png' alt='speak Icon' className={styles.speakIcon} />
                    <div className={styles.textContent}>
                        -분당 운중동 한국학중앙연구원<br /><br />
                        -신분당선 환승역과 신논현역 사이<br /><br />
                        -점검 전담반실과 검거 전담반실 점거 뒤 이뤄진 위법사항 점검<br /><br />
                        -유관 기관과의 관련 문의 협의 완료 중인 국회법제사법위원회<br /><br />
                        -스웨덴 왕립과학원 노벨위원회<br /><br />
                        -역대 최연소 30세 307일만에 2만 5000득점을 기록
                    </div>
                </div>
            </div>
            <div className={styles.selectContainer}>
                <Select
                    value={selectedAudioDevice?.deviceId || ''}
                    displayEmpty
                    onChange={(e) => setSelectedAudioDevice(audioDevices.find((d) => d.deviceId === e.target.value))}
                    sx={{ width: '500px' }}
                >
                    <MenuItem value="">마이크를 선택하세요</MenuItem>
                    {audioDevices.map((device) => (
                        <MenuItem key={device.deviceId} value={device.deviceId}>
                            {device.label}
                        </MenuItem>
                    ))}
                </Select>
                <div>
                    <button className={styles.resultButton}>발음 테스트 결과 보기</button>
                </div>
            </div>
            <p className={styles.instruction}>버튼을 눌러 녹음을 완료 하세요!</p>
            <div className={styles.buttonContainer}>
                <button className={styles.recordButton} onClick={handleStartRecording}>
                    <img src='../../images/micIcon.png' alt="MicIcon" className={styles.micIcon} />
                </button>
            </div>
        </div>
    );
};

export default PronunciationTest;
