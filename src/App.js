
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

import GuideAskDetails from './pages/guidemypage/GuideAskDetails';


import MemberList from './pages/adminmypage/MemberList';
import GuideAskDetailsView from './pages/guidemypage/GuideAskDetailsView';
import GuideAskUpdate from './pages/guidemypage/GuideAskUpdate';
import GuideAsk from './pages/guidemypage/GuideAsk';
import GuidePost from './pages/guidemypage/GuidePost';
import SiteIntroduction from './pages/infopage/SiteInfo';
import FAQ from './pages/csboard/FAQ';
import ComplaintForm from './pages/report/ComplaintForm';
import AdminAskDetailsView from './pages/adminmypage/AdminAskDetailsView';
import AdminAnswer from './pages/adminmypage/AdminAnswer';
import UserAskPage from './pages/usermypage/UserAskPage';
import AskAll from './pages/askpage/AskAll';
import AskDetails from './pages/askpage/Askdetails';
import AskDetailsView from './pages/askpage/AskDetailsView';

function App() {

  /*

  
  */

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
          <Route path='/guidemypagemypostdetails/:id' element={<GuideMyPageMyPostDetails/>}/>
          <Route path='/guidemypost' element={<GuideMyPageMyPost/>}/>
          <Route path='/guideaskdetails' element={<GuideAskDetails/>}/>
  
          <Route path='/guideask' element={<GuideAsk/>}/>
          <Route path='/guidemypageaiservice' element={<GuideMyPageAIService/>}/>
          {/* 일단은 가이드 찜 목록 필요없을거 같아서 주석처리함
          <Route path='/guidemypagelike' element={<GuideMyPageLike/>}/>
           */}

          <Route path='/userreview' element={<UserReview/>}/>
          {/*<Route path='/userask' element={<UserAsk/>}/>*/}
          <Route path='/userlike' element={<UserLike/>}/>
          <Route path='/useraskpage' element={<UserAskPage/>}/>

          <Route path='/bigChat' element={<BigChat/>}/>
          <Route path="/guideaskdetailsview/:id" element={<GuideAskDetailsView />} />
          <Route path="/mypageprofile/:id" element={<MypageProfile />} />

          <Route path="/guideAsk" element={<GuideAsk />} />
          <Route path="/guideaskupdate/:id" element={<GuideAskUpdate/>} />
          <Route path='/guidePost' element={<GuidePost/>}/>

          <Route path='/askall' element={<AskAll />}/>
          <Route path='/askdetails' element={<AskDetails/>}/>
          <Route path='/askdetailsview/:id' element={<AskDetailsView/>}/>
        </Route>
        
        <Route path='/aiservice' element={<AIService/>}/>
        <Route path="/cs" element={<CSBoard/>}/>
        <Route path="/siteinfo" element={<SiteIntroduction/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        

        <Route path='/registerguide' element={<RegisterGuide/>}/>
        <Route path='/product' element={<ProductBoard/>}/>
        <Route path='/termsservice' element={<TermsService/>}/>
        <Route path='/adminreport' element={<ComplaintForm/>}/>

        <Route path='/paymentproc' element={<OrderPopup/>}/>
        <Route path='/payment' element={<PaymentForm/>}/>
        <Route path='/paymentconfirm' element={<PaymentConfirmation/>}/>
        
        
      </Route>
    </Routes>
  </>
}

export default App;
