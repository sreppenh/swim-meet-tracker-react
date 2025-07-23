'use client';

import React, { useState } from 'react';
import { useSwimmers } from '../hooks/useSwimmers';
import { useEvents } from '../hooks/useEvents';
import { useMeet } from '../hooks/useMeet';

function abbreviateEventName(eventName) {
  if (!eventName) return eventName;

  return eventName
    .replace(/Freestyle Relay/g, 'Free Relay')
    .replace(/Medley Relay/g, 'Med Relay')
    .replace(/Individual Medley/g, 'IM')
    .replace(/Freestyle/g, 'Free')
    .replace(/Backstroke/g, 'Back')
    .replace(/Breaststroke/g, 'Breast')
    .replace(/Butterfly/g, 'Fly');
}



function isRelayEvent(eventName) {
  if (!eventName) return false;
  return eventName.toLowerCase().includes('relay');
}

function getEventIcon(eventName, relayPosition) {
  const isRelay = isRelayEvent(eventName);
  if (isRelay) {
    return relayPosition ? `🤝 (${relayPosition})` : '🤝';
  }
  return '🏊‍♀️';
}

export default function ChecklistView() {
  const { swimmers } = useSwimmers();
  const { events, toggleEventCompleted, getSortedEvents } = useEvents();
  const { currentMeet } = useMeet();

  const [showShareModal, setShowShareModal] = useState(false);


  const sortedEvents = getSortedEvents();

  const generateShareText = () => {

    if (sortedEvents.length === 0) return 'No events to share!';

    // Start with meet information
    let shareText = `🏊‍♀️ ${currentMeet?.name || 'Swim Meet'} Event List\n`;
    if (currentMeet?.poolType) {
      shareText += `Pool: ${currentMeet.poolType}\n`;
    }
    if (currentMeet?.date) {
      shareText += `Date: ${new Date(currentMeet.date).toLocaleDateString()}\n`;
    }
    shareText += '\n';

    sortedEvents.forEach(event => {
      const swimmer = swimmers.find(s => s.id === event.swimmerId);
      if (!swimmer) return;

      const relayInfo = event.relayPosition ? ` (Position ${event.relayPosition})` : '';
      const seedInfo = event.seedTime ? ` - Seed: ${event.seedTime}` : '';

      shareText += `${swimmer.icon} Event ${event.eventNumber}: ${swimmer.name}\n`;
      shareText += `   ${abbreviateEventName(event.eventName) || 'Event ' + event.eventNumber}${relayInfo}\n`;
      shareText += `   Heat ${event.heat}, Lane ${event.lane}${seedInfo}\n\n`;
    });

    return shareText;
  };

  const shareEventList = () => {
    const shareText = generateShareText();

    if (navigator.share && window.isSecureContext) {
      navigator.share({
        title: 'Swim Meet Event List',
        text: shareText
      }).catch(() => {
        fallbackShare(shareText);
      });
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (shareText) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Event list copied to clipboard! You can now paste it into a text message or email.');
      }).catch(() => {
        setShowShareModal(true);
      });
    } else {
      setShowShareModal(true);
    }
  };

  const ShareModal = () => {
    const shareText = generateShareText();

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.8)', zIndex: 3000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white', borderRadius: '12px', padding: '20px',
          maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Event List Ready to Share</h3>
          <textarea
            readOnly
            value={shareText}
            style={{
              width: '100%', height: '300px', padding: '10px',
              border: '1px solid #ccc', borderRadius: '6px',
              fontFamily: 'monospace', fontSize: '12px', resize: 'vertical'
            }}
            onClick={(e) => e.target.select()}
          />
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <button
              onClick={() => setShowShareModal(false)}
              style={{
                background: '#4facfe', color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '6px', cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
          <p style={{
            marginTop: '10px', fontSize: '12px', color: '#666', textAlign: 'center'
          }}>
            Select all text above and copy to share via text or email
          </p>
        </div>
      </div>
    );
  };

  if (sortedEvents.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🏊‍♂️</div>
        <h4>No events to track</h4>
        <p>Add events in the Manage Events tab first!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="checklist-header">
        <h3 style={{ color: '#374151' }}>Event Checklist</h3>
        <button
          onClick={shareEventList}
          className="btn-success"
        >
          📤 Share
        </button>
      </div>

      {/* Event List */}
      <div className="events-list" style={{ border: 'none' }}>
        <div id="checklistEventsList">
          {sortedEvents.map(event => {
            const swimmer = swimmers.find(s => s.id === event.swimmerId);
            if (!swimmer) return null;

            return (
              <div
                key={event.id}
                className={`standard-list-item ${event.completed ? 'completed' : ''}`}
              >
                <div className={`compact-event-number swimmer-color-${swimmer.colorIndex}`}>
                  {event.eventNumber}
                </div>
                <div className="compact-event-details">
                  <div className="compact-swimmer-name">
                    {swimmer.name} {getEventIcon(event.eventName, event.relayPosition)}
                  </div>
                  <div className="compact-event-info">
                    <span style={{ flexShrink: 0 }}>
                      {abbreviateEventName(event.eventName) || `Event ${event.eventNumber}`}
                    </span>
                    {event.seedTime && (
                      <span style={{ flexShrink: 0 }}>Seed: {event.seedTime}</span>
                    )}
                  </div>
                </div>
                <div className="compact-heat-lane">
                  <span className="compact-heat">H{event.heat}</span>
                  <span className="compact-lane">L{event.lane}</span>
                </div>
                <div
                  className={`custom-checkbox ${event.completed ? 'checked' : ''}`}
                  onClick={() => toggleEventCompleted(event.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {event.completed ? '✓' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && <ShareModal />}
    </div>
  );
}