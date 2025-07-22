// Use logo from public folder
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';
import GaugeEntry from './pages/GaugeEntry';
import GaugeTest from './pages/GaugeTest';
import Dashboard from './pages/Dashboard';
import Vocabulary from './pages/Vocabulary';
import Reading from './pages/Reading';
import Pronunciation from './pages/Pronunciation';
import Writing from './pages/Writing';


import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  // On mount, if not on home, redirect to home
  useEffect(() => {
    if (window.performance && window.performance.navigation && window.performance.navigation.type === 1) {
      // If this is a reload, always go to start screen
      if (location.pathname !== '/start') {
        navigate('/start', { replace: true });
      }
    }
    // eslint-disable-next-line
  }, []);
  const isStartScreen = location.pathname === '/start';
  return (
    <>
      {!isStartScreen && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0 20px 0' }}>
          <img src={process.env.PUBLIC_URL + '/HackathonLogo2WithName1InBlack.png'} alt="Logo" style={{ width: 120, height: 120, objectFit: 'contain' }} />
        </div>
      )}
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/" element={<Home />} />
        <Route path="/gauge-entry" element={<GaugeEntry />} />
        <Route path="/gauge-test" element={<GaugeTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/pronunciation" element={<Pronunciation />} />
        <Route path="/writing" element={<Writing />} />
        {/* Redirect all unknown routes to start */}
        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
