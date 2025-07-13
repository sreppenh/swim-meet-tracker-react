'use client';

import React, { useState } from 'react';

export default function MeetSetup({ onCreateMeet }) {
  const [meetName, setMeetName] = useState('');
  const [poolType, setPoolType] = useState('');
  const [meetDate, setMeetDate] = useState('');

  const handleSubmit = () => {
    if (!meetName.trim()) {
      alert('Please enter a meet name');
      return;
    }

    onCreateMeet({
      name: meetName.trim(),
      poolType: poolType || undefined,
      date: meetDate ? new Date(meetDate) : undefined,
    });
  };

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-title">🏊‍♀️</div>
        <h1 className="splash-title">Swim Meet Tracker</h1>
        <p className="splash-subtitle">Track swimmers' events, heats, and lanes</p>
        
        <div className="meet-setup-form">
          <div className="form-group">
            <label htmlFor="meetName">Meet Name</label>
            <input 
              type="text" 
              id="meetName" 
              value={meetName}
              onChange={(e) => setMeetName(e.target.value)}
              placeholder="e.g., Winter Championship, League Finals" 
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="poolType">Pool Type (optional)</label>
            <select 
              id="poolType"
              value={poolType}
              onChange={(e) => setPoolType(e.target.value)}
            >
              <option value="">Select pool type...</option>
              <option value="SCY">Short Course Yards (SCY)</option>
              <option value="SCM">Short Course Meters (SCM)</option>
              <option value="LCM">Long Course Meters (LCM)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="meetDate">Meet Date (optional)</label>
            <input 
              type="date" 
              id="meetDate"
              value={meetDate}
              onChange={(e) => setMeetDate(e.target.value)}
            />
          </div>
          
          <button onClick={handleSubmit} className="start-meet-btn">
            Start Tracking Events 🚀
          </button>
        </div>
      </div>
    </div>
  );
}