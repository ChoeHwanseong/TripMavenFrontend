import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import styles from "../../../styles/aiservicepage/Result/ResultFinalPage.module.css";
import MovieIcon from '@mui/icons-material/Movie';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { resultGetById } from "../../../utils/AiData";
import ResultPageDetail from "./ResultPageDetail";

const ResultFinalPage = () => {

  const location = useLocation();
  const { videoUrls} = location.state || {};

  const memberId = localStorage.getItem('membersId');
  const groupId = useParams().id;
  const navigate = useNavigate();

  const [results, setResults] = useState([]); //영상, 음성 분석 결과
  const [pageNumber, setPageNumber] = useState("0"); //상세 페이지 전환 스테이트

  useEffect(() => {

    console.log('groupId: ', groupId);

    // 그룹id로 결과 2개 가져오기
    const getResults = async () => {

      const data = await resultGetById(groupId);
      console.log('data.productEvaluation: ', data.productEvaluation);
      console.log('data.productEvaluation[0]: ', data.productEvaluation[0]);
      console.log('data.productEvaluation[0]: ', data.productEvaluation[0].member.keywords.split('*'));
      console.log('data.productEvaluation[0]: ', data.productEvaluation[0].commentsFace.split('*')[7]);
      setResults(data);

 
    };

    getResults();

  }, [groupId]);


  const handleGoToFirstPage = () => {
    console.log('handleGoToFirstPage의 result: ', results);
    // navigate 함수를 이용해 데이터를 state로 전달
    /*
    navigate(`/resultFirstPage/${result.productEvaluation[0].id}`, {
      state: {
        result: result.productEvaluation[0],
        videoUrls: videoUrls,
      }
    });
    */
    setPageNumber("1");
  };

  const handleGoToSecondPage = () => {
    console.log('handleGoToSecondPage의 result: ', results);
    // navigate 함수를 이용해 데이터를 state로 전달
    /*
    navigate(`/resultSecondPage/${result.productEvaluation[1].id}`, {
      state: {
        result: result.productEvaluation[1],
        videoUrls: videoUrls,
      }
    });
    */
    setPageNumber("2");
  };



  return <>
  {pageNumber === "0" ? (
    <div className={styles.container}>
      <div className={styles.pageTitle}>실전 테스트 결과</div>
      <div className={styles.mainResult}>
        {/* 종합 결과 */}
        <Box className={styles.titleContainer}>
          <Typography variant="h6" className={styles.title}>종합 결과</Typography>
        </Box>

        <div className={styles.resultSection}>
          {/* 영상 분석 결과 */}
          {results?.productEvaluation?.length > 0 && (
            <Box className={styles.resultBox}>
              <Typography variant="h6" align="center" className={styles.resultTitle}>
                <MovieIcon className={styles.icon} /> 영상 분석 결과
              </Typography>
              <Box className={styles.resultText}>
                {results.productEvaluation[0].commentEye || '눈 분석 결과 없음'}
                <br />
                {results.productEvaluation[0].commentsFace.split('*')[7] || '표정 분석 결과 없음'}
              </Box>
            </Box>
          )}

          {/* 음성 분석 결과 */}
          <Box className={styles.resultBox}>
            <Typography variant="h6" align="center" className={styles.resultTitle}>
              <MicIcon className={styles.icon} /> 음성 분석 결과
            </Typography>
            <Box className={styles.resultText}>
              내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야내용들이갈거야
            </Box>
          </Box>
        </div>

        <Box className={styles.testBoxContainer}>
          <Button variant="contained" className={styles.detailButton} onClick={handleGoToFirstPage}>
            첫 번째 테스트 결과 자세히 보러가기 &gt;&gt;
          </Button>  

            <Button variant="contained" className={styles.detailButton} onClick={handleGoToSecondPage}>
              두 번째 테스트 결과 자세히 보러가기 &gt;&gt;
            </Button>

        </Box>

        <div className={styles.keywordSection}>
          {/* 획득한 키워드 */}
          <Box className={styles.resultBox}>
            <Typography variant="h6" align="center" className={styles.resultTitleKeyword}>
              <EmojiEventsIcon className={styles.icon} /> 획득한 키워드
            </Typography>
            <Box className={styles.resultTextKeyword}>
            {results?.productEvaluation?.[0]?.member?.keywords
            .split('*')
            .map((keyword, index) => (
              <span key={index}>
               <br/> # 
                <span style={{ fontWeight: 'bold', color: 'blue' }}>{keyword.trim()}</span>
              </span>
            ))}
            </Box>
          </Box>

         

        </div>    
      </div>

      <div>
        <button className={styles.button} onClick={() => navigate(`/aipage`)}>
          AI 홈으로 이동 &gt;&gt;
        </button>

        <button className={styles.button} style={{ marginLeft: '30px' }} onClick={() => navigate(`/mypage/guide/aiservice`)}>
          마이페이지로 이동 &gt;&gt;
        </button>
      </div>
    </div>
  ) : (
    <ResultPageDetail
      result={pageNumber === "1" ? results.productEvaluation[0] : results.productEvaluation[1]}
      videoUrls={videoUrls}
      setPageNumber={setPageNumber}
      pageNumber={pageNumber}
    />
  )}
</>



};

export default ResultFinalPage;
