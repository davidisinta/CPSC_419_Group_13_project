import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/pages/home';
import Footer from './components/footer';
import Login from "./components/pages/login";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;