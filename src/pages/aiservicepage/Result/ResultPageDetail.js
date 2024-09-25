import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Modal, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import styles from "../../../styles/aiservicepage/Result/ResultFirst.module.css";
import { useLocation, useParams } from "react-router-dom";
import { PieChart } from "@mui/x-charts";
import WordCloud from 'react-d3-cloud';
import ReactSpeedometer from "react-d3-speedometer"

const ResultFirstPage = ({result, videoUrls, setPageNumber, pageNumber}) => {
  const location = useLocation(); // useLocation을 사용하여 state를 가져옴
  //const { result, videoUrls } = location.state || {};

  const groupFirstId = useParams().id;

  //워드클라우드 데이터
  const [wordCloudData, setWordCloudData] = useState([]);

  // 그래프를 저장할 상태 변수
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
    console.log('상세프랍스 내려온 groupFirstId: ', groupFirstId);
    console.log('ResultFinalPage에서 가져온 result: ', result);

    if (result) {
      // 각 결과에서 그래프를 추출하여 상태에 저장
      setMouthGraph(`data:image/png;base64,${result.mouth}`);
      setCheekbonesGraph(`data:image/png;base64,${result.cheek}`);
      setBrowGraph(`data:image/png;base64,${result.brow}`);
      setNasolabialFoldsGraph(`data:image/png;base64,${result.nasolabial}`);
      if (result.text) {
        const wordList = result.text.split(',');
        const weightList = result.weight.split(',');
        const keyValue = [];

        for (let i = 0; i < wordList.length; i++) {
          keyValue.push({ 'text': wordList[i], 'value': parseInt(weightList[i], 10) * 100 });
        }
        setWordCloudData(keyValue);
      }
    }
    
    //페이지 옮기면 스크롤 위로 올리기
    scrollToTop(); 
  }, [result, pageNumber]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const handleClick = ()=>{
    setPageNumber("0");
  };

  return <>

    <div className={styles.pageTitle}>
      첫번째 실전 테스트 결과
    </div>

    <p>*영상 및 음성 분석 결과는 평균적인 데이터이므로 참고용으로만 보시기 바랍니다</p>
    <p>*페이지 내 모든 이미지들은 클릭 시, 확대됩니다.</p>
    <div className="d-flex justify-content-end mb-5">
      <Button variant="contained" className={styles.detailButton} onClick={handleClick}>
        전체 테스트 결과 돌아가기 &gt;&gt;
      </Button>
    </div>
    <div className={styles.mainContainer}>
      <Box className={styles.maintitleContainer}>
        <Typography variant="h6" className={styles.maintitle}>
          <MovieIcon className={styles.icon} /> 영상 분석 결과
        </Typography>
      </Box>

      {result ? (
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
                          {result.total_time} 초
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className={styles.monBoxContainer}>
                        <Typography variant="h6" className={styles.monChartTitle} align="center">
                          눈 깜빡임 횟수
                        </Typography>
                        <Typography className={styles.monChartLabel} align="center">
                          {result.eye} 회
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
                        {result.commentEye.split("*")[0]}
                      </Typography>
                      <Typography className={styles.monSubtext}>
                        {"*" + result.commentEye.split("*")[1]}
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
                    {(videoUrls && videoUrls.length > 0) ?
                      (
                        <video controls className={styles.videoPlayer}>
                          <source src={videoUrls[0]} type="video/mp4" />
                        </video>
                      )
                      :
                      <Typography variant="h6" align="center" sx={{ marginTop: "120px" }}>
                        일시적인 오류로 동영상을 표시할 수 없습니다.
                      </Typography>
                    }
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
                      {result.commentsFace && result.commentsFace.split('*').map((comment, index) =>
                        <Typography variant="h6" className={styles.resultTitle} key={index}>
                          {index === 0 && <EmojiEmotionsIcon className={styles.icon} />} {comment}
                        </Typography>
                      )}
                      <Typography className={styles.resultText}>
                        {result.expression_comment}
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


    {result ? (
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
                              목소리 평균 Hz: {result.tone_mean}
                            </Typography>
                            <Typography className={styles.monResultText}>
                              {result.tone}
                            </Typography>
                            <Typography className={styles.monSubtext}>
                              *음성 주파수는 어느 정도가 좋다고 특정할 수 없습니다.
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
                        <div style={{width:'100%', height:'150px', marginTop:'20px'}}>
                          <ReactSpeedometer
                            minValue={0}
                            maxValue={400}
                            fluidWidth={true}
                            ringWidth={40}
                            segments={3}
                            customSegmentStops={[0, 240, 300, 400]}
                            segmentColors={["gold", "tomato", "firebrick"]}
                            needleColor="red"
                            needleHeightRatio={0.6}
                            value={result.speed}
                          />
                        </div>
                        <Typography className={styles.monChartLabel} align="center">
                          {result.speed} WPM
                        </Typography>
                        <Typography className={styles.monSubtext}>
                          *WPM(Word Per Minute): 분당 단어 수<br />
                          *한국인 평균 말하기 속도에 맞춘 결과입니다.
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
                    발음 정확도: {result.pronunciation}%
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

                        <TableContainer sx={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                          <Table>
                            <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
                              <TableRow>
                                <TableCell align="center">단어</TableCell>
                                <TableCell align="center">사용횟수</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {result.fillerwords && result.fillerwords.split(',').map((word, index) => (
                                <TableRow key={index} hover>
                                  <TableCell align="center">{word}</TableCell>
                                  <TableCell align="center">{result.fillerweights.split(',')[index] + '번'}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Typography className={styles.monSubtext} align="center">
                          *주로 쓰는 추임새 단어를 추출한 결과입니다.
                        </Typography>
                      </Box>
                    </Grid>

                    {/* 어미 분석 */}
                    <Grid item xs={6}>
                      <Box className={styles.monBoxContainer}>
                        <Typography variant="h6" className={styles.monChartTitle} align="center">
                          어미 분석
                        </Typography>
                        <PieChart
                          series={[
                            {
                              data: [
                                { id: 0, value: result.formal_speak, label: '평서문' },
                                { id: 1, value: result.question_speak, label: '의문문' },
                              ],
                              arcLabel: (params) => {
                                const total = result.formal_speak + result.question_speak;
                                const percent = ((params.value / total) * 100).toFixed(0);
                                return params.value > 0 ? `${params.label} ${percent}%` : '';
                              },
                            },
                          ]}
                          labelPlacement="end"
                          width={300}
                          height={200}
                          sx={{ marginTop: '10px', fontSize: '14px', fontWeight: 'bold' }}
                        />
                        <Typography className={styles.monChartLabel} align="center" sx={{ marginBottom: '10px' }}>
                          어미 비율
                        </Typography>
                        <Typography className={styles.monSubtext} align="center">
                          *어미 분석을 통해 나온 평서문과 의문문 비율 차트입니다.
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
                  <WordCloud
                    data={wordCloudData}
                    width={300}
                    height={300}
                    font="Times"
                    fontWeight="bold"
                    spiral="rectangular"
                    padding={5}
                  />
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
        
        <div className="d-flex justify-content-end mb-5">
          <Button variant="contained" className={styles.detailButton} onClick={handleClick}>
            전체 테스트 결과 돌아가기 &gt;&gt;
          </Button>
        </div>
      </>
    ) : (
      <Typography>결과를 불러오는 중입니다...</Typography>
    )}
  </>
};

export default ResultFirstPage;
