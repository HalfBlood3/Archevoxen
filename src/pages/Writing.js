import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const writingPrompts = {
  Beginner: [
    { en: "Say 'My name is Ana' in Spanish.", es: "Me llamo Ana" },
    { en: "Write 'I have a dog and a cat.' in Spanish.", es: "Tengo un perro y un gato." },
    { en: "Translate: 'Today is sunny.'", es: "Hoy hace sol." },
    { en: "How do you say 'I like to read books.' in Spanish?", es: "Me gusta leer libros." },
    { en: "Write 'The book is on the table.' in Spanish.", es: "El libro está sobre la mesa." }
  ],
  Intermediate: [
    { en: "Translate: 'School starts at eight.'", es: "La escuela empieza a las ocho." },
    { en: "Write: 'My family and I travel to the city in the summer.' in Spanish.", es: "Mi familia y yo viajamos a la ciudad en verano." },
    { en: "Translate: 'Learning a new language can be fun and challenging.'", es: "Aprender un nuevo idioma puede ser divertido y desafiante." },
    { en: "How do you say 'The teacher teaches history and literature.' in Spanish?", es: "El profesor enseña historia y literatura." },
    { en: "Write: 'Sometimes I write letters to my friends in other countries.' in Spanish.", es: "A veces escribo cartas a mis amigos en otros países." }
  ],
  Advanced: [
    { en: "Translate: 'Technology has changed the way we communicate.'", es: "La tecnología ha cambiado la forma en que nos comunicamos." },
    { en: "Write: 'Sustainability is important for the future of global culture.' in Spanish.", es: "La sostenibilidad es importante para el futuro de la cultura global." },
    { en: "Translate: 'Creativity and research drive the development of society.'", es: "La creatividad y la investigación impulsan el desarrollo de la sociedad." },
    { en: "How do you say 'Philosophy helps us understand different perspectives of the world.' in Spanish?", es: "La filosofía nos ayuda a entender diferentes perspectivas del mundo." },
    { en: "Write: 'Effective communication is essential in both professional and personal settings.' in Spanish.", es: "La comunicación efectiva es esencial en el ámbito profesional y personal." }
  ]
};

function mockAICheck(user, correct) {
  // Simple mock: case-insensitive, ignores punctuation and accents
  const normalize = s => s.toLowerCase().replace(/[^a-záéíóúüñ ]/gi, '').trim();
  return normalize(user) === normalize(correct);
}

export default function Writing() {
  const navigate = useNavigate();
  const userLevel = localStorage.getItem('userLevel') || 'Beginner';
  const prompts = writingPrompts[userLevel] || writingPrompts.Beginner;
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
    return <div><h2>Writing Practice</h2><p>Great job! You finished all prompts.</p><button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button></div>;
  }

  return (
    <div>
      <h2>Writing Practice</h2>
      <p style={{ fontSize: 18, marginBottom: 10 }}>{prompts[idx].en}</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Write your answer in Spanish..."
        style={{ fontSize: 18 }}
      />
      <br />
      <button onClick={handleCheck} disabled={success} style={{ fontSize: 16, marginRight: 10 }}>Check</button>
      {success && (
        <button onClick={handleNext} style={{ fontSize: 16 }}>Next</button>
      )}
      <p style={{ color: success ? 'lightgreen' : 'salmon', minHeight: 24 }}>{feedback}</p>
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button>
    </div>
  );
}
