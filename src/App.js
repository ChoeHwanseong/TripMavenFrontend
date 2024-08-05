
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./pages/home";
import Template from "./pages/template";
import Login from "./pages/login/login";
import CSBoard from './pages/csBoard';
import './styles/App.css';
import Signup from './pages/login/SignUp';
import ProfilePage from './guidemypage/profile';
import MyPostDetails from './guidemypage/mypostdetails';
import MyPost from './guidemypage/mypost';
import Inquiry from './guidemypage/inquiry';
import AiServicePage from './guidemypage/mypageaiservice';



function App() {
  return <>
    <Routes>
      <Route element={<Template/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cs" element={<CSBoard/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/mypostdetail' element={<MyPostDetails/>}/>
        <Route path='/mypost' element={<MyPost/>}/>
        <Route path='/inquiry' element={<Inquiry/>}/>
        <Route path='/mypageai' element={<AiServicePage/>}/>
      </Route>
    </Routes>

  </>
}

export default App;