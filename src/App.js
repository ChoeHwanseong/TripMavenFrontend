
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import React from 'react';
import Home from "./pages/home";
import Template from "./pages/template";
import './styles/App.css';


function App() {
  return <>
    <Routes>

      <Route element={<Template />}>
        <Route path="/" element={<Home />} />
        
      </Route>

    </Routes>

  </>
}

export default App;



