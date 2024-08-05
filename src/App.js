
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./pages/home";
import Template from "./pages/template";
import Login from "./pages/login/login";
import CSBoard from './pages/csBoard';
import './styles/App.css';
import Login from './pages/login/login';
import Signup from './pages/login/SignUp';



function App() {
  return <>
    <Routes>

      <Route element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cs" element={<CSBoard/>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

    </Routes>

  </>
}

export default App;



