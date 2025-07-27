import React from 'react';
export default function ProgressBar({ percent }) {
  return (
    <div style={{ width: '100%', background: 'var(--progress-bg)', borderRadius: 8, height: 18, margin: '18px 0' }} aria-label="Progress Bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div style={{ width: `${percent}%`, background: 'var(--progress-bar)', height: '100%', borderRadius: 8, transition: 'width 0.4s' }} />
    </div>
  );
}
