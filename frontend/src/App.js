import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/pages/home';
import Update from './components/pages/update';
import Footer from './components/footer';
import Login from "./components/pages/Login";
import About from "./components/pages/about";
<<<<<<< HEAD
import Map from "./components/pages/map"
import Profile from "./components/pages/profile";
=======
import Map from "./components/pages/map";
import Shift from "./components/pages/shift";
>>>>>>> main


function App() {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Determine which zone to display in the inventory table
  const [displayZone, setDisplayZone] = useState('all');
  // Function to set the zone to display
  const handleZoneChange = (zone) => {
    setDisplayZone(zone);
  };
  // Handle login status
  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      <Router>
        <NavBar handleZoneChange={handleZoneChange} setLoginStatus={handleLoginStatus} loginStatus={isLoggedIn} />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home currentZone={displayZone}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/update/:id" element={<Update/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/map" element={<Map/>}/>
=======
          <Route path="/" element={<Home currentZone={displayZone} />} />
          <Route path="/report" element={<Report />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
          <Route path="/shift" element={<Shift />} />
          <Route path="/profile" element={<Profile setLoginStatus={handleLoginStatus} loginStatus={isLoggedIn} />} />
>>>>>>> main
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;