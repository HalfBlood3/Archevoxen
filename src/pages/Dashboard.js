import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const level = localStorage.getItem('userLevel');
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'transparent' }}>
      <div style={{ maxWidth: 420, width: '100%', marginTop: 40, background: 'rgba(44,62,80,0.04)', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,62,80,0.06)', padding: '32px 24px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: 10 }}>Your Level: {level}</h1>
        <p style={{ marginBottom: 24, textAlign: 'center' }}>Start learning with vocabulary, reading, pronunciation, and writing practice!</p>
        <nav style={{ margin: '0 0 10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
          <Link to="/vocabulary" style={linkStyle}>Vocabulary</Link>
          <Link to="/reading" style={linkStyle}>Reading</Link>
          <Link to="/pronunciation" style={linkStyle}>Pronunciation</Link>
          <Link to="/writing" style={linkStyle}>Writing</Link>
          <button
            onClick={() => navigate('/gauge-test')}
            style={{
              fontSize: 15,
              padding: '8px 24px',
              marginTop: 18,
              borderRadius: 6,
              background: '#3d5873',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(44,62,80,0.08)',
              transition: 'background 0.2s',
              width: 220
            }}
          >
            Retake Gauge Test
          </button>
        </nav>
      </div>
    </div>
  );
}

const linkStyle = {
  color: 'white',
  background: '#2c3e50',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '12px 24px',
  borderRadius: '5px',
  fontSize: 20,
  margin: '4px 0',
  display: 'block',
  width: 220,
  textAlign: 'center',
  transition: 'background 0.2s',
};
