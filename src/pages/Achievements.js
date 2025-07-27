import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Achievements() {
  // Achievement logic: check localStorage for progress
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [firstPractice, setFirstPractice] = useState(false);

  useEffect(() => {
    setProgress(Number(localStorage.getItem('progress') || 0));
    setStreak(Number(localStorage.getItem('streak') || 0));
    setFirstPractice(!!localStorage.getItem('lastPractice'));
  }, []);

  // 1 hour = 60 min, progress is percent (0-100)
  const spentMinutes = Number(localStorage.getItem('minutesSpent') || 0);
  const achievements = [
    { icon: '🏅', label: 'First Practice', desc: 'Completed your first session!', unlocked: firstPractice },
    { icon: '🔥', label: '5-Day Streak', desc: 'Practiced 5 days in a row!', unlocked: streak >= 5 },
    { icon: '⏰', label: '1 Hour', desc: 'Spent 1 hour learning Spanish!', unlocked: spentMinutes >= 60 },
    { icon: '💯', label: '100% Progress', desc: 'Filled the progress bar!', unlocked: progress >= 100 },
  ];
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232946 0%, #16161a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Link to="/home" style={{ position: 'absolute', top: 24, left: 24, color: '#16e0b3', fontSize: 22, textDecoration: 'none', fontWeight: 'bold' }}>← Home</Link>
      <div style={{ maxWidth: 420, width: '100%', background: '#181a20', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#e7eaf6', marginBottom: 18 }}>Achievements</h1>
        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
          {achievements.map((a, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 18, background: a.unlocked ? '#232946' : '#23294655', borderRadius: 10, padding: '14px 18px', boxShadow: '0 2px 8px #16161a33', opacity: a.unlocked ? 1 : 0.5 }}>
              <span style={{ fontSize: 32, marginRight: 18 }}>{a.icon}</span>
              <div>
                <div style={{ color: a.unlocked ? '#16e0b3' : '#b8c1ec', fontWeight: 'bold', fontSize: 18 }}>{a.label}</div>
                <div style={{ color: '#b8c1ec', fontSize: 15 }}>{a.desc}</div>
                {!a.unlocked && <div style={{ color: '#ffb627', fontSize: 13, marginTop: 2 }}>Locked</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
