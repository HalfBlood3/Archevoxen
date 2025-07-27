import React from 'react';
import { Link } from 'react-router-dom';

const tips = [
  'Practice a little every day for the best results.',
  'Try to use new words in real conversations.',
  'Don’t be afraid to make mistakes—every error is a learning opportunity!',
  'Review your streak and achievements to stay motivated.',
  'Use the accessibility settings for a more comfortable experience.',
];

export default function Tips() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232946 0%, #16161a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Link to="/home" style={{ position: 'absolute', top: 24, left: 24, color: '#16e0b3', fontSize: 22, textDecoration: 'none', fontWeight: 'bold' }}>← Home</Link>
      <div style={{ maxWidth: 420, width: '100%', background: '#181a20', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#e7eaf6', marginBottom: 18 }}>Tips & Motivation</h1>
        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
          {tips.map((tip, i) => (
            <li key={i} style={{ color: '#b8c1ec', fontSize: 17, marginBottom: 16, background: '#232946', borderRadius: 10, padding: '12px 16px', boxShadow: '0 2px 8px #16161a33' }}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
