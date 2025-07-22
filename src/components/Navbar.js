import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <img
        src="/HackathonLogo2WithName1InBlack.png"
        alt="Archevoxen Logo"
        style={styles.logo}
      />
      <div style={styles.linksContainer}>
        {/* Home button removed */}
        <Link to="/gauge-test" style={styles.link}>Gauge Test</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <span style={styles.section}>Practice</span>
        <Link to="/vocabulary" style={styles.link}>Vocabulary</Link>
        <Link to="/reading" style={styles.link}>Reading</Link>
        <Link to="/pronunciation" style={styles.link}>Pronunciation</Link>
        <Link to="/writing" style={styles.link}>Writing</Link>
      </div>
    </nav>
  );
}
const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '10px 30px 10px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '30px',
    flexWrap: 'nowrap',
    minHeight: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 40,
    marginLeft: 0,
    alignSelf: 'center',
    flexShrink: 0
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    width: '100%'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '8px 14px',
    borderRadius: '5px',
    transition: 'background 0.2s',
    fontSize: 18
  },
  section: {
    color: '#bbb',
    fontWeight: 'bold',
    margin: '0 10px',
    fontSize: 16,
    letterSpacing: 1
  }
};
