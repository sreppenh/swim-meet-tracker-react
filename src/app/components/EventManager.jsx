'use client';

import React, { useState } from 'react';
import { useSwimmers } from '../hooks/useSwimmers';
import { useEvents } from '../hooks/useEvents';
import { useMeet } from '../hooks/useMeet';
import {
  getAvailableEvents,
  abbreviateEventName,
  isRelayEvent,
  getEventIcon,
  formatSeedTime
} from '../../lib/swimming';

export default function EventManager() {
  const { swimmers, addSwimmer, getSwimmerByName, getAvailableColorIndex, getSwimmerPR } = useSwimmers();
  const { events, addEvent, deleteEvent, getSortedEvents } = useEvents();
  const { currentMeet } = useMeet();

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
      seedTime: getSwimmerPR(swimmerName.trim(), eventName, currentMeet?.poolType || 'SCY') || seedTime || undefined,
      seedTimeSource: getSwimmerPR(swimmerName.trim(), eventName, currentMeet?.poolType || 'SCY') ? 'pr' : (seedTime ? 'manual' : undefined),
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
              inputMode="numeric"
              pattern="[0-9]*"
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
              inputMode="numeric"
              pattern="[0-9]*"
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
              inputMode="numeric"
              pattern="[0-9]*"
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


              {getAvailableEvents(currentMeet?.poolType).map(group => (
                <optgroup key={group.group} label={group.group}>
                  {group.events.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </optgroup>
              ))}

            </select>
          </div>
          <div className="form-group">
            {(() => {
              const pr = getSwimmerPR(swimmerName, eventName, currentMeet?.poolType || 'SCY');
              if (pr) {
                return (
                  <>
                    <label htmlFor="prDisplay">Personal Record</label>
                    <div
                      id="prDisplay"
                      className="form-input"
                      style={{
                        background: '#f0f9ff',
                        border: '2px solid #0ea5e9',
                        color: '#0369a1',
                        fontWeight: '600'
                      }}
                    >
                      {pr}
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <label htmlFor="seedTime">Seed Time (optional)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id="seedTime"
                      value={seedTime}
                      onChange={handleSeedTimeChange}
                      placeholder="e.g., 1:23.45"
                      className="form-input"
                    />
                  </>
                );
              }
            })()}
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
            <button className="btn-primary" onClick={handleAddEvent}>Add Event</button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="standards-list">
        <div className="standard-list-header">
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
                <div key={event.id} className={`standard-list-item ${event.completed ? 'completed' : ''}`}>
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
                        <span style={{ flexShrink: 0 }}>
                          {event.seedTimeSource === 'pr' ? 'PR' : 'Seed'}: {event.seedTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="compact-heat-lane">
                    <span className="compact-heat">H{event.heat}</span>
                    <span className="compact-lane">L{event.lane}</span>
                  </div>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this event?')) {
                        deleteEvent(event.id);
                      }
                    }}
                    title="Delete event"
                    style={{
                      padding: '4px 6px',
                      fontSize: '12px',
                      minWidth: '28px',
                      minHeight: '28px'
                    }}
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