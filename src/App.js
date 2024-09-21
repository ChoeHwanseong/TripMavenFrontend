
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

import ProductPost from './pages/productPage/ProductPost';
import GuideMyPageMyPost from './pages/guidemypage/GuideMyPageMyPost';
import GuideMyPageAIService from './pages/guidemypage/guidemypageaiservice/GuideMyPageAIService';


import PaymentForm from './pages/payment/Payment';
import OrderPopup from './pages/payment/PaymentProc';
import PaymentConfirmation from './pages/payment/PaymentConfirm';

import AskPost from './pages/askpage/AskPost';
import AskUpdate from './pages/askpage/AskUpdate';
import CSBoard from './pages/csboard/CSBoard';
import TermsService from './pages/infopage/TermsService';
import RegisterGuide from './pages/registerguidepage/RegisterGuide';
import SiteIntroduction from './pages/infopage/SiteInfo';
import FAQ from './pages/csboard/FAQ';
import ComplaintForm from './pages/report/ComplaintForm';
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
import FaceRecognitionApp from './pages/aiservicepage/webrecord/FaceRecognitionApp';
import GuideMyPageLike from './pages/guidemypage/guidemypagelike/GuideMyPageLike';


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
          {/* GUIDE */}
          <Route path='/guidemypost' element={<GuideMyPageMyPost />} />
          <Route path='/guidemypageaiservice' element={<GuideMyPageAIService />} />

          <Route path='/guidemypagelike' element={<GuideMyPageLike />}/>
          
          {/* USER */}
          <Route path='/userreview' element={<UserReview />} />
          <Route path='/reviewdetails/:id' element={<ReviewDetails />} />
          <Route path='/reviewDetailsUpdate/:id' element={<ReviewDetailsUpdate />} />
          <Route path='/userlike' element={<UserLike />} />
          <Route path='/bigchat/:id' element={<BigChat />} />
          <Route path='/chattingRoom' element={<ChattingRoom />} />

          <Route path='/askPost/:id' element={<AskPost />} />
          <Route path='/askupdate/:id' element={<AskUpdate />} />

        </Route>
        <Route path='/productPost/:id' element={<ProductPost />} />
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
        <Route path='/adminreport' element={<ComplaintForm />} />

        <Route path='/paymentproc' element={<OrderPopup />} />
        <Route path='/payment' element={<PaymentForm />} />
        <Route path='/paymentconfirm' element={<PaymentConfirmation />} />
        <Route path='/record' element={<WebcamRecorder />} />
        <Route path='/recordcheck' element={<DeviceCheckComponent />} />
        <Route path='/test' element={<DeviceCheckComponent2 />} />

        <Route path='/realTestPage/:id' element={<RealTestPage />} />
        <Route path='/realTestResult' element={<RealTestResult />} />
        <Route path='/productComponent' element={<ProductComponent />} />

        <Route path='/juwontest' element={<ScreenRecorderApp />} />


        <Route path='/faceRecognitionApp' element={<FaceRecognitionApp />} /> {/* 테스트용 */}

      </Route>
    </Routes>
  </>
}

export default App;
