import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import styles from "../../../styles/aiservicepage/Result/ResultFirst.module.css";
import { useLocation } from "react-router-dom";

const ResultFirstPage = () => {
  const location = useLocation(); // useLocation을 사용하여 state를 가져옴
  const firstResult = location.state?.result ? location.state.result[0] : null; // 첫 번째 결과만 가져옴
  
  // 그래프를 저장할 상태 변수
  const [eyeGraph, setEyeGraph] = useState(null);
  const [mouthGraph, setMouthGraph] = useState(null);
  const [cheekbonesGraph, setCheekbonesGraph] = useState(null);
  const [browGraph, setBrowGraph] = useState(null);
  const [nasolabialFoldsGraph, setNasolabialFoldsGraph] = useState(null);

  useEffect(() => {
    if (firstResult) {
      // 각 결과에서 그래프를 추출하여 상태에 저장
      setEyeGraph(`data:image/png;base64,${firstResult.eye}`);
      setMouthGraph(`data:image/png;base64,${firstResult.mouth}`);
      setCheekbonesGraph(`data:image/png;base64,${firstResult.cheek}`);
      setBrowGraph(`data:image/png;base64,${firstResult.brow}`);
      setNasolabialFoldsGraph(`data:image/png;base64,${firstResult.nasolabial}`);
    }
  }, [firstResult]);

  return (
    <div className={styles.mainContainer}>
      <Box className={styles.maintitleContainer}>
        <Typography variant="h6" className={styles.maintitle}>
          <MovieIcon className={styles.icon} /> 영상 분석 결과
        </Typography>
      </Box>

      {firstResult ? (
        <>
          <div className={styles.boxContainer}>
            <Grid container spacing={3}>
              {/* 첫 번째 영상 분석 */}
              <Grid item xs={6}>
                <Box className={`${styles.mainResult} ${styles.sameHeight}`}>
                  <Box className={styles.titleContainer}>
                    <Typography variant="h6" className={styles.title}>
                      영상 분석
                    </Typography>
                  </Box>

                  <Grid container spacing={3} className={styles.analysisGrid}>
                    {/* 총 분석 시간 */}
                    <Grid item xs={6} className={styles.equalHeight}>
                      <Box className={styles.resultBox}>
                        <Typography variant="h6" className={styles.resultTitle}>
                          총 응시 시간
                        </Typography>
                        <Typography variant="h5" className={styles.timeText}>
                          17분 48초
                        </Typography>
                      </Box>
                    </Grid>

                    {/* 눈 깜빡임 횟수 */}
                    <Grid item xs={6} className={styles.equalHeight}>
                      <Box className={styles.resultBox}>
                        <Typography variant="h6" className={styles.resultTitle}>
                          눈 깜빡임 횟수
                        </Typography>
                        <Typography className={styles.resultText}>총 56회</Typography>
                        <Typography className={styles.subText}>
                          *시간은 최대 1분으로 측정되었습니다.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* 두 번째 섹션: 영상 다시보기 */}
              <Grid item xs={6}>
                <Box className={`${styles.mainResult} ${styles.sameHeight}`}>
                  <Box className={styles.titleContainer}>
                    <Typography variant="h6" className={styles.title}>
                      영상 다시보기
                    </Typography>
                  </Box>

                  <Grid container spacing={3} className={styles.analysisGrid}>
                    <Grid item xs={12}>
                      <Box className={styles.resultBox}>
                        <Typography className={styles.subText}>
                          *해당 페이지를 벗어나시면 추후 시청이 불가합니다.
                        </Typography>

                        <Box className={styles.videoPlayerContainer}>
                          <video controls className={styles.videoPlayer}>
                            {/* <source src="your-video-file.mp4" type="video/mp4" /> */}
                            브라우저가 비디오 태그를 지원하지 않습니다.
                          </video>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            {/* 비디오 코멘트 */}
            <Grid item xs={12}>
              <Box className={styles.mainResultSummary}>
                <Box className={styles.resultSummaryBox}>
                  <Typography variant="h6" className={styles.resultTitle}>
                    <LeaderboardIcon className={styles.icon} /> Video Comment
                  </Typography>
                  <Typography className={styles.resultText}>
                    분석된 비디오에 대한 요약 내용이 여기에 표시됩니다.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </div>

          <div className={styles.boxContainer}>
            {/* 표정 분석 */}
            <Box className={styles.chartSection}>
              <Box className={`${styles.mainResult} ${styles.sameHeight}`}>
                <Typography variant="h6" className={styles.chartTitle}>
                  표정 분석
                </Typography>

                <Grid container spacing={3} className={styles.chartGrid}>
                  {/* 입 주변 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.chartBox}>
                      <Typography className={styles.chartLabel}>입 주변 변화율</Typography>
                      {mouthGraph && <img src={mouthGraph} alt="Mouth Movement Graph" className={styles.chartImage} />}
                    </Box>
                  </Grid>

                  {/* 광대 주변 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.chartBox}>
                      <Typography className={styles.chartLabel}>광대 주변 변화율</Typography>
                      {cheekbonesGraph && <img src={cheekbonesGraph} alt="Cheekbones Movement Graph" className={styles.chartImage} />}
                    </Box>
                  </Grid>

                  {/* 미간 주름 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.chartBox}>
                      <Typography className={styles.chartLabel}>미간 주름 변화율</Typography>
                      {browGraph && <img src={browGraph} alt="Brow Movement Graph" className={styles.chartImage} />}
                    </Box>
                  </Grid>

                  {/* 팔자 주름 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.chartBox}>
                      <Typography className={styles.chartLabel}>팔자 주름 변화율</Typography>
                      {nasolabialFoldsGraph && <img src={nasolabialFoldsGraph} alt="Nasolabial Folds Movement Graph" className={styles.chartImage} />}
                    </Box>
                  </Grid>
                </Grid>

                {/* 표정 분석 결과 요약 */}
                <Grid item xs={12}>
                  <Box className={styles.mainResultSummary}>
                    <Box className={styles.resultSummaryBox}>
                      <Typography variant="h6" className={styles.resultTitle}>
                        <EmojiEmotionsIcon className={styles.icon} /> Face Comment
                      </Typography>
                      <Typography className={styles.resultText}>
                        표정 분석 결과 요약이 여기에 표시됩니다.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </div>
        </>
      ) : (
        <Typography>결과를 불러오는 중입니다...</Typography>
      )}
    </div>
  );
};

export default ResultFirstPage;
