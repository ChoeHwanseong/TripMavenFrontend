import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import styles from "../../../styles/aiservicepage/Result/ResultFinalPage.module.css";
import MovieIcon from '@mui/icons-material/Movie'; 
import MicIcon from '@mui/icons-material/Mic';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 
import { useNavigate, useParams } from "react-router-dom";
import { resultGetByProductId } from "../../../utils/AiData";

const ResultFinalPage = () => {


  const productboardId  = useParams().id;
  const navigate = useNavigate(); 

  const [result, setResult] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      
        const data = await resultGetByProductId(productboardId);
        console.log('data: ',data);
        setResult(data);

    };

    getResults();

  }, [productboardId]);


  const handleGoToFirstPage = () => {
    console.log('handleGoToFirstPage의 result: ',result);
    // navigate 함수를 이용해 데이터를 state로 전달
    navigate(`/resultFirstPage/${productboardId}`, {
      state: {result},
    });
  };



  return (
    <div className={styles.container}>
      <div className={styles.mainResult}>
        {/* 종합 결과 */}
        <Box className={styles.titleContainer}>
          <Typography variant="h6" className={styles.title}>
            종합 결과
          </Typography>
        </Box>

        <div className={styles.resultSection}>
          {/* 영상 분석 결과 */}
          <Box className={styles.resultBox}>
            <Typography variant="h6" align="center" className={styles.resultTitle}>
            <MovieIcon className={styles.icon} />  영상 분석 결과
            </Typography>
            <Box className={styles.resultText}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>
          </Box>

          {/* 음성 분석 결과 */}
          <Box className={styles.resultBox}>
            <Typography variant="h6" align="center" className={styles.resultTitle}>
            <MicIcon className={styles.icon} />  음성 분석 결과
            </Typography>
            <Box className={styles.resultText}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>
          </Box>
        </div>

        <div className={styles.keywordSection}>
          {/* 획득한 키워드 */}
          <Box className={styles.resultBox}>
            <Typography variant="h6" align="center" className={styles.resultTitleKeyword}>
            <EmojiEventsIcon className={styles.icon} />  획득한 키워드
            </Typography>
            <Box className={styles.resultTextKeyword}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>

            <button className={styles.keywordButton}>
            키워드 자세히 보기 &gt;&gt;
          </button>
          </Box>

        </div>
      </div>

      {/* 첫 번째 테스트 결과 */}
      <div className={styles.testResult}>
        <Box className={styles.testBox}>
          <Typography variant="h6" align="center" className={styles.testTitle}>
            첫 번째 테스트 결과
          </Typography>
          <Box className={styles.resultContent}>
            <Typography align="center" className={styles.resultTitle}>
            <MovieIcon className={styles.icon} />    영상 분석 결과 요약
            </Typography>
            <Box className={styles.resultText}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>
          </Box>
          <Box className={styles.resultContent}>
            <Typography align="center" className={styles.resultTitle}>
            <MicIcon className={styles.icon} />  음성 분석 결과 요약
            </Typography>
            <Box className={styles.resultText}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>
          </Box>
          <Button variant="contained" className={styles.detailButton}
           onClick={handleGoToFirstPage}>
            첫 번째 테스트 결과 자세히 보기 &gt;&gt;
          </Button>
        </Box>

        {/* 두 번째 테스트 결과 */}
        <Box className={styles.testBox}>
          <Typography variant="h6" align="center" className={styles.testTitle}>
            두 번째 테스트 결과
          </Typography>
          <Box className={styles.resultContent}>
            <Typography align="center" className={styles.resultTitle}>
            <MovieIcon className={styles.icon} />    영상 분석 결과 요약
            </Typography>
            <Box className={styles.resultText}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>
          </Box>
          <Box className={styles.resultContent}>
            <Typography align="center" className={styles.resultTitle}>
            <MicIcon className={styles.icon} />  음성 분석 결과 요약
            </Typography>
            <Box className={styles.resultText}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>
          </Box>
          <Button variant="contained" className={styles.detailButton}>
            두 번째 테스트 결과 자세히 보기 &gt;&gt;
          </Button>
        </Box>
      </div>
          <button className={styles.button}>
            마이페이지로 이동 &gt;&gt;
          </button>
    </div>
  );
};

export default ResultFinalPage;
