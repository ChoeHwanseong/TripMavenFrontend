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

    console.log('상세프랍스 내려온 videoUrl: ', videoUrls);
    console.log('상세 프랍스 내려온 videoDuration: ', videoDuration);
    console.log('ResultFirstPage에서 가져온 firstResult: ', firstResult);

    if (firstResult) {
      // 각 결과에서 그래프를 추출하여 상태에 저장
      setMouthGraph(`data:image/png;base64,${firstResult.graphs.mouth_graph}`);
      setCheekbonesGraph(`data:image/png;base64,${firstResult.graphs.cheekbones_graph}`);
      setBrowGraph(`data:image/png;base64,${firstResult.graphs.brow_graph}`);
      setNasolabialFoldsGraph(`data:image/png;base64,${firstResult.graphs.nasolabial_folds_graph}`);
    }
  }, [firstResult]);

  return <>

    <div className={styles.pageTitle}>
      첫번째 실전 테스트 결과
    </div>

    <p>*영상 및 음성 분석 결과는 평균적인 데이터이므로 참고 용</p>
    <p>*페이지 내 모든 이미지들은 클릭 시, 확대됩니다.</p>


    <div className={styles.mainContainer}>
      <Box className={styles.maintitleContainer}>
        <Typography variant="h6" className={styles.maintitle}>
          <MovieIcon className={styles.icon} /> 영상 분석 결과
        </Typography>
      </Box>

      {firstResult ? (
        <>
         {/* 비디오 분석 섹션 */}
        <div className={styles.boxContainer}>
          <Grid container spacing={3} alignItems="stretch"> {/* Grid에 alignItems="stretch" 추가 */}
            {/* 총 응시 시간, 눈 깜빡임 횟수 */}
            <Grid item xs={6}>
              <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`} style={{ height: '100%' }}> {/* height: 100% 추가 */}
                <Typography variant="h6" className={styles.chartTitle} align="center">
                  영상 분석
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box className={styles.monBoxContainer}>
                      <Typography variant="h6" className={styles.monChartTitle} align="center">
                        총 응시 시간
                      </Typography>
                      <Typography className={styles.monChartLabel} align="center">
                        {Math.floor(videoDuration % 60)} 초
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className={styles.monBoxContainer}>
                      <Typography variant="h6" className={styles.monChartTitle} align="center">
                        눈 깜빡임 횟수
                      </Typography>
                      <Typography className={styles.monChartLabel} align="center">
                        {firstResult.eye.average_blinks} 회
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box className={`${styles.mainResultSummary} ${styles.commentBoxBelow}`}>
                  <Box className={styles.resultSummaryBox}>
                    <Typography variant="h6" className={styles.resultTitle}>
                      <LeaderboardIcon className={styles.icon} /> Video Comment
                    </Typography>
                    <Typography className={styles.resultText}>
                      분석된 비디오에 대한 요약 내용이 여기에 표시됩니다.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* 영상 다시보기 */}
            <Grid item xs={6}>
              <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`} style={{ height: '100%' }}> {/* height: 100% 추가 */}
                <Typography variant="h6" className={styles.chartTitle} align="center">
                  영상 다시보기
                </Typography>
                <Box className={styles.videoPlayerContainer}>
                  {videoUrls && videoUrls.length > 0 && (
                    <video controls className={styles.videoPlayer}>
                      <source src={videoUrls[0]} type="video/mp4" />
                      브라우저가 비디오 태그를 지원하지 않습니다.
                    </video>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>


          {/* 표정 분석 섹션 */}
          <div className={styles.boxContainer}>
            <Box className={styles.chartSection}>
              <Box className={`${styles.mainResult} ${styles.sameHeight}`}>
                <Typography variant="h6" className={styles.chartTitle}>
                  표정 분석
                </Typography>

                <Grid container spacing={3} className={styles.chartGrid}>
                  {/* 입 주변 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.monBoxContainer}>
                      <Typography variant="h6" className={styles.monChartTitle} align="center">
                        입 주변 변화율
                      </Typography>
                      {mouthGraph && (
                        <img
                          src={mouthGraph}
                          alt="입 주변 변화율 그래프"
                          className={styles.monChartImage}
                          onClick={() => { handleOpen(mouthGraph) }}
                          style={{ cursor: 'pointer' }} />
                      )}
                    </Box>
                  </Grid>

                  {/* 광대 주변 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.monBoxContainer}>
                      <Typography variant="h6" className={styles.monChartTitle} align="center">
                        광대 주변 변화율
                      </Typography>
                      {cheekbonesGraph && (
                        <img
                          src={cheekbonesGraph}
                          alt="광대 주변 변화율 그래프"
                          className={styles.monChartImage}
                          onClick={() => { handleOpen(cheekbonesGraph) }}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </Box>
                  </Grid>

                  {/* 미간 주름 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.monBoxContainer}>
                      <Typography variant="h6" className={styles.monChartTitle} align="center">
                        미간 주름 변화율
                      </Typography>
                      {browGraph && (
                        <img
                          src={browGraph}
                          alt="미간 주름 변화율 그래프"
                          className={styles.monChartImage}
                          onClick={() => { handleOpen(browGraph) }}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </Box>
                  </Grid>

                  {/* 팔자 주름 변화율 그래프 */}
                  <Grid item xs={3}>
                    <Box className={styles.monBoxContainer}>
                      <Typography variant="h6" className={styles.monChartTitle} align="center">
                        팔자 주름 변화율
                      </Typography>
                      {nasolabialFoldsGraph && (
                        <img
                          src={nasolabialFoldsGraph}
                          alt="팔자 주름 변화율 그래프"
                          className={styles.monChartImage}
                          onClick={() => { handleOpen(nasolabialFoldsGraph) }}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
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


    {firstResult ? (
      <>

    <div className={styles.mainContainer}>
      <Box className={styles.maintitleContainer}>
        <Typography variant="h6" className={styles.maintitle}>
          <MovieIcon className={styles.icon} /> 음성 분석 결과
        </Typography>
      </Box>

{/* 음성 분석 섹션 */}
<div className={styles.boxContainer}>
  <Grid container spacing={3} alignItems="stretch"> 

    {/* 음성 분석 */}
    <Grid item xs={8}>
      <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`} style={{ height: '100%' }}> {/* height: '100%' 추가 */}
        <Typography variant="h6" className={styles.chartTitle} align="center">
          음성 분석
        </Typography>
        <Grid container spacing={3} className={styles.flexContainer}>

          {/* 목소리의 Hz */}
          <Grid item xs={8}>
            <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`} style={{ height: '100%' }}> {/* height: '100%' 추가 */}
              <Typography className={styles.monChartTitle} align="center">
                목소리의 Hz
              </Typography>
              <Box className={styles.flexContainer}>
                <img
                  src={nasolabialFoldsGraph}
                  alt="목소리의 Hz 그래프"
                  className={styles.voiceHzChartImage}
                  onClick={() => { handleOpen(nasolabialFoldsGraph) }}
                  style={{ cursor: 'pointer' }}
                />
                <Box className={styles.monTextContainer}>
                  <Typography className={styles.monResultText}>
                    목소리 평균 Hz: 176
                  </Typography>
                  <Typography className={styles.monResultText}>
                    음성 주파수는 어느 정도가 좋다고 특정할 수 없습니다.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* 음성 속도 분석 */}
          <Grid item xs={4}>
            <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`} style={{ height: '100%' }}> {/* height: '100%' 추가 */}
              <Typography className={styles.monChartTitle} align="center">
                음성 속도 분석
              </Typography>
              <img
                src={nasolabialFoldsGraph}
                alt="음성 속도 분석 그래프"
                className={styles.monChartImage}
                onClick={() => { handleOpen(nasolabialFoldsGraph) }}
                style={{ cursor: 'pointer' }} />
              <Typography className={styles.monChartLabel} align="center">
                총 302 WPM
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Grid>

    {/* 발음 분석 */}
    <Grid item xs={4}>
      <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`} style={{ height: '100%' }}> 
        <Typography variant="h6" className={styles.chartTitle} align="center">
          발음 분석
        </Typography>
        <Typography className={styles.monChartLabel} align="center">
          발음 정확도: 87.65%
        </Typography>

        {/* 발음 분석 코멘트 아래에 여백 추가 */}
        <Box className={styles.mainResultSummary} style={{ marginTop: '40px' }}> {/* 여백 추가 */}
          <Box className={styles.resultSummaryBox}>
            <Typography variant="h6" className={styles.resultTitle}>
              <LeaderboardIcon className={styles.icon} /> Voice Comment
            </Typography>
            <Typography className={styles.resultText}>
              분석된 음성에 대한 요약 내용이 여기에 표시됩니다.
            </Typography>
          </Box>
        </Box>

      </Box>
    </Grid>

  </Grid>
</div>




      <div className={styles.monMainContainer}>
        {/* 문법 분석 섹션 */}
        <Grid container spacing={3} alignItems="stretch"> {/* alignItems="stretch" 추가 */}
          <Grid item xs={7}>
            <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`}> {/* equalHeightBox 클래스 추가 */}
              <Typography variant="h6" className={styles.chartTitle} align="center">
                문법 분석
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box className={styles.monBoxContainer}>
                    <Typography variant="h6" className={styles.monChartTitle} align="center">
                      불필요한 추임새 빈도
                    </Typography>
                    <img src={nasolabialFoldsGraph} alt="표 이미지" className={styles.monChartImage} />
                    <Typography className={styles.monChartLabel} align="center">
                      불필요한 추임새 빈도
                    </Typography>
                    <Typography className={styles.monChartSubtext} align="center">
                      *주로 쓰는 추임새 단어를 분석한 결과입니다.
                    </Typography>
                  </Box>
                </Grid>

                {/* 어미 분석 */}
                <Grid item xs={6}>
                  <Box className={styles.monBoxContainer}>
                    <Typography variant="h6" className={styles.monChartTitle} align="center">
                      어미 분석
                    </Typography>
                    <img
                      src={nasolabialFoldsGraph}
                      alt="아이 분석 차트"
                      className={styles.monChartImage}
                      onClick={() => { handleOpen(nasolabialFoldsGraph) }}
                      style={{ cursor: 'pointer' }}
                    />
                    <Typography className={styles.monChartLabel} align="center">
                      화자 비율
                    </Typography>
                    <Typography className={styles.monChartSubtext} align="center">
                      *화자 분석을 통해 나온 비율 차트입니다.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

            {/* 키워드 분석 섹션 */}
          <Grid item xs={5}>
            <Box className={`${styles.monBoxContainer} ${styles.equalHeightBox}`} style={{ height: '100%' }}> {/* equalHeightBox 클래스 추가 */}
              <Typography variant="h6" className={styles.chartTitle} align="center">
                키워드 분석
              </Typography>
              <Box className={styles.monBoxContainer}>
                <img
                  src={nasolabialFoldsGraph}
                  alt="키워드 분석"
                  className={styles.monChartImage}
                  onClick={() => { handleOpen(nasolabialFoldsGraph) }}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* 문법 및 키워드 코멘트 */}
        <Grid item xs={12}>
          <Box className={styles.mainResultSummary}>
            <Box className={styles.resultSummaryBox}>
              <Typography variant="h6" className={styles.resultTitle}>
                <LeaderboardIcon className={styles.icon} /> Keyword Comment
              </Typography>
              <Typography className={styles.resultText}>
                분석된 비디오에 대한 요약 내용이 여기에 표시됩니다.
              </Typography>
            </Box>
          </Box>
        </Grid>

      </div>
    </div>


      </>
      ) : (
      <Typography>결과를 불러오는 중입니다...</Typography>
      )}
  </>
};

export default ResultFirstPage;
