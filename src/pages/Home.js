
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { ThemeContext } from '../App';
export default function Home() {
  const { darkMode } = useContext(ThemeContext);
  const [voiceReader, setVoiceReader] = useState(() => JSON.parse(localStorage.getItem('voiceReader') || 'false'));
  const navigate = useNavigate();
  const hasLevel = !!localStorage.getItem('userLevel');

  // Streak logic
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('streak') || 0));
  const [lastPractice, setLastPractice] = useState(() => localStorage.getItem('lastPractice') || null);
  // Progress bar: fill in steps based on time spent in the app (5, 10, 20, 30, 60 min, etc)
  const TIME_MILESTONES = [1, 5, 10, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440]; // in minutes
  const [sessionStart] = useState(() => {
    const prev = localStorage.getItem('sessionStart');
    if (prev) return Number(prev);
    const now = Date.now();
    localStorage.setItem('sessionStart', now);
    return now;
  });
  const getTimeProgress = () => {
    const elapsedMinutes = (Date.now() - sessionStart) / 60000;
    let filled = 0;
    for (let i = 0; i < TIME_MILESTONES.length; i++) {
      if (elapsedMinutes >= TIME_MILESTONES[i]) filled = i + 1;
    }
    return Math.round((filled / TIME_MILESTONES.length) * 100);
  };
  const [progress, setProgress] = useState(getTimeProgress());
  // Track minutes spent for achievements
  useEffect(() => {
    const interval = setInterval(() => {
      const prev = Number(localStorage.getItem('minutesSpent') || 0);
      localStorage.setItem('minutesSpent', prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(getTimeProgress());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, [sessionStart]);
  // Example: Call this function when a lesson is completed elsewhere in the app
  // function completeLesson() {
  //   setLessonsCompleted(prev => {
  //     const updated = prev + 1;
  //     localStorage.setItem('lessonsCompleted', updated);
  //     return updated;
  //   });
  // }

  // Helper to check if two dates are the same day
  function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  // Call this when user practices (e.g., visits Home)
  useEffect(() => {
    const today = new Date();
    const last = lastPractice ? new Date(lastPractice) : null;
    if (!last || !isSameDay(today, last)) {
      // If last practice was yesterday, increment streak
      if (last && (today - last) / (1000 * 60 * 60 * 24) < 2 && today.getDate() !== last.getDate()) {
        setStreak(prev => {
          const newStreak = prev + 1;
          localStorage.setItem('streak', newStreak);
          return newStreak;
        });
      } else {
        // If missed a day or first time, reset streak to 1
        setStreak(1);
        localStorage.setItem('streak', 1);
      }
      setLastPractice(today.toISOString());
      localStorage.setItem('lastPractice', today.toISOString());
    }
    // Mark first practice for achievements
    if (!localStorage.getItem('firstPractice')) {
      localStorage.setItem('firstPractice', 'true');
    }
  }, []);
  // Save progress percent for achievements
  useEffect(() => {
    localStorage.setItem('progress', progress);
  }, [progress]);
  // Voice reader accessibility: read out main content if enabled
  useEffect(() => {
    if (voiceReader) {
      window.speechSynthesis.cancel();
      const msg = new window.SpeechSynthesisUtterance('Welcome to your Spanish learning dashboard. Your current streak is ' + streak + ' days. Progress bar is at ' + progress + ' percent.');
      window.speechSynthesis.speak(msg);
    }
  }, [voiceReader, streak, progress]);

  const handleStart = () => {
    localStorage.setItem('hasStarted', 'true');
    navigate('/gauge-test');
  };
  const handleContinue = () => {
    navigate('/dashboard');
  };
  const handleRetake = () => {
    navigate('/gauge-test');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: darkMode ? 'linear-gradient(135deg, #181a20 0%, #101117 100%)' : 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', position: 'relative' }}>
      {/* Settings icon button in top right */}
      <Link to="/settings" style={{ position: 'absolute', top: 24, right: 24, color: darkMode ? '#e7eaf6' : '#232946', fontSize: 28, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }} aria-label="Settings">⚙️</Link>
      <div style={{ maxWidth: 420, width: '100%', background: darkMode ? '#181a20' : 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(44,62,80,0.18)', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* User image at the top */}
        <img
          src="/HackathonLogo2WithName1InBlack.png"
          alt="Archevoxen Logo"
          style={{ width: 120, height: 120, marginBottom: 18, marginTop: 0, borderRadius: 24 }}
        />
        <ProgressBar percent={progress} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span role="img" aria-label="streak" style={{ fontSize: 24 }}>🔥</span>
          <span style={{ color: '#ffb627', fontWeight: 'bold', fontSize: 18 }}>Streak: {streak} day{streak === 1 ? '' : 's'}</span>
          <Link to="/streaks" style={{ color: '#16e0b3', fontWeight: 'bold', marginLeft: 8, fontSize: 16 }}>View</Link>
        </div>
        <div style={{ marginTop: 24, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {!hasLevel ? (
            <button onClick={handleStart} style={{ fontSize: 22, padding: '14px 40px', marginTop: 6, background: '#16e0b3', color: '#232946', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', minWidth: 220, maxWidth: 320, width: '80%', boxShadow: '0 2px 8px #16161a33', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} aria-label="Take Gauge Test">Take Gauge Test</button>
          ) : (
            <>
              <button onClick={handleContinue} style={{ fontSize: 18, padding: '10px 32px', marginTop: 10, background: '#16e0b3', color: '#232946', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', minWidth: 220, maxWidth: 320, width: '80%', boxShadow: '0 2px 8px #16161a33', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} aria-label="Continue to Dashboard">Continue to Dashboard</button>
              <button onClick={handleRetake} style={{ fontSize: 15, padding: '8px 24px', marginTop: 8, background: '#393e46', color: '#e7eaf6', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', minWidth: 220, maxWidth: 320, width: '80%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} aria-label="Retake Gauge Test">Retake Gauge Test</button>
            </>
          )}
          <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/achievements" style={{ background: '#232946', color: '#16e0b3', fontWeight: 'bold', borderRadius: 8, padding: '10px 18px', fontSize: 16, textDecoration: 'none', boxShadow: '0 2px 8px #16161a33', marginBottom: 6 }}>Achievements</Link>
            <Link to="/tips" style={{ background: '#232946', color: '#16e0b3', fontWeight: 'bold', borderRadius: 8, padding: '10px 18px', fontSize: 16, textDecoration: 'none', boxShadow: '0 2px 8px #16161a33', marginBottom: 6 }}>Tips & Motivation</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

