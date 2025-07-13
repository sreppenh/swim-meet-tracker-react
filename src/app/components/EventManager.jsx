'use client';

import React, { useState } from 'react';
import { useSwimmers } from '../hooks/useSwimmers';
import { useEvents } from '../hooks/useEvents';

const SWIM_EVENTS = [
  { group: 'Freestyle', events: [
    '25 Freestyle', '50 Freestyle', '100 Freestyle', '200 Freestyle',
    '400 Freestyle', '500 Freestyle', '800 Freestyle', '1000 Freestyle',
    '1500 Freestyle', '1650 Freestyle'
  ]},
  { group: 'Backstroke', events: [
    '25 Backstroke', '50 Backstroke', '100 Backstroke', '200 Backstroke'
  ]},
  { group: 'Breaststroke', events: [
    '25 Breaststroke', '50 Breaststroke', '100 Breaststroke', '200 Breaststroke'
  ]},
  { group: 'Butterfly', events: [
    '25 Butterfly', '50 Butterfly', '100 Butterfly', '200 Butterfly'
  ]},
  { group: 'Individual Medley', events: [
    '100 Individual Medley', '200 Individual Medley', '400 Individual Medley'
  ]},
  { group: 'Relays', events: [
    '100 Freestyle Relay', '200 Freestyle Relay', '400 Freestyle Relay', '800 Freestyle Relay',
    '100 Medley Relay', '200 Medley Relay', '400 Medley Relay'
  ]}
];

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

function formatSeedTime(input) {
  let value = input.value.replace(/[^\d]/g, ''); // Remove all non-digits
  
  if (value.length === 0) {
    input.value = '';
    return;
  }
  
  // Format based on length
  if (value.length <= 4) {
    // For times like 23.45 (under 1 minute)
    if (value.length > 2) {
      input.value = value.slice(0, 2) + '.' + value.slice(2);
    } else {
      input.value = value;
    }
  } else {
    // For times like 1:23.45 (over 1 minute)
    if (value.length === 5) {
      input.value = value.slice(0, 1) + ':' + value.slice(1, 3) + '.' + value.slice(3);
    } else if (value.length === 6) {
      input.value = value.slice(0, 2) + ':' + value.slice(2, 4) + '.' + value.slice(4);
    } else if (value.length > 6) {
      // Limit to 6 digits max (e.g., 12:34.56)
      value = value.slice(0, 6);
      input.value = value.slice(0, 2) + ':' + value.slice(2, 4) + '.' + value.slice(4);
    } else {
      // 4 digits: add colon
      input.value = value.slice(0, 1) + ':' + value.slice(1);
    }
  }
}

export default function EventManager() {
  const { swimmers, addSwimmer, getSwimmerByName, getAvailableColorIndex } = useSwimmers();
  const { events, addEvent, deleteEvent, getSortedEvents } = useEvents();
  
  const [swimmerName, setSwimmerName] = useState('');
  const [eventNumber, setEventNumber] = useState('');
  const [heat, setHeat] = useState('');
  const [lane, setLane] = useState('');
  const [eventName, setEventName] = useState('');
  const [seedTime, setSeedTime] = useState('');
  const [relayPosition, setRelayPosition] = useState('');

  const isRelay = eventName.toLowerCase().includes('relay');
  const sortedEvents = getSortedEvents();

  const handleAddEvent = () => {
    if (!swimmerName.trim() || !eventNumber || !heat || !lane) {
      alert('Please fill in all required fields');
      return;
    }

    // Find or create swimmer
    let swimmer = getSwimmerByName(swimmerName.trim());
    if (!swimmer) {
      // Auto-create swimmer with next available color
      swimmer = addSwimmer({
        name: swimmerName.trim(),
        colorIndex: getAvailableColorIndex(),
        icon: '🏊‍♀️',
        isFavorite: false,
      });
    }

    const eventData = {
      swimmerId: swimmer.id,
      swimmerName: swimmer.name,
      eventNumber: parseInt(eventNumber),
      heat: parseInt(heat),
      lane: parseInt(lane),
      eventName: eventName || undefined,
      seedTime: seedTime || undefined,
      relayPosition: relayPosition || undefined,
      completed: false,
    };

    addEvent(eventData);
    
    // Clear form except swimmer name (for easy re-entry)
    setEventNumber('');
    setHeat('');
    setLane('');
    setEventName('');
    setSeedTime('');
    setRelayPosition('');
  };

  const handleSeedTimeChange = (e) => {
    const newValue = e.target.value;
    setSeedTime(newValue);
    
    // Use setTimeout to ensure the state is updated before formatting
    setTimeout(() => {
      formatSeedTime(e.target);
      setSeedTime(e.target.value);
    }, 0);
  };

  return (
    <div>
      {/* Event Entry Form */}
      <div className="input-section">
        <h3 style={{ marginBottom: '20px', color: '#374151' }}>Manage Events</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="swimmerName">Swimmer Name</label>
            <input
              type="text"
              id="swimmerName"
              value={swimmerName}
              onChange={(e) => setSwimmerName(e.target.value)}
              placeholder="Enter swimmer's name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventNumber">Event #</label>
            <input
              type="number"
              id="eventNumber"
              value={eventNumber}
              onChange={(e) => setEventNumber(e.target.value)}
              min="1"
              placeholder="1"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="heat">Heat</label>
            <input
              type="number"
              id="heat"
              value={heat}
              onChange={(e) => setHeat(e.target.value)}
              min="1"
              placeholder="1"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lane">Lane</label>
            <input
              type="number"
              id="lane"
              value={lane}
              onChange={(e) => setLane(e.target.value)}
              min="1"
              max="10"
              placeholder="1"
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventName">Event Name (optional)</label>
            <select
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="form-input"
            >
              <option value="">Select an event...</option>
              {SWIM_EVENTS.map(group => (
                <optgroup key={group.group} label={group.group}>
                  {group.events.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="seedTime">Seed Time (optional)</label>
            <input
              type="text"
              id="seedTime"
              value={seedTime}
              onChange={handleSeedTimeChange}
              placeholder="e.g., 1:23.45"
              className="form-input"
            />
          </div>
          {isRelay && (
            <div className="form-group">
              <label htmlFor="relayPosition">Relay Position (optional)</label>
              <select
                id="relayPosition"
                value={relayPosition}
                onChange={(e) => setRelayPosition(e.target.value)}
                className="form-input"
              >
                <option value="">Not specified</option>
                <option value="1">1st (Lead-off)</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th (Anchor)</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <button className="btn add-event-btn" onClick={handleAddEvent}>Add Event</button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="events-list">
        <div className="events-header">
          <h3 style={{ color: '#374151' }}>All Events</h3>
          <span className="events-count">{sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}</span>
        </div>
        <div id="manageEventsList">
          {sortedEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏊‍♂️</div>
              <h4>No events added yet</h4>
              <p>Add your first swimmer's event above!</p>
            </div>
          ) : (
            sortedEvents.map(event => {
              const swimmer = swimmers.find(s => s.id === event.swimmerId);
              if (!swimmer) return null;

              return (
                <div key={event.id} className={`compact-event-item ${event.completed ? 'completed' : ''}`}>
                  <div className={`compact-event-number swimmer-color-${swimmer.colorIndex}`}>
                    {event.eventNumber}
                  </div>
                  <div className="compact-event-details">
                    <div className="compact-swimmer-name">
                      {swimmer.name} {getEventIcon(event.eventName, event.relayPosition)}
                    </div>
                    <div className="compact-event-info">
                      <span style={{ flexShrink: 0 }}>
                        {abbreviateEventName(event.eventName) || 'Event ' + event.eventNumber}
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
                  <button 
                    className="btn-danger delete-btn" 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this event?')) {
                        deleteEvent(event.id);
                      }
                    }}
                    title="Delete event"
                  >
                    ×
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}