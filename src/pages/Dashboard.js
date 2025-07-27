import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
export default function Dashboard() {
  const { darkMode } = useContext(ThemeContext);
  const [voiceReader] = React.useState(() => JSON.parse(localStorage.getItem('voiceReader') || 'false'));
  React.useEffect(() => {
    if (voiceReader) {
      window.speechSynthesis.cancel();
      const level = localStorage.getItem('userLevel') || 'Unassessed';
      const msg = new window.SpeechSynthesisUtterance('Dashboard. Your level is ' + level + '. Start learning with vocabulary, reading, pronunciation, and writing practice.');
      window.speechSynthesis.speak(msg);
    }
  }, [voiceReader]);
  const level = localStorage.getItem('userLevel');
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', paddingTop: 60 }}>
      {/* Back button centered at the bottom */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', left: 0, bottom: 96 }}>
        <button
          onClick={() => navigate('/home')}
          style={{ fontSize: 20, padding: '12px 48px', background: '#e0eafc', color: '#232946', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px #16161a22' }}
          aria-label="Back to Home"
        >
          Back
        </button>
      </div>
      {/* Settings icon button in top right */}
      <Link to="/settings" style={{ position: 'absolute', top: 24, right: 24, color: darkMode ? '#e7eaf6' : '#232946', fontSize: 28, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }} aria-label="Settings">⚙️</Link>
      <div style={{ maxWidth: 420, width: '100%', background: darkMode ? '#181a20' : 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: darkMode ? '#e7eaf6' : '#2c3e50', marginBottom: 10, letterSpacing: 1 }}>Your Level: {level || 'Unassessed'}</h1>
        <p style={{ color: darkMode ? '#b8c1ec' : '#232946', fontSize: 18, marginBottom: 24, textAlign: 'center' }}>Start learning with vocabulary, reading, pronunciation, and writing practice!</p>
        <nav style={{ margin: '20px 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%' }}>
          <Link to="/vocabulary" style={linkStyle}>Vocabulary</Link>
          <Link to="/reading" style={linkStyle}>Reading</Link>
          <Link to="/pronunciation" style={linkStyle}>Pronunciation</Link>
          <Link to="/writing" style={linkStyle}>Writing</Link>
        </nav>
      </div>
    </div>
  );
}
const linkStyle = {
  color: '#232946',
  background: '#16e0b3',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '14px 0',
  borderRadius: '8px',
  fontSize: 20,
  margin: '0',
  display: 'block',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 2px 8px #16161a33',
  transition: 'background 0.2s',
  outline: 'none',
  border: 'none',
};
