'use client';

import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import MeetSetup from './components/MeetSetup';
import EventManager from './components/EventManager';
import ChecklistView from './components/ChecklistView';
import SwimmerSettings from './components/SwimmerSettings';
import { useMeet } from './hooks/useMeet';

export default function SwimMeetTracker() {
  const [isClient, setIsClient] = useState(false);
  const [currentView, setCurrentView] = useState('manage');
  const [showSettings, setShowSettings] = useState(false);
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
        {/* Header */}
        <div className="header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1>🏊‍♀️ {currentMeet.name}</h1>
              <div className="subtitle">
                {currentMeet.poolType && `${currentMeet.poolType} • `}
                {currentMeet.date && new Date(currentMeet.date).toLocaleDateString()}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={() => setShowSettings(true)}
                className="btn"
                style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 12px' }}
                title="Swimmer Settings"
              >
                <Settings style={{ width: '16px', height: '16px' }} />
              </button>
              <button
                onClick={() => {
                  if (confirm('This will clear all data and start over. Continue?')) {
                    clearMeet();
                  }
                }}
                className="change-meet-btn"
              >
                New Meet
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="view-toggle">
          <button
            className={currentView === 'manage' ? 'active' : ''}
            onClick={() => setCurrentView('manage')}
          >
            ⚙️ Manage Events
          </button>
          <button
            className={currentView === 'checklist' ? 'active' : ''}
            onClick={() => setCurrentView('checklist')}
          >
            📋 Event Checklist
          </button>
        </div>

        {/* Content */}
        <div className="content">
          {currentView === 'manage' ? <EventManager /> : <ChecklistView />}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SwimmerSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}