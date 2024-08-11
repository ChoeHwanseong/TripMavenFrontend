
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./pages/home/Home";
import Template from "./pages/Template";
import Login from "./pages/login/LogIn";
import CSBoard from './pages/csboard/CSBoard';
import Signup from './pages/login/SignUp';

import UserAsk from './pages/usermypage/UserAsk';
import UserReview from './pages/usermypage/UserReview';

import AdminAsk from './pages/adminmypage/AdminAsk';
import AdminReport from './pages/adminmypage/AdminReport';
import AdminProfile from './pages/adminmypage/AdminProfile';
import AIService from './pages/aiservicepage/AIService';
import TermsService from './pages/termsofservice/TermsService';
import RegisterGuide from './pages/registerguidepage/RegisterGuide';
import GuideProfile from './pages/guidemypage/GuideProfile';
import GuideMyPagePost from './pages/guidemypage/GuideMyPagePost';
//import GuideMyPageLike from './pages/guidemypage/guidemypagelike/guideMyPageLike';
import GuideMyPageInquiry from './pages/guidemypage/GuideMyPageInquiry';
import GuideMyPageInquiryDetails from './pages/guidemypage/GuideMyPageInquiryDetails';
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
import UserProfile from './pages/usermypage/UserProfile';

function App() {

  /*

  
  */

  return <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route element={<Template/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path='/mypageprofile' element={<MypageProfile />}/>
        <Route element={<MyPageTemplate/>}>
          <Route path='/adminreport' element={<AdminReport/>}/>
          <Route path='/adminprofile' element={<AdminProfile/>}/>
          <Route path='/adminask' element={<AdminAsk/>}/>
          <Route path='/memberlist' element={<MemberList/>}/>
          
          <Route path='/guideprofile' element={<GuideProfile/>}/>
          <Route path='/guidemypagemypostdetails' element={<GuideMyPageMyPostDetails/>}/>
          <Route path='/guidemypagemypost' element={<GuideMyPageMyPost/>}/>
          <Route path='/guidemypageinquirydetails' element={<GuideMyPageInquiryDetails/>}/>
          <Route path='/guidemypageinquiry' element={<GuideMyPageInquiry/>}/>
          <Route path='/guidemypagepost' element={<GuideMyPagePost/>}/>
          <Route path='/guidemypageaiservice' element={<GuideMyPageAIService/>}/>
          {/* 일단은 가이드 찜 목록 필요없을거 같아서 주석처리함
          <Route path='/guidemypagelike' element={<GuideMyPageLike/>}/>
           */}

          <Route path='/userreview' element={<UserReview/>}/>
          <Route path='/userprofile' element={<UserProfile/>}/>
          <Route path='/userask' element={<UserAsk/>}/>
          <Route path='/userlike' element={<UserLike/>}/>

          <Route path='/bigChat' element={<BigChat/>}/>
        </Route>

        <Route path='/aiservice' element={<AIService/>}/>
        <Route path="/cs" element={<CSBoard/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        <Route path='/registerguide' element={<RegisterGuide/>}/>
        <Route path='/product' element={<ProductBoard/>}/>
        <Route path='/termsservice' element={<TermsService/>}/>
        <Route path='/paymentproc' element={<OrderPopup/>}/>
        <Route path='/payment' element={<PaymentForm/>}/>
        <Route path='/paymentconfirm' element={<PaymentConfirmation/>}/>
        
      </Route>
    </Routes>
  </>
}

export default App;
