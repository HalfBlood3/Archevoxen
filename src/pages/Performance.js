import React from 'react';
import { Link } from 'react-router-dom';

export default function Performance() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232946 0%, #16161a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Link to="/settings" style={{ position: 'absolute', top: 24, left: 24, color: '#16e0b3', fontSize: 22, textDecoration: 'none', fontWeight: 'bold' }}>← Settings</Link>
      <div style={{ maxWidth: 420, width: '100%', background: '#181a20', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#e7eaf6', marginBottom: 18 }}>Performance</h1>
        <ul style={{ color: '#b8c1ec', fontSize: 16, marginBottom: 0, width: '100%' }}>
          <li>Optimized images for fast loading</li>
          <li>Minimal network requests</li>
          <li>Responsive design for all devices</li>
          <li>Lightweight UI components</li>
        </ul>
        <p style={{ color: '#b8c1ec', fontSize: 15, marginTop: 18 }}>Your app is already highly optimized! 🚀</p>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Performance() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232946 0%, #16161a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Link to="/settings" style={{ position: 'absolute', top: 24, left: 24, color: '#16e0b3', fontSize: 22, textDecoration: 'none', fontWeight: 'bold' }}>← Settings</Link>
      <div style={{ maxWidth: 420, width: '100%', background: '#181a20', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#e7eaf6', marginBottom: 18 }}>Performance</h1>
        <ul style={{ color: '#b8c1ec', fontSize: 16, marginBottom: 0, width: '100%' }}>
          <li>Optimized images for fast loading</li>
          <li>Minimal network requests</li>
          <li>Responsive design for all devices</li>
          <li>Lightweight UI components</li>
        </ul>
        <p style={{ color: '#b8c1ec', fontSize: 15, marginTop: 18 }}>Your app is already highly optimized! 🚀</p>
      </div>
    </div>
  );
}
