import logo from './logo.svg';
import './App.css';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { playBeep } from './utils/playBeep';
// import Onboarding from './pages/Onboarding';
import Start from './pages/Start';
import Home from './pages/Home';
import Streaks from './pages/Streaks';
import Settings from './pages/Settings';
import GaugeEntry from './pages/GaugeEntry';
import GaugeTest from './pages/GaugeTest';
import Dashboard from './pages/Dashboard';
import Vocabulary from './pages/Vocabulary';
import Reading from './pages/Reading';
import Pronunciation from './pages/Pronunciation';
import Writing from './pages/Writing';
import Achievements from './pages/Achievements';
import Tips from './pages/Tips';
  // import Accessibility from './pages/Accessibility';
  // import Performance from './pages/Performance';

// import Navbar from './components/Navbar';
// import AuthPage from './pages/Auth';



// Theme context for dark/light mode and animations
export const ThemeContext = createContext({ darkMode: true, setDarkMode: () => {}, fontSize: 18, setFontSize: () => {}, animations: true, setAnimations: () => {} });

function AppWrapper() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === null ? true : JSON.parse(stored);
  });
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem('fontSize')) || 18);
  const [animations, setAnimations] = useState(() => {
    const stored = localStorage.getItem('animations');
    return stored === null ? true : JSON.parse(stored);
  });


  useEffect(() => {
    // On hard reload, always go to start
    if (window.performance && window.performance.navigation.type === 1) {
      if (window.location.pathname !== '/') {
        window.location.replace('/');
      }
    }
  }, []);

  // Add global button click sound for accessibility
  useEffect(() => {
    function isClickable(el) {
      if (!el) return false;
      const tag = el.tagName;
      if (tag === 'BUTTON' || tag === 'A') return true;
      if (tag === 'INPUT') {
        const type = el.type;
        return type === 'button' || type === 'submit' || type === 'reset';
      }
      if (el.getAttribute('role') === 'button') return true;
      if (el.tabIndex >= 0) return true;
      return false;
    }
    function handleClickSound(e) {
      if (e.button !== 0) return;
      // Only play beep if voiceReader is ON
      const voiceReader = JSON.parse(localStorage.getItem('voiceReader') || 'false');
      if (!voiceReader) return;
      let el = e.target;
      // Traverse up to find clickable ancestor
      while (el && el !== document.body) {
        if (isClickable(el)) {
          playBeep();
          break;
        }
        el = el.parentElement;
      }
    }
    document.addEventListener('mousedown', handleClickSound, true);
    return () => document.removeEventListener('mousedown', handleClickSound, true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.body.style.setProperty('--font-size-main', fontSize + 'px');
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('animations', JSON.stringify(animations));
    document.body.style.setProperty('--animations-enabled', animations ? '1' : '0');
  }, [animations]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, fontSize, setFontSize, animations, setAnimations }}>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gauge-test" element={<GaugeTest />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/pronunciation" element={<Pronunciation />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/tips" element={<Tips />} />
  {/* <Route path="/accessibility" element={<Accessibility />} /> */}
  {/* <Route path="/performance" element={<Performance />} /> */}
        {/* Redirect all unknown routes to start */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeContext.Provider>
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
