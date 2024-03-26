import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/pages/home';
import Update from './components/pages/update';
import Footer from './components/footer';

import Profile from "./components/pages/profile";
import Report from "./components/pages/report";
import About from "./components/pages/about";


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/report" element={<Report />} />

        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;