
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Voice reader for accessibility
function useVoiceReaderStreak(streak) {
  useEffect(() => {
    const voiceReader = JSON.parse(localStorage.getItem('voiceReader') || 'false');
    if (voiceReader) {
      window.speechSynthesis.cancel();
      const msg = new window.SpeechSynthesisUtterance(`Current streak: ${streak} day${streak === 1 ? '' : 's'}. Keep practicing every day to maintain your streak and earn rewards!`);
      window.speechSynthesis.speak(msg);
    }
  }, [streak]);
}

export default function Streaks() {
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('streak') || 0));
  useVoiceReaderStreak(streak);
  const navigate = useNavigate();
  useEffect(() => {
    setStreak(Number(localStorage.getItem('streak') || 0));
  }, []);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #232946 0%, #16161a 100%)' }}>
      <div style={{ maxWidth: 420, width: '100%', background: '#232946', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            alignSelf: 'flex-start',
            marginBottom: 18,
            background: 'none',
            border: 'none',
            color: '#e7eaf6',
            fontSize: 28,
            cursor: 'pointer',
            padding: 0
          }}
          aria-label="Back"
        >
          ←
        </button>
        <h1 style={{ color: '#ffb627', marginBottom: 18 }}>🔥 Streaks</h1>
        <p style={{ fontSize: 22, color: '#e7eaf6', marginBottom: 12 }}>Current Streak: <b>{streak} day{streak === 1 ? '' : 's'}</b></p>
        <p style={{ color: '#b8c1ec', fontSize: 16 }}>Keep practicing every day to maintain your streak and earn rewards!</p>
      </div>
    </div>
  );
}
