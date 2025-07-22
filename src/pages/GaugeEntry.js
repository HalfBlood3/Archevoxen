import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GaugeEntry() {
  const navigate = useNavigate();
  const hasLevel = !!localStorage.getItem('userLevel');

  const handleGauge = () => {
    navigate('/gauge-test');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginTop: 100 }}>
        <h2>Welcome!</h2>
        <p style={{ fontSize: 18, marginBottom: 20 }}>
          {hasLevel
            ? 'You have already taken the gauge test. Continue to your dashboard or retake the test.'
            : 'To personalize your experience, please take a quick gauge test.'}
        </p>
        <button onClick={handleGauge} style={{ fontSize: 20, padding: '12px 32px' }}>
          {hasLevel ? 'Continue' : 'Take Gauge Test'}
        </button>
      </div>
    </div>
  );
}
