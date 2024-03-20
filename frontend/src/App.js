import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/pages/home';
import Update from './components/pages/update';
import Footer from './components/footer';
import Report from './components/pages/report';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;