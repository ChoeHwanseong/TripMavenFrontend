
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./pages/home";
import Template from "./pages/template";
import Login from "./pages/login/login";
import CSBoard from './pages/csBoard';
import './styles/App.css';
import Signup from './pages/login/SignUp';
import UserProfile from './usermypage/userprofile';
import UserAsk from './usermypage/userask';
import UserReview from './usermypage/usrerreview';
import MemberList from './adminmypage/memberlist';
import AdminAsk from './adminmypage/adminask';
import AdminReport from './adminmypage/adminreport';
import AdminProfile from './adminmypage/adminprofile';

function App() {
  return <>
    <Routes>

      <Route element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cs" element={<CSBoard/>}></Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/userask' element={<UserAsk />} />
        <Route path='/userreview' element={<UserReview />} />
        <Route path='/memberlist' element={<MemberList />} />
        <Route path='/adminask' element={<AdminAsk />} />
        <Route path='/adminreport' element={<AdminReport />} />
        <Route path='/adminprofile' element={<AdminProfile />} />
      </Route>

    </Routes>

  </>
}

export default App;



