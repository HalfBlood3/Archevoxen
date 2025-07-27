
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

const phrases = {
  Beginner: [
    "Hola, ¿cómo estás?",
    "Me llamo Ana.",
    "Tengo un perro y un gato.",
    "El libro está sobre la mesa.",
    "La escuela está cerca de mi casa."
  ],
  Intermediate: [
    "Me gustaría aprender más sobre la cultura española.",
    "La familia y yo viajamos a la ciudad en verano.",
    "El profesor enseña historia y literatura.",
    "El tiempo hoy es perfecto para caminar en el parque.",
    "Mi hermano es muy amable y le gusta ayudar a los demás."
  ],
  Advanced: [
    "La sostenibilidad y la creatividad impulsan el desarrollo de la sociedad.",
    "La tecnología ha cambiado la forma en que nos comunicamos.",
    "La innovación requiere creatividad y trabajo en equipo.",
    "El liderazgo y la colaboración son claves para el éxito en proyectos grandes.",
    "La filosofía nos ayuda a entender diferentes perspectivas del mundo."
  ]
};

function useSpeechRecognition({ onResult, lang = 'es-ES' }) {
  const [listening, setListening] = useState(false);
  let recognition = null;
  if ('webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  }

  const start = () => {
    if (!recognition) return;
    setListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      setListening(false);
      if (event.results && event.results[0] && event.results[0][0]) {
        onResult(event.results[0][0].transcript);
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };
  return [listening, start];
}

export default function Pronunciation() {
  const { darkMode } = useContext(ThemeContext);
  const [voiceReader] = React.useState(() => JSON.parse(localStorage.getItem('voiceReader') || 'false'));
  React.useEffect(() => {
    if (voiceReader) {
      window.speechSynthesis.cancel();
      const level = localStorage.getItem('userLevel') || 'Unassessed';
      const msg = new window.SpeechSynthesisUtterance('Pronunciation practice. Level: ' + level + '. Listen to the phrase and try to repeat it.');
      window.speechSynthesis.speak(msg);
    }
  }, [voiceReader]);
  const navigate = useNavigate();
  const level = localStorage.getItem('userLevel') || 'Beginner';
  const levelPhrases = phrases[level] || phrases.Beginner;

  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [userSaid, setUserSaid] = useState('');
  const [listening, startListening] = useSpeechRecognition({
    onResult: (result) => {
      setUserSaid(result);
      // Simple check: ignore case, accents, punctuation
      const normalize = s => s.toLowerCase().replace(/[^a-záéíóúüñ ]/gi, '').trim();
      if (normalize(result) === normalize(levelPhrases[idx])) {
        setFeedback('Great pronunciation!');
      } else {
        setFeedback(`You said: "${result}". Try again or go to the next audio.`);
      }
    }
  });

  const speak = (text) => {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    setIdx(i => (i + 1) % levelPhrases.length);
    setFeedback('');
    setUserSaid('');
  };

  const handlePrev = () => {
    setIdx(i => (i - 1 + levelPhrases.length) % levelPhrases.length);
    setFeedback('');
    setUserSaid('');
  };

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
      <h2 style={{ color: darkMode ? '#e7eaf6' : '#2c3e50' }}>Pronunciation Practice ({level})</h2>
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => speak(levelPhrases[idx])}>
          Play: {levelPhrases[idx]}
        </button>
        <button onClick={handlePrev} style={{ marginLeft: 10 }}>Previous</button>
        <button onClick={handleNext} style={{ marginLeft: 10 }}>Next</button>
      </div>
      <div>
        <button onClick={startListening} disabled={listening} style={{ fontSize: 16 }}>
          {listening ? 'Listening...' : 'Pronounce Now'}
        </button>
      </div>
      <p style={{ marginTop: 16, color: feedback === 'Great pronunciation!' ? '#16e0b3' : '#e74c3c' }}>{feedback}</p>
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button>
    </div>
  );
}

