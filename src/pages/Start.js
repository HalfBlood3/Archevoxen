
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

export default function Start() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/home');
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div style={{ maxWidth: 420, width: '100%', background: darkMode ? '#181a20' : 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* User image at the top */}
        <img
          src="/HackathonLogo2WithName1InBlack.png"
          alt="Archevoxen Logo"
          style={{ width: 200, height: 200, marginBottom: 28, marginTop: 0, borderRadius: 40 }}
        />
        <h1 style={{ marginTop: 0, marginBottom: 12, color: darkMode ? '#e7eaf6' : '#2c3e50' }}>Welcome to Archevoxen</h1>
        <p style={{ fontSize: 20, marginBottom: 22, textAlign: 'center', color: darkMode ? '#b8c1ec' : '#232946' }}>Your AI-powered learning companion</p>
        <button onClick={handleStart} style={{ fontSize: 22, padding: '14px 40px', marginTop: 24, background: '#16e0b3', color: '#232946', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>Start</button>
      </div>
    </div>
  );
}