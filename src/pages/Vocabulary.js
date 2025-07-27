import React, { useState, useContext } from 'react';
import { playBeep } from '../utils/playBeep';
import { useNavigate } from 'react-router-dom';
import vocabulary from '../data/vocabulary';
import { ThemeContext } from '../App';

function Vocabulary() {
  const { darkMode } = useContext(ThemeContext);
  const [voiceReader] = React.useState(() => JSON.parse(localStorage.getItem('voiceReader') || 'false'));
  const navigate = useNavigate();
  const level = localStorage.getItem('userLevel');
  const words = vocabulary[level] || [];
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);


  // Voice Reader: read the current card
  React.useEffect(() => {
    if (voiceReader && words && words.length) {
      window.speechSynthesis.cancel();
      let text = '';
      if (flipped) {
        text = 'English: ' + words[current].en;
      } else {
        text = 'Spanish: ' + words[current].es;
      }
      const msg = new window.SpeechSynthesisUtterance('Vocabulary flashcard. ' + text);
      window.speechSynthesis.speak(msg);
    }
  }, [voiceReader, current, flipped, words]);

  if (!words.length) return <div style={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', color: darkMode ? '#e7eaf6' : '#232946', paddingTop: 40 }}>No vocabulary found for your level.</div>;

  const handleFlip = () => {
    playBeep();
    setFlipped(f => !f);
  };
  const handleNext = () => {
    playBeep();
    setCurrent(c => (c + 1) % words.length);
    setFlipped(false);
  };
  const handlePrev = () => {
    playBeep();
    setCurrent(c => (c - 1 + words.length) % words.length);
    setFlipped(false);
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
      <h2 style={{ color: darkMode ? '#e7eaf6' : '#2c3e50' }}>Vocabulary Flashcards ({level})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px 0' }}>
        <div
          onClick={handleFlip}
          style={{
            width: 300,
            height: 180,
            background: flipped ? '#3498db' : (darkMode ? '#222' : '#f3f6fa'),
            color: darkMode ? '#fff' : '#232946',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            cursor: 'pointer',
            marginBottom: 20,
            border: '2px solid #3498db',
            transition: 'background 0.3s',
          }}
        >
          {flipped ? words[current].en : words[current].es}
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <p style={{ marginTop: 16, color: darkMode ? '#bbb' : '#232946' }}>
          Click the card to flip between Spanish and English.
        </p>
        <button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button>
      </div>
    </div>
  );
}

export default Vocabulary;
