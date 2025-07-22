import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const hasLevel = !!localStorage.getItem('userLevel');

  const handleStart = () => {
    localStorage.setItem('hasStarted', 'true');
    navigate('/gauge-test');
  };
  const handleContinue = () => {
    navigate('/dashboard');
  };
  const handleRetake = () => {
    navigate('/gauge-test');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'transparent' }}>
      <div style={{ maxWidth: 420, width: '100%', background: 'rgba(44,62,80,0.04)', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,62,80,0.06)', padding: '32px 24px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
        <h1 style={{ marginTop: 0, marginBottom: 12 }}>¡Bienvenido a Archevoxen!</h1>
        <p style={{ fontSize: 20, marginBottom: 22, textAlign: 'center' }}>Your AI-powered Spanish learning companion</p>
        {!hasLevel ? (
          <button onClick={handleStart} style={{ fontSize: 22, padding: '14px 40px', marginTop: 6, background: '#2c3e50', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Take Gauge Test</button>
        ) : (
          <>
            <button onClick={handleContinue} style={{ fontSize: 18, padding: '10px 32px', marginTop: 10, background: '#2c3e50', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Continue to Dashboard</button>
            <button onClick={handleRetake} style={{ fontSize: 15, padding: '8px 24px', marginTop: 8, background: '#3d5873', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Retake Gauge Test</button>
          </>
        )}
      </div>
    </div>
  );
}
