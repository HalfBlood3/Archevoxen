
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

// Voice reader for accessibility
function useVoiceReaderSettings(sound, fontSize, darkMode, animations, voiceReader) {
  useEffect(() => {
    if (voiceReader) {
      window.speechSynthesis.cancel();
      const msg = new window.SpeechSynthesisUtterance(`Settings. Sound: ${sound ? 'on' : 'off'}. Font size: ${fontSize} pixels. Dark mode: ${darkMode ? 'on' : 'off'}. Animations: ${animations ? 'on' : 'off'}. Voice reader: ${voiceReader ? 'on' : 'off'}.`);
      window.speechSynthesis.speak(msg);
    }
  }, [sound, fontSize, darkMode, animations, voiceReader]);
}


export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, fontSize, setFontSize, animations, setAnimations } = useContext(ThemeContext);
  const [sound, setSound] = useState(() => JSON.parse(localStorage.getItem('sound') || 'true'));
  const [voiceReader, setVoiceReader] = useState(() => JSON.parse(localStorage.getItem('voiceReader') || 'false'));
  useVoiceReaderSettings(sound, fontSize, darkMode, animations, voiceReader);

  useEffect(() => { localStorage.setItem('sound', sound); }, [sound]);
  useEffect(() => {
    localStorage.setItem('voiceReader', voiceReader);
    if (!voiceReader) {
      window.speechSynthesis.cancel();
    }
  }, [voiceReader]);

  const handleBack = () => {
    // If coming from Accessibility or Performance, go to Home instead of history back
    const referrer = document.referrer;
    const fromAccessibility = window.location.hash.includes('accessibility');
    const fromPerformance = window.location.hash.includes('performance');
    if (fromAccessibility || fromPerformance) {
      navigate('/home');
    } else {
      navigate(-1);
    }
  };

  const handleReset = () => {
    setDarkMode(true);
    setAnimations(true);
    localStorage.removeItem('sound');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('animations');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div style={{ maxWidth: 420, width: '100%', background: darkMode ? '#181a20' : 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: darkMode ? '#e7eaf6' : '#2c3e50', marginBottom: 18 }}>Settings</h1>
        <label style={{ fontSize: 16, marginBottom: 16, color: darkMode ? '#e7eaf6' : '#2c3e50' }}>
          <input type="checkbox" checked={sound} onChange={e => setSound(e.target.checked)} /> Enable Sound
        </label>
        <label style={{ fontSize: 16, marginBottom: 16, color: darkMode ? '#e7eaf6' : '#2c3e50' }}>
          Font Size:
          <input type="range" min={14} max={28} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} style={{ marginLeft: 10 }} />
          <span style={{ marginLeft: 8 }}>{fontSize}px</span>
        </label>
        <label style={{ fontSize: 16, marginBottom: 16, color: darkMode ? '#e7eaf6' : '#2c3e50' }}>
          <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /> Dark Mode
        </label>
        <label style={{ fontSize: 16, marginBottom: 16, color: darkMode ? '#e7eaf6' : '#2c3e50' }}>
          <input type="checkbox" checked={animations} onChange={e => setAnimations(e.target.checked)} /> Enable Animations
        </label>
        <label style={{ fontSize: 16, marginBottom: 16, color: darkMode ? '#e7eaf6' : '#2c3e50' }}>
          <input type="checkbox" checked={voiceReader} onChange={e => setVoiceReader(e.target.checked)} /> Enable Voice Reader (Accessibility)
        </label>
        <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={handleReset} style={{ fontSize: 16, padding: '10px 24px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>Reset</button>
          <button onClick={handleBack} style={{ fontSize: 16, padding: '10px 24px', background: darkMode ? '#232946' : '#e0eafc', color: '#16e0b3', border: '1px solid #16e0b3', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>Back</button>
        </div>
      </div>
    </div>
  );
}
