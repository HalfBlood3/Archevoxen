// File removed, content merged into Settings.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Accessibility() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232946 0%, #16161a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Link to="/settings" style={{ position: 'absolute', top: 24, left: 24, color: '#16e0b3', fontSize: 22, textDecoration: 'none', fontWeight: 'bold' }}>← Settings</Link>
      <div style={{ maxWidth: 420, width: '100%', background: '#181a20', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#e7eaf6', marginBottom: 18 }}>Accessibility</h1>
        <p style={{ color: '#b8c1ec', fontSize: 16, marginBottom: 18 }}>Adjust font size and color contrast for a more comfortable experience.</p>
        {/* Example controls, can be expanded */}
        <div style={{ width: '100%', marginBottom: 18 }}>
          <label style={{ color: '#e7eaf6', fontWeight: 'bold', fontSize: 16 }}>Font Size</label>
          <input type="range" min="14" max="28" defaultValue="18" style={{ width: '100%' }} aria-label="Font Size" />
        </div>
        <div style={{ width: '100%' }}>
          <label style={{ color: '#e7eaf6', fontWeight: 'bold', fontSize: 16 }}>Contrast</label>
          <select style={{ width: '100%', padding: 8, borderRadius: 6, fontSize: 16 }} aria-label="Contrast">
            <option>Default</option>
            <option>High Contrast</option>
            <option>Low Contrast</option>
          </select>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';

export default function Accessibility() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232946 0%, #16161a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Link to="/settings" style={{ position: 'absolute', top: 24, left: 24, color: '#16e0b3', fontSize: 22, textDecoration: 'none', fontWeight: 'bold' }}>← Settings</Link>
      <div style={{ maxWidth: 420, width: '100%', background: '#181a20', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#e7eaf6', marginBottom: 18 }}>Accessibility</h1>
        <p style={{ color: '#b8c1ec', fontSize: 16, marginBottom: 18 }}>Adjust font size and color contrast for a more comfortable experience.</p>
        {/* Example controls, can be expanded */}
        <div style={{ width: '100%', marginBottom: 18 }}>
          <label style={{ color: '#e7eaf6', fontWeight: 'bold', fontSize: 16 }}>Font Size</label>
          <input type="range" min="14" max="28" defaultValue="18" style={{ width: '100%' }} aria-label="Font Size" />
        </div>
        <div style={{ width: '100%' }}>
          <label style={{ color: '#e7eaf6', fontWeight: 'bold', fontSize: 16 }}>Contrast</label>
          <select style={{ width: '100%', padding: 8, borderRadius: 6, fontSize: 16 }} aria-label="Contrast">
            <option>Default</option>
            <option>High Contrast</option>
            <option>Low Contrast</option>
          </select>
        </div>
      </div>
    </div>
  );
}
