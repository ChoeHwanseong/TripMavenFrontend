import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Modal } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import styles from "../../../styles/aiservicepage/Result/ResultFirst.module.css";
import { useLocation } from "react-router-dom";

const ResultFirstPage = () => {
  const location = useLocation(); // useLocation을 사용하여 state를 가져옴
  const firstResult = location.state?.responses ? location.state.responses[0] : null; // 첫 번째 결과만 가져옴

  const { videoUrls, videoDuration } = location.state || {};


  // 그래프를 저장할 상태 변수
  const [eyeGraph, setEyeGraph] = useState(null);
  const [mouthGraph, setMouthGraph] = useState(null);
  const [cheekbonesGraph, setCheekbonesGraph] = useState(null);
  const [browGraph, setBrowGraph] = useState(null);
  const [nasolabialFoldsGraph, setNasolabialFoldsGraph] = useState(null);

  // 그래프 이미지 확대용 모달
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 모달 열기
  const handleOpen = (imgSrc) => {
    setSelectedImage(imgSrc);
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => setOpen(false);

  useEffect(() => {

    console.log('상세프랍스 내려온 videoUrl: ',videoUrls);
    console.log('상세 프랍스 내려온 videoDuration: ',videoDuration);
    console.log('ResultFirstPage에서 가져온 firstResult: ',firstResult);

    if (firstResult) {
      // 각 결과에서 그래프를 추출하여 상태에 저장
      setMouthGraph(`data:image/png;base64,${firstResult.graphs.mouth_graph}`);
      setCheekbonesGraph(`data:image/png;base64,${firstResult.graphs.cheekbones_graph}`);
      setBrowGraph(`data:image/png;base64,${firstResult.graphs.brow_graph}`);
      setNasolabialFoldsGraph(`data:image/png;base64,${firstResult.graphs.nasolabial_folds_graph}`);
    }
  }, [firstResult]);

  return <>
 <div className={styles.container}>
<div className={styles.pageTitle}>
    실전 첫번째 테스트 결과
    </div>

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
                    <Typography variant="h6" className={styles.chartTitle}>
                      영상 분석
                    </Typography>
                  </Box>

                  <Grid container spacing={3} className={styles.chartGrid}>
                    {/* 총 분석 시간 */}
                    <Grid item xs={6} className={styles.equalHeight}>
                      <Box className={styles.chartBox}>
                        <Typography variant="h6" className={styles.chartLabel}>
                          총 응시 시간
                        </Typography>
                        <Typography variant="h5" className={styles.timeText} component="span">
                          {Math.floor(videoDuration % 60)}
                        </Typography>
                        <Typography variant="h5" className={styles.resultText} component="span">
                          &nbsp;초
                        </Typography>
                      </Box>
                    </Grid>

                    {/* 눈 깜빡임 횟수 */}
                    <Grid item xs={6}>
                      <Box className={styles.chartBox}>
                        <Typography variant="h6" className={styles.chartLabel}>
                          눈 깜빡임 횟수
                        </Typography>
                        <Typography className={styles.resultText} component="span">총&nbsp;</Typography>
                        <Typography className={styles.timeText} component="span">{firstResult.eye.average_blinks}</Typography>
                        <Typography className={styles.resultText} component="span">&nbsp;회</Typography>
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
                    <Typography variant="h6" className={styles.chartTitle}>
                      영상 다시보기
                    </Typography>
                  </Box>

                  <Grid container spacing={3} className={styles.chartGrid}>
                    <Grid item xs={12}>
                      <Box className={styles.chartBox}>
                        <Typography className={styles.subText}>
                          *해당 페이지를 벗어나시면 추후 시청이 불가합니다.
                        </Typography>

                      {videoUrls && videoUrls.length > 0 && (
                        <Box className={styles.videoPlayerContainer}>
                          <video controls className={styles.videoPlayer}>
                            <source src={videoUrls[0]} type="video/mp4" />
                            브라우저가 비디오 태그를 지원하지 않습니다.
                          </video>
                        </Box>
                      )}
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
                      {mouthGraph && 
                      <img
                        src={mouthGraph}
                        alt="Mouth Movement Graph"
                        className={styles.chartImage}
                        onClick={()=>handleOpen(mouthGraph)}
                        style={{ cursor: 'pointer' }}
                        />
                      }
                    </Box>
                  </Grid>

                  {/* 광대 주변 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.chartBox}>
                      <Typography className={styles.chartLabel}>광대 주변 변화율</Typography>
                      {cheekbonesGraph &&
                      <img
                        src={cheekbonesGraph}
                        alt="Cheekbones Movement Graph"
                        className={styles.chartImage}
                        onClick={()=>handleOpen(cheekbonesGraph)}
                        style={{ cursor: 'pointer' }}
                      />}
                    </Box>
                  </Grid>

                  {/* 미간 주름 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.chartBox}>
                      <Typography className={styles.chartLabel}>미간 주름 변화율</Typography>
                      {browGraph &&
                      <img
                        src={browGraph}
                        alt="Brow Movement Graph"
                        className={styles.chartImage}
                        onClick={()=>handleOpen(browGraph)}
                        style={{ cursor: 'pointer' }}
                      />}
                    </Box>
                  </Grid>

                  {/* 팔자 주름 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.chartBox}>
                      <Typography className={styles.chartLabel}>팔자 주름 변화율</Typography>
                      {nasolabialFoldsGraph &&
                      <img
                        src={nasolabialFoldsGraph}
                        alt="Nasolabial Folds Movement Graph"
                        className={styles.chartImage}
                        onClick={()=>handleOpen(nasolabialFoldsGraph)}
                        style={{ cursor: 'pointer' }}
                      />}
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
                       {firstResult.expression_comment}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>

                 {/* 모달 구현 */}
            <Modal open={open} onClose={handleClose}>
              <Box className={styles.modalBox}>
                {selectedImage && <img src={selectedImage} alt="Enlarged" className={styles.fullscreenImage} />}
              </Box>
            </Modal>



          </div>
        </>
      ) : (
        <Typography>결과를 불러오는 중입니다...</Typography>
      )}
    </div>
    </div>
    </>
};

export default ResultFirstPage;
