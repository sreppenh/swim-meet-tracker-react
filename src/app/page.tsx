'use client';

import React, { useState, useEffect } from 'react';
import MeetSetup from './components/MeetSetup';
import EventManager from './components/EventManager';
import ChecklistView from './components/ChecklistView';
import Settings from './components/Settings';
import { useMeet } from './hooks/useMeet';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';


function SwimMeetTrackerContent() {
  const [isClient, setIsClient] = useState(false);
  const [currentView, setCurrentView] = useState('manage');
  const { currentMeet, createMeet, clearMeet } = useMeet();

  const { theme } = useTheme();
  console.log('Page.tsx - Current theme from hook:', theme); // ADD THIS LINE

  // ADD THIS - CSS custom properties for the theme
  const cssVariables = {
    '--theme-primary': theme.primary,
    '--theme-secondary': theme.secondary,
    '--theme-background': theme.background
  };

  // ADD THIS: Update CSS variables on the document root when theme changes
  useEffect(() => {
    const root = document.documentElement;
    console.log('useEffect triggered! Theme changed to:', theme);
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-background', theme.background);
  }, [theme]);

  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!isClient) {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.primary} 100%)` }}>
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
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.primary} 100%)`,
      padding: '20px',
      ...cssVariables
    }}>
      <div className="container">


        {/* Blue header bar */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          padding: '20px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5em' }}>🏊‍♀️ Swim Meet Tracker</h1>
        </div>

        {/* White info bar */}
        <div style={{
          background: 'white',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ color: theme.primary, fontWeight: 600, fontSize: '0.9em' }}>
            {currentMeet.name} {currentMeet.poolType && `(${currentMeet.poolType})`} • {currentMeet.date && new Date(currentMeet.date).toLocaleDateString()}
          </div>
          <button
            onClick={() => {
              if (confirm('This will clear all data and start over. Continue?')) {
                clearMeet();
              }
            }}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9em'
            }}
          >
            Clear
          </button>
        </div>

        <div className="nav-container">
          <button
            className={`nav-button ${currentView === 'manage' ? 'active' : ''}`}
            onClick={() => setCurrentView('manage')}
          >
            🏊 Events
          </button>
          <button
            className={`nav-button ${currentView === 'checklist' ? 'active' : ''}`}
            onClick={() => setCurrentView('checklist')}
          >
            📋 Checklist
          </button>
          <button
            className={`nav-button ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentView('settings')}
          >
            ⚙️ Settings
          </button>
        </div>




        {/* Content */}
        <div className="content">
          {currentView === 'manage' && <EventManager />}
          {currentView === 'checklist' && <ChecklistView />}
          {currentView === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default function SwimMeetTracker() {
  return (
    <ThemeProvider>
      <SwimMeetTrackerContent />
    </ThemeProvider>
  );
}