import React from 'react';

import './App.css';

import LoginPage from './Page/LoginPage';

import Services from './Page/Services';
import Singleunitstatus from './Page/Singleunitstatus';
import InstallationStatus from './Page/InstallationStatus';


import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Services" element={<Services/>}/>
        <Route path='/InstallationStatus'element={<InstallationStatus/>}/>
        <Route path='/Singleunitstatus' element={<Singleunitstatus/>}/>
        
       
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
