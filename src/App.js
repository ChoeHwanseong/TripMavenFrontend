
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./pages/home/home";
import Template from "./pages/template";
import Login from "./pages/login/login";
import CSBoard from './pages/csboard/csBoard';
import Signup from './pages/login/SignUp';
import UserProfile from './pages/usermypage/userProfile';
import UserAsk from './pages/usermypage/userAsk';
import UserReview from './pages/usermypage/usrerreview';
import MemberList from './pages/adminmypage/memberList';
import AdminAsk from './pages/adminmypage/adminAsk';
import AdminReport from './pages/adminmypage/adminReport';
import AdminProfile from './pages/adminmypage/adminProfile';
import AIService from './pages/aiservicepage/aiservice';
import TermsService from './pages/termsofservice/termsService';
import RegisterGuide from './pages/registerguidepage/registerguide';
import GuideProfile from './pages/guidemypage/guideProfile';
import GuideMyPagePost from './pages/guidemypage/guideMyPagePost';
import GuideMyPageLike from './pages/guidemypage/guidemypagelike/guideMyPageLike';
import GuideMyPageInquiry from './pages/guidemypage/guideMyPageInquiry';
import GuideMyPageInquiryDetails from './pages/guidemypage/guideMyPageInquiryDetails';
import GuideMyPageMyPost from './pages/guidemypage/guideMyPageMyPost';
import GuideMyPageMyPostDetails from './pages/guidemypage/guideMyPageMyPostDetails';
import GuideMyPageAIService from './pages/guidemypage/guidemypageaiservice/guideMyPageAIService';
import Landing from './pages/landing/landing';
import Chat from './pages/chat/Chat';
import ProductBoard from './pages/productPage/ProductBoard';
import PaymentForm from './pages/payment/payment';
import OrderPopup from './pages/payment/paymentProc';
import PaymentConfirmation from './pages/payment/paymentConfirm';
import BigChat from './pages/chat/BigChat';

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route element={<Template/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path='/adminreport' element={<AdminReport/>}/>
        <Route path='/adminprofile' element={<AdminProfile/>}/>
        <Route path='/adminask' element={<AdminAsk/>}/>
        <Route path='/memberlist' element={<MemberList/>}/>
        <Route path='/aiservice' element={<AIService/>}/>
        <Route path="/cs" element={<CSBoard/>}/>
        <Route path='/guideprofile' element={<GuideProfile/>}/>
        <Route path='/guidemypagemypostdetails' element={<GuideMyPageMyPostDetails/>}/>
        <Route path='/guidemypagemypost' element={<GuideMyPageMyPost/>}/>
        <Route path='/guidemypageinquirydetails' element={<GuideMyPageInquiryDetails/>}/>
        <Route path='/guidemypageinquiry' element={<GuideMyPageInquiry/>}/>
        <Route path='/guidemypagepost' element={<GuideMyPagePost/>}/>
        <Route path='/guidemypagelike' element={<GuideMyPageLike/>}/>
        <Route path='/guidemypageaiservice' element={<GuideMyPageAIService/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/userreview' element={<UserReview/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/userask' element={<UserAsk/>}/>
        <Route path='/registerguide' element={<RegisterGuide/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/product' element={<ProductBoard/>}/>
        <Route path='/termsservice' element={<TermsService/>}/>
        <Route path='/paymentproc' element={<OrderPopup/>}/>
        <Route path='/payment' element={<PaymentForm/>}/>
        <Route path='/paymentconfirm' element={<PaymentConfirmation/>}/>
        <Route path='/bigChat' element={<BigChat/>}/>
      </Route>
    </Routes>
  </>
}

export default App;
