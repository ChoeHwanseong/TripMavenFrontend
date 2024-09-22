
import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Landing from './pages/landing/Landing';
import Home from "./pages/home/Home";
import Template from "./pages/Template";
import LoginRoutes from './pages/login/LoginRoutes';
import MyPageRoutes from './pages/mypage/MyPageRoutes';
import MyPageTemplate from './pages/mypage/MyPageTemplate';
import UserReview from './pages/mypage/usermypage/UserReview';
import UserLike from './pages/mypage/usermypage/UserLike';

import AskUpdate from './pages/askpage/AskUpdate';
import CSBoard from './pages/csboard/CSBoard';
import TermsService from './pages/infopage/TermsService';
import RegisterGuide from './pages/registerguidepage/RegisterGuide';
import SiteIntroduction from './pages/infopage/SiteInfo';
import FAQ from './pages/csboard/FAQ';

import ProductBoard from './pages/productPage/ProductBoard';
import BigChat from './pages/chat/BigChat';
import ChattingRoom from './pages/chat/ChattingRoom';
import DeviceCheckComponent from './pages/aiservicepage/webrecord/DeviceCheckComponent';
import WebcamRecorder from './pages/aiservicepage/webrecord/WebcamRecorder';
import PrecautionsPage1 from './pages/aiservicepage/PrecautionsPage1';
import QuizForm2 from './pages/aiservicepage/QuizForm2';
import QuizTutorial from './pages/aiservicepage/QuizTutorial';
import PronunciationTestTutorial from './pages/aiservicepage/PronunciationTestTutorial';
import RealTest1 from './pages/aiservicepage/RealTest1';
import PostDetails from './pages/productPage/PostDetails';
import RealTestPage from './pages/aiservicepage/RealTestPage'
import RealTestResult from './pages/aiservicepage/RealTestResult'
import AnalysisResult from './pages/aiservicepage/AnalysisResult';
import DeviceCheckComponent2 from './pages/aiservicepage/webrecord/DeviceCheckComponent copy';
import PronunciationRoutes from './pages/aiservicepage/PronunciationRoutes';
import VideoAppUpload from './pages/aiservicepage/webrecord/VideoAppUpload';
import CombinedPage from './pages/aiservicepage/AIPage';
import ProductComponent from './pages/aiservicepage/webrecord/ProductComponent';
import ScreenRecorderApp from './pages/aiservicepage/VoiceTest';
import ReviewDetails from './pages/mypage/usermypage/ReviewDetails';
import ReviewDetailsUpdate from './pages/mypage/usermypage/ReviewDetailsUpdate';
import ResultFinalPage from './pages/aiservicepage/Result/ResultFinalPage';
import ResultFirstPage from './pages/aiservicepage/Result/ResultFirstPage';
import RoleBasedRoute from './components/RoleBasedRoute';
import FaceDetection from './components/FaceDetection';










function App() {

  return <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Template />}>
        <Route path="/home" element={<Home />} />
        <Route path='/login/*' element={<LoginRoutes />} />

        <Route element={<MyPageTemplate />}>
          {/* MYPAGE */}
          <Route path='/mypage/*' element={<MyPageRoutes />} />
          {/* USER */}
          <Route path='/userreview' element={<UserReview />} />
          <Route path='/reviewdetails/:id' element={<ReviewDetails />} />
          <Route path='/reviewDetailsUpdate/:id' element={<ReviewDetailsUpdate />} />
          {/*<Route path='/userask' element={<UserAsk/>}/>*/}
          <Route path='/userlike' element={<UserLike />} />
          {/*<Route path='/useraskpage' element={<UserAskPage/>}/>*/}
          {/* 
          <Route path='/bigChat' element={<BigChat />} />*/}
          {/*<Route path="/guideaskdetailsview/:id" element={<GuideAskDetailsView />} />*/}
          <Route path='/bigchat/:id' element={<BigChat />} />
          <Route path='/chattingRoom' element={<ChattingRoom />} />
          <Route path='/chattingRoom' element={<ChattingRoom />} />

          {/*<Route path="/guideaskupdate/:id" element={<GuideAskUpdate/>} />*/}
    
          <Route path='/askupdate/:id' element={<AskUpdate />} />
        
        </Route>
        <Route path='/videoAppUpload' element={<VideoAppUpload />} />
        <Route path="/cs" element={<CSBoard />} />
        <Route path="/siteinfo" element={<SiteIntroduction />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path='/precautionspage1' element={<PrecautionsPage1 />} />
        <Route path='/quizform2' element={<QuizForm2 />} />
        <Route path='/quiztutorial' element={<QuizTutorial />} />
        <Route path='/pronunciationtesttutorial' element={<PronunciationTestTutorial />} />
        <Route path='/realtest1' element={<RealTest1 />} />
        <Route path='/analysisresult' element={<AnalysisResult />} />
        <Route path='/pronunciation/*' element={<PronunciationRoutes />} /> {/*  URL이 /pronunciation 로 시작하는 애들은 PronunciationRoutes여기서 처리해주세요~ */}
        <Route path='/aipage' element={<CombinedPage />} />

        <Route path='/registerguide' element={<RegisterGuide />} />
        <Route path='/product' element={<ProductBoard />} />
        <Route path='/postDetails/:id' element={<PostDetails />} />

        <Route path='/termsservice' element={<TermsService />} />

        <Route path='/record' element={<WebcamRecorder />} />
        <Route path='/recordcheck' element={<DeviceCheckComponent />} />
        <Route path='/test' element={<DeviceCheckComponent2 />} />

        <Route path='/realTestPage/:id' element={<RealTestPage />} />
        {/* <Route path='/realTestResult/:id' element={<RealTestResult />} />  미사용(ResultFinalPage 사용)*/}
        <Route path='/productComponent' element={<ProductComponent />} />

        <Route path='/juwontest' element={<ScreenRecorderApp />} />
        <Route path='/lgmtest1' element={<VideoAppUpload />} />{/* 테스트 */}

        {/* 실전 테스트 결과 페이지 라우팅 */}
        <Route path='/resultFinalPage/:id' element={<ResultFinalPage />} />
        <Route path='/resultFirstPage/:id' element={<ResultFirstPage />} />
        <Route path='/faceDetection' element={<FaceDetection />} />

      </Route>
    </Routes>
  </>
}

export default App;
