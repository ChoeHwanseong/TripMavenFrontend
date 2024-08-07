
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./pages/home/home";
import Template from "./pages/template";
import Login from "./pages/login/login";
import CSBoard from './pages/csboard/csBoard';
import Signup from './pages/login/SignUp';
import UserProfile from './pages/usermypage/userprofile';
import UserAsk from './pages/usermypage/userask';
import UserReview from './pages/usermypage/usrerreview';
import MemberList from './pages/adminmypage/memberlist';
import AdminAsk from './pages/adminmypage/adminAsk';
import AdminReport from './pages/adminmypage/adminreport';
import AdminProfile from './pages/adminmypage/adminProfile';
import AIService from './pages/aiservicepage/aiservice';
import TermsService from './pages/termsofservice/termsservice';
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
import ComplaintForm from './pages/report/ComplaintForm';
import PasswordChangeForm from './pages/login/PasswordChangeForm';
import FindPassword1 from './pages/login/FindPassword1';
import FindPassword2 from './pages/login/FindPassword2';
import FindPassword3 from './pages/login/FindPassword3';
import FindID1 from './pages/login/FindId1';
import FindId2 from './pages/login/FindId2';
import UserAskPage from './pages/usermypage/UserAskPage';


function App() {
  return <>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route element={<Template/>}>
        <Route path="/home" element={<Home />}/>

        <Route path='/adminreport' element={<AdminReport />}/>
        <Route path='/adminprofile' element={<AdminProfile />}/>
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


        <Route path="/login" element={<Login />}/>
        <Route path='/signup' element={<Signup/>}/>
        

        <Route path='/userreview' element={<UserReview/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/userask' element={<UserAsk/>}/>
        

        <Route path='/registerguide' element={<RegisterGuide/>}/>


        <Route path='/chat' element={<Chat/>}/>


        <Route path='/product' element={<ProductBoard/>}/>


        <Route path='/termsservice' element={<TermsService/>}/>

        <Route path='/report' element={<ComplaintForm/>}/>



        <Route path='/passwordchange' element={<PasswordChangeForm/>}/>

        <Route path='/findpassword1' element={<FindPassword1/>}/>
        <Route path='/findpassword2' element={<FindPassword2/>}/>
        <Route path='/findpassword3' element={<FindPassword3/>}/>
        <Route path='/findId1' element={<FindID1/>}/>
        <Route path='/findId2' element={<FindId2/>}/>

        <Route path='/useraskpage' element={<UserAskPage/>}/>


      </Route>
    </Routes>
  </>
}

export default App;
