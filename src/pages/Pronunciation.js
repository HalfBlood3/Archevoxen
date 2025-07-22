import React from 'react';
import { useNavigate } from 'react-router-dom';

const phrases = {
  Beginner: "Hola, ¿cómo estás?",
  Intermediate: "Me gustaría aprender más sobre la cultura española.",
  Advanced: "La sostenibilidad y la creatividad impulsan el desarrollo de la sociedad."
};

export default function Pronunciation() {
  const navigate = useNavigate();
  const level = localStorage.getItem('userLevel') || 'Beginner';
  const phrase = phrases[level] || phrases.Beginner;
  const speak = (text) => {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };
  return (
    <div>
      <h2>Pronunciation Practice ({level})</h2>
      <button onClick={() => speak(phrase)}>
        Play: {phrase}
      </button>
      <br />
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button>
    </div>
  );
}
