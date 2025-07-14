'use client';

import React, { useState, useEffect } from 'react';
import MeetSetup from './components/MeetSetup';
import EventManager from './components/EventManager';
import ChecklistView from './components/ChecklistView';
import SwimmerSettings from './components/SwimmerSettings';
import { useMeet } from './hooks/useMeet';

export default function SwimMeetTracker() {
  const [isClient, setIsClient] = useState(false);
  const [currentView, setCurrentView] = useState('manage');
  const { currentMeet, createMeet, clearMeet } = useMeet();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ padding: '20px', textAlign: 'center', paddingTop: '200px', color: 'white' }}>
          Loading...
        </div>
      </div>
    );
  }

  // Show meet setup if no current meet
  if (!currentMeet) {
    return <MeetSetup onCreateMeet={createMeet} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div className="container">
        {/* Fixed Header with Better Contrast */}
        <div className="app-header">
          <div className="header-content">
            <div className="meet-info">
              <h1>🏊‍♀️ {currentMeet.name}</h1>
              <div className="meet-subtitle">
                {currentMeet.poolType && `${currentMeet.poolType} • `}
                {currentMeet.date && new Date(currentMeet.date).toLocaleDateString()}
              </div>
            </div>
<div className="header-actions">
  <button
    onClick={() => {
      if (confirm('This will clear all data and start over. Continue?')) {
        clearMeet();
      }
    }}
    className="btn-ghost"
  >
    🗑️ Clear Meet
  </button>
</div>
          </div>
        </div>

        {/* Navigation with Settings Tab */}
        <div className="nav-container">
          <button
            className={`nav-button ${currentView === 'manage' ? 'active' : ''}`}
            onClick={() => setCurrentView('manage')}
          >
            ⚙️ Manage Events
          </button>
          <button
            className={`nav-button ${currentView === 'checklist' ? 'active' : ''}`}
            onClick={() => setCurrentView('checklist')}
          >
            📋 Event Checklist
          </button>
          <button
            className={`nav-button ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentView('settings')}
          >
            👤 Swimmers
          </button>
        </div>

        {/* Content */}
        <div className="content">
          {currentView === 'manage' && <EventManager />}
          {currentView === 'checklist' && <ChecklistView />}
          {currentView === 'settings' && <SwimmerSettings />}
        </div>
      </div>
    </div>
  );
}