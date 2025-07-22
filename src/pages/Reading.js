import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import readings from '../data/readings';

export default function Reading() {
  const navigate = useNavigate();
  const level = localStorage.getItem('userLevel');
  const texts = readings[level] || [];
  const [show, setShow] = useState(Array(texts.length).fill(false));

  const handleShow = idx => {
    setShow(s => s.map((v, i) => (i === idx ? true : v)));
  };

  return (
    <div>
      <h2>Reading Practice ({level})</h2>
      {texts.map((item, i) => (
        <div key={i} style={{ margin: '30px 0', padding: 20, background: '#222', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: 22, marginBottom: 10 }}>{item.es}</p>
          {!show[i] ? (
            <button onClick={() => handleShow(i)} style={{ fontSize: 16, padding: '8px 18px' }}>Show English</button>
          ) : (
            <p style={{ fontSize: 18, color: '#bbb', marginTop: 10 }}>{item.en}</p>
          )}
        </div>
      ))}
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: 30, fontSize: 16 }}>Return to Dashboard</button>
    </div>
  );
}
