
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./pages/home/Home";
import Template from "./pages/Template";
import Login from "./pages/login/LogIn";
import CSBoard from './pages/csboard/CSBoard';
import Signup from './pages/login/SignUp';

import UserReview from './pages/usermypage/UserReview';

import AdminAsk from './pages/adminmypage/AdminAsk';
import AdminReport from './pages/adminmypage/AdminReport';
import AdminProfile from './pages/adminmypage/AdminProfile';
import AIService from './pages/aiservicepage/AIService';
import TermsService from './pages/infopage/TermsService';
import RegisterGuide from './pages/registerguidepage/RegisterGuide';
//import GuideMyPageLike from './pages/guidemypage/guidemypagelike/guideMyPageLike';
import GuideMyPageMyPost from './pages/guidemypage/GuideMyPageMyPost';
import GuideMyPageMyPostDetails from './pages/guidemypage/GuideMyPageMyPostDetails';
import GuideMyPageAIService from './pages/guidemypage/guidemypageaiservice/GuideMyPageAIService';
import Landing from './pages/landing/Landing';
import ProductBoard from './pages/productPage/ProductBoard';
import PaymentForm from './pages/payment/Payment';
import OrderPopup from './pages/payment/PaymentProc';
import PaymentConfirmation from './pages/payment/PaymentConfirm';
import BigChat from './pages/chat/BigChat';
import MyPageTemplate from './pages/mypage/MyPageTemplate';
import MypageProfile from './pages/mypage/MyPageProfile';
import UserLike from './pages/usermypage/UserLike';






import MemberList from './pages/adminmypage/MemberList';
import GuideAskUpdate from './pages/guidemypage/GuideAskUpdate';
import GuideAsk from './pages/guidemypage/GuideAsk';
import GuidePost from './pages/guidemypage/GuidePost';
import SiteIntroduction from './pages/infopage/SiteInfo';
import FAQ from './pages/csboard/FAQ';
import ComplaintForm from './pages/report/ComplaintForm';
import AdminAskDetailsView from './pages/adminmypage/AdminAskDetailsView';
import AdminAnswer from './pages/adminmypage/AdminAnswer';


import AskAll from './pages/askpage/AskAll';
import AskDetails from './pages/askpage/Askdetails';
import AskDetailsView from './pages/askpage/AskDetailsView';
import AskUpdate from './pages/askpage/AskUpdate';
import ReviewDetails from './pages/usermypage/UserReviewDetails';
import GuideUpdatePost from './pages/guidemypage/GuideUpdatePost';
import MypageUpdate from './pages/mypage/MyPageUpdate';
import FindID1 from './pages/login/FindId1';
import FindPassword1 from './pages/login/FindPassword1';
import FindPassword2 from './pages/login/FindPassword2';
import FindPassword3 from './pages/login/FindPassword3';
import FindID2 from './pages/login/FindId2';
import PasswordChangeForm from './pages/login/PasswordChangeForm';
import ChattingRoom from './pages/chat/ChattingRoom';
import AiServiceInfo from './pages/aiservicepage/AIServiceInfo';
import DeviceCheckComponent from './pages/aiservicepage/webrecord/DeviceCheckComponent';
import WebcamRecorder from './pages/aiservicepage/webrecord/WebcamRecorder';
import LoginSuccess from './pages/login/LogInSuccess';
import GuidePostDetails from './pages/guidemypage/GuidePostDetails';
import GuidePostUpdate from './pages/guidemypage/GuidePostUpdate';
import PrecautionsPage1 from './pages/aiservicepage/PrecautionsPage1';
import QuizForm2 from './pages/aiservicepage/QuizForm2';
import QuizTutorial from './pages/aiservicepage/QuizTutorial';
import PronunciationTestTutorial from './pages/aiservicepage/PronunciationTestTutorial';
import MICTest from './pages/aiservicepage/MICTest';
import RealTest1 from './pages/aiservicepage/RealTest1';
import PronunciationTest from './pages/aiservicepage/PronunciationTest';
import PostDetails from './pages/bulletin/PostDetails';
import RealTestPage from './pages/aiservicepage/RealTestPage'
import RealTestResult from './pages/aiservicepage/RealTestResult'


function App() {

  

  return <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route element={<Template/>}>
        <Route path="/home" element={<Home/>}/>
        <Route element={<MyPageTemplate/>}>

          {/* ADMIN */}
          <Route path='/adminreport' element={<AdminReport/>}/>
          <Route path='/adminprofile' element={<AdminProfile/>}/>
          <Route path='/adminask' element={<AdminAsk/>}/>
          <Route path='/memberlist' element={<MemberList/>}/>
          <Route path='/adminAskDetailsView/:id' element={<AdminAskDetailsView/>}/>
          <Route path='/adminAnswer/:id' element={<AdminAnswer/>}/>

          
          {/* GUIDE */}
          <Route path='/guidemypost' element={<GuideMyPageMyPost/>}/>
  
          {/*<Route path='/guideask' element={<GuideAsk/>}/>*/}
          <Route path='/guidemypageaiservice' element={<GuideMyPageAIService/>}/>
          <Route path="/guideAsk" element={<GuideAsk />} />
        
           <Route path='/guidePost/:id' element={<GuidePost/>}/>
          
          {/* 일단은 가이드 찜 목록 필요없을거 같아서 주석처리함
          <Route path='/guidemypagelike' element={<GuideMyPageLike/>}/>
           */}

            
          <Route path='/guidePostDetails/:id' element={<GuidePostDetails/>}/>
          <Route path='/guidePostUpdate/:id' element={<GuidePostUpdate/>}/>

           {/* USER */}
          <Route path='/userreview' element={<UserReview/>}/>
          <Route path='/reviewdetails' element={<ReviewDetails/>}/>
          {/*<Route path='/userask' element={<UserAsk/>}/>*/}
          <Route path='/userlike' element={<UserLike/>}/>
          {/*<Route path='/useraskpage' element={<UserAskPage/>}/>*/}

          <Route path='/bigChat' element={<BigChat/>}/>
          {/*<Route path="/guideaskdetailsview/:id" element={<GuideAskDetailsView />} />*/}


          <Route path='/askdetailsview/:id' element={<AskDetailsView/>}/>
          <Route path='/askall' element={<AskAll/>}/>
          
          <Route path='/bigChat/:roomId' element={<BigChat/>}/>
          <Route path='/chattingRoom' element={<ChattingRoom/>}/>
          <Route path="/chattingRoom/:roomId" element={<ChattingRoom />} />

          {/* MYPAGE */}
          <Route path="/mypageprofile/:id" element={<MypageProfile />} />
          <Route path="/mypageUpdate/:id" element={<MypageUpdate />} />

          {/*<Route path="/guideAsk" element={<GuideAsk />} />*/}
          {/*<Route path="/guideaskupdate/:id" element={<GuideAskUpdate/>} />*/}
          <Route path='/guidePost' element={<GuidePost/>}/>

          <Route path='/askall' element={<AskAll />}/>
          <Route path='/askdetails/:id' element={<AskDetails/>}/>
          <Route path='/askdetailsview/:id' element={<AskDetailsView/>}/>
          <Route path='/askupdate/:id' element={<AskUpdate/>}/>

        </Route>
        
        <Route path='/aiservice' element={<AIService/>}/>
        <Route path="/cs" element={<CSBoard/>}/>
        <Route path="/siteinfo" element={<SiteIntroduction/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/success" element={<LoginSuccess/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/findId1' element={<FindID1/>}/>
        <Route path='/findId2' element={<FindID2/>}/>
        <Route path='/findpassword1' element={<FindPassword1/>}/>
        <Route path='/findpassword2' element={<FindPassword2/>}/>
        <Route path='/findpassword3' element={<FindPassword3/>}/>
        <Route path='/passwordchange' element={<PasswordChangeForm/>}/>
        <Route path='/aiserviceinfo' element={<AiServiceInfo/>}/>
        {/* <Route path='/precautionspage1' element={<PrecautionsPage1/>}/> */}
        <Route path='/precautionspage1' element={<PrecautionsPage1/>}/>
        <Route path='/quizform2' element={<QuizForm2/>}/>
        <Route path='/quiztutorial' element={<QuizTutorial/>}/>
        <Route path='/pronunciationtesttutorial' element={<PronunciationTestTutorial/>}/>
        <Route path='/mictest' element={<MICTest/>}/>
        <Route path='/realtest1' element={<RealTest1 />}/>
        <Route path='/pronunciationtest' element={<PronunciationTest/>}/>
        

        <Route path='/registerguide' element={<RegisterGuide/>}/>
        <Route path='/product' element={<ProductBoard/>}/>
        <Route path='/postDetails/:id/:keyword' element={<PostDetails/>}/>
        
        <Route path='/termsservice' element={<TermsService/>}/>
        <Route path='/adminreport' element={<ComplaintForm/>}/>

        <Route path='/paymentproc' element={<OrderPopup/>}/>
        <Route path='/payment' element={<PaymentForm/>}/>
        <Route path='/paymentconfirm' element={<PaymentConfirmation/>}/>
        <Route path='/record' element={<WebcamRecorder/>}/>
        <Route path='/recordcheck' element={<DeviceCheckComponent/>}/>
        
        <Route path='/realTestPage' element={<RealTestPage />}/>
        <Route path='/realTestResult' element={<RealTestResult />}/>



      </Route>
    </Routes>
  </>
}

export default App;
