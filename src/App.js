
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./pages/home";
import Template from "./pages/template";
import { Component } from './pages/login/Component';


function App() {
  return <>
    <Routes>

      <Route element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Component />} />
      </Route>

    </Routes>

  </>
}

export default App;



