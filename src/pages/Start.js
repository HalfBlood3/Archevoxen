import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Start() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0 20px 0' }}>
        <img src={process.env.PUBLIC_URL + '/HackathonLogo2WithName1InBlack.png'} alt="Logo" style={{ width: 220, height: 220, objectFit: 'contain' }} />
      </div>
      <h1>Welcome to Archevoxen</h1>
      <p style={{ fontSize: 20, marginBottom: 30 }}>Your AI-powered Spanish learning companion</p>
      <button onClick={handleStart} style={{ fontSize: 22, padding: '14px 40px', marginTop: 10 }}>Start</button>
    </div>
  );
}
