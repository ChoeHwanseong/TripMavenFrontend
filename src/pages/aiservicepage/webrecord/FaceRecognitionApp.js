import React, { useEffect, useRef, useState } from "react";
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';

function FaceRecognitionApp() {
  const videoRef = useRef(null);
  const [blinkCount, setBlinkCount] = useState(0);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    }

    async function startVideo() {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: {} })
          .then(stream => {
            videoRef.current.srcObject = stream;
          });
      }
    }

    async function detectFaceData() {
      const video = videoRef.current;
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 0) {
        const detection = detections[0];
        const expressions = detection.expressions;

        // POST 요청으로 FastAPI에 데이터 전송
        const faceData = {
          expressions: expressions,
          blinkCount: blinkCount
        };

        await axios.post('http://localhost:8000/analyze', faceData);
      }
    }

    loadModels().then(() => startVideo());
    const intervalId = setInterval(detectFaceData, 1000);

    return () => clearInterval(intervalId);
  }, [blinkCount]);

  // Oracle DB에서 분석 결과를 가져오는 함수
  const fetchGraphData = async () => {
    const response = await axios.get('http://localhost:8080/api/face-analysis/results');
    setGraphData(response.data);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
      <button onClick={fetchGraphData}>결과 가져오기</button>
      {graphData && (
        <Chart
          type="line"
          data={graphData}
        />
      )}
    </div>
  );
}

export default FaceRecognitionApp;