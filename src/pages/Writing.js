
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import readings from '../data/readings';
import vocabulary from '../data/vocabulary';
import { ThemeContext } from '../App';

function getWritingPrompts(level) {
  const vocab = vocabulary[level] || [];
  const read = readings[level] || [];
  const prompts = [];
  vocab.forEach(word => {
    prompts.push({ en: `Write the Spanish word for "${word.en}".`, es: word.es });
  });
  read.forEach(r => {
    prompts.push({ en: `Translate to Spanish: "${r.en}"`, es: r.es });
  });
  return prompts;
}

function mockAICheck(user, correct) {
  // Simple mock: case-insensitive, ignores punctuation and accents
  const normalize = s => s.toLowerCase().replace(/[^a-záéíóúüñ ]/gi, '').trim();
  return normalize(user) === normalize(correct);
}

function Writing() {
  const { darkMode } = useContext(ThemeContext);
  const [voiceReader] = React.useState(() => JSON.parse(localStorage.getItem('voiceReader') || 'false'));
  React.useEffect(() => {
    if (voiceReader) {
      window.speechSynthesis.cancel();
      const level = localStorage.getItem('userLevel') || 'Unassessed';
      const msg = new window.SpeechSynthesisUtterance('Writing practice. Level: ' + level + '. Translate the prompt to Spanish and check your answer.');
      window.speechSynthesis.speak(msg);
    }
  }, [voiceReader]);
  const navigate = useNavigate();
  const level = localStorage.getItem('userLevel') || 'Beginner';
  const prompts = getWritingPrompts(level);
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCheck = () => {
    if (mockAICheck(text, prompts[idx].es)) {
      setFeedback('Correct!');
      setSuccess(true);
    } else {
      setFeedback('Try again. Check your spelling and accents.');
      setSuccess(false);
    }
  };

  const handleNext = () => {
    setIdx(i => i + 1);
    setText('');
    setFeedback('');
    setSuccess(false);
  };

  if (idx >= prompts.length) {
    return <div style={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', color: darkMode ? '#e7eaf6' : '#232946', paddingTop: 40 }}><h2 style={{ color: darkMode ? '#e7eaf6' : '#2c3e50' }}>Writing Practice</h2><p>Great job! You finished all prompts.</p><button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button></div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', color: darkMode ? '#e7eaf6' : '#232946', paddingTop: 40, position: 'relative' }}>
      {/* Settings button */}
      <button
        onClick={() => navigate('/settings')}
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
      <h2 style={{ color: darkMode ? '#e7eaf6' : '#2c3e50' }}>Writing Practice</h2>
      <p style={{ fontSize: 18, marginBottom: 10 }}>{prompts[idx].en}</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Write your answer in Spanish..."
        style={{ fontSize: 18, width: '100%', borderRadius: 6, border: '1px solid #b8c1ec', marginBottom: 10, background: darkMode ? '#181a20' : '#fff', color: darkMode ? '#e7eaf6' : '#232946' }}
      />
      <br />
      <button onClick={handleCheck} disabled={success} style={{ fontSize: 16, marginRight: 10 }}>Check</button>
      {success && (
        <button onClick={handleNext} style={{ fontSize: 16 }}>Next</button>
      )}
      <p style={{ color: success ? '#16e0b3' : '#e74c3c', minHeight: 24 }}>{feedback}</p>
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button>
    </div>
  );
}

export default Writing;
