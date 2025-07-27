import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import readings from '../data/readings';
import { ThemeContext } from '../App';
import { playBeep } from '../utils/playBeep';

export default function Reading() {
  const { darkMode } = useContext(ThemeContext);
  const [voiceReader] = React.useState(() => JSON.parse(localStorage.getItem('voiceReader') || 'false'));
  const navigate = useNavigate();
  const level = localStorage.getItem('userLevel');
  const texts = readings[level] || [];
  const [show, setShow] = useState(Array(texts.length).fill(false));

  // Play a short beep sound for button feedback

  // Voice Reader: read the current passage
  React.useEffect(() => {
    if (voiceReader && texts && texts.length) {
      window.speechSynthesis.cancel();
      let idx = show.findIndex(s => !s);
      if (idx === -1) idx = 0;
      const text = 'Spanish: ' + texts[idx].es + (show[idx] ? '. English: ' + texts[idx].en : '');
      const msg = new window.SpeechSynthesisUtterance('Reading practice. ' + text);
      window.speechSynthesis.speak(msg);
    }
  }, [voiceReader, texts, show]);

  const handleShow = idx => {
    playBeep();
    setShow(s => s.map((v, i) => (i === idx ? true : v)));
  };

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', color: darkMode ? '#e7eaf6' : '#232946', paddingTop: 40, position: 'relative' }}>
      {/* Settings button */}
      <button
        onClick={() => { playBeep(); navigate('/settings'); }}
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          background: 'none',
          color: darkMode ? '#e7eaf6' : '#232946',
          border: 'none',
          borderRadius: 20,
          padding: 0,
          fontSize: 28,
          cursor: 'pointer',
          zIndex: 2,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Settings"
      >
        ⚙️
      </button>
      <h2 style={{ color: darkMode ? '#e7eaf6' : '#2c3e50' }}>Reading Practice ({level})</h2>
      {texts.map((item, i) => (
        <div key={i} style={{ margin: '30px 0', padding: 20, background: darkMode ? '#222' : '#f3f6fa', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: 22, marginBottom: 10 }}>{item.es}</p>
          {!show[i] ? (
            <button onClick={() => handleShow(i)} style={{ fontSize: 16, padding: '8px 18px' }}>Show English</button>
          ) : (
            <p style={{ fontSize: 18, color: darkMode ? '#bbb' : '#232946', marginTop: 10 }}>{item.en}</p>
          )}
        </div>
      ))}
      <button onClick={() => { playBeep(); navigate('/dashboard'); }} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button>
    </div>
  );
}
