
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
import RoleBasedRoute from './components/RoleBasedRoute';


import NotFoundPage from './pages/error/NotFoundPage';
import Error403Page from './pages/error/Error403Page';
import Error500Page from './pages/error/Error500Page';
import MaintenancePage from './pages/error/MaintenancePage';







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
          <Route path='/userreview' element={<RoleBasedRoute element={<UserReview />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
          <Route path='/reviewdetails/:id' element={<RoleBasedRoute element={<ReviewDetails />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
          <Route path='/reviewDetailsUpdate/:id' element={<RoleBasedRoute element={<ReviewDetailsUpdate />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
          <Route path='/userlike' element={<RoleBasedRoute element={<UserLike />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
          <Route path='/bigchat/:id' element={<RoleBasedRoute element={<BigChat />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
          <Route path='/chattingRoom' element={<RoleBasedRoute element={<ChattingRoom />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
          <Route path='/askPost/:id' element={<RoleBasedRoute element={<AskPost />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
          <Route path='/askupdate/:id' element={<RoleBasedRoute element={<AskUpdate />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />

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

        <Route path='/record' element={<WebcamRecorder />} />
        <Route path='/recordcheck' element={<DeviceCheckComponent />} />
        <Route path='/test' element={<DeviceCheckComponent2 />} />

        <Route path='/realTestPage/:id' element={<RealTestPage />} />
        <Route path='/realTestResult' element={<RealTestResult />} />
        <Route path='/productComponent' element={<ProductComponent />} />

        <Route path='/juwontest' element={<ScreenRecorderApp />} />


        <Route path='/faceRecognitionApp' element={<FaceRecognitionApp />} /> {/* 테스트용 */}

        <Route path='/*' element={<NotFoundPage />} /> {/* 존재하지 않는 모든 경로 */}
        <Route path='/Error403Page' element={<Error403Page />} />
        <Route path='/Error500Page' element={<Error500Page />} />
        <Route path='/MaintenancePage' element={<MaintenancePage />} />
      </Route>
    </Routes>
  </>
}

export default App;
