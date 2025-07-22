import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const questions = [
  { q: "What does 'hola' mean?", options: ["Hello", "Goodbye"], answer: 0 },
  { q: "What is the Spanish word for 'dog'?", options: ["perro", "gato"], answer: 0 },
  { q: "How do you say 'thank you' in Spanish?", options: ["gracias", "por favor"], answer: 0 },
  { q: "What is the plural of 'libro'?", options: ["libros", "libres"], answer: 0 },
  { q: "Which word means 'family'?", options: ["familia", "familiar"], answer: 0 },
  { q: "How do you say 'to teach' in Spanish?", options: ["enseñar", "aprender"], answer: 0 },
  { q: "Which is a more advanced word?", options: ["tecnología", "gato"], answer: 0 },
  { q: "What does 'sostenibilidad' mean?", options: ["sustainability", "solidarity"], answer: 0 },
  { q: "Complete: Creativity and ___ drive development.", options: ["research", "family"], answer: 0 },
  { q: "Which is an advanced word?", options: ["argumento", "amigo"], answer: 0 }
];
export default function GaugeTest() {
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const handleAnswer = (index) => {
    if (index === questions[step].answer) setScore(score + 1);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const level = score <= 3 ? 'Beginner' : score <= 7 ? 'Intermediate' : 'Advanced';
      localStorage.setItem('userLevel', level);
      navigate('/dashboard');
    }
  };
  return (
    <div>
      <h2>{questions[step].q}</h2>
      {questions[step].options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
      ))}
    </div>
  );
}
