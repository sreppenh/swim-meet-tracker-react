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

const RelayPositionOptions = ({ isMedley }) => isMedley ? (
  <>
    <option value="">Not specified</option>
    <option value="1">1 – Backstroke (Lead-off)</option>
    <option value="2">2 – Breaststroke</option>
    <option value="3">3 – Butterfly</option>
    <option value="4">4 – Freestyle (Anchor)</option>
  </>
) : (
  <>
    <option value="">Not specified</option>
    <option value="1">1st (Lead-off)</option>
    <option value="2">2nd</option>
    <option value="3">3rd</option>
    <option value="4">4th (Anchor)</option>
  </>
);

export default function EventManager() {
  const { swimmers, addSwimmer, getSwimmerByName, getAvailableColorIndex, getSwimmerPR } = useSwimmers();
  const { events, addEvent, updateEvent, deleteEvent, getSortedEvents } = useEvents();
  const { currentMeet } = useMeet();

  // Add form state
  const [swimmerName, setSwimmerName] = useState('');
  const [eventNumber, setEventNumber] = useState('');
  const [heat, setHeat] = useState('');
  const [lane, setLane] = useState('');
  const [eventName, setEventName] = useState('');
  const [seedTime, setSeedTime] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [relayPosition, setRelayPosition] = useState('');

  // Edit modal state
  const [editingEvent, setEditingEvent] = useState(null);
  const [editEventNumber, setEditEventNumber] = useState('');
  const [editHeat, setEditHeat] = useState('');
  const [editLane, setEditLane] = useState('');
  const [editEventName, setEditEventName] = useState('');
  const [editSeedTime, setEditSeedTime] = useState('');
  const [editTargetTime, setEditTargetTime] = useState('');
  const [editRelayPosition, setEditRelayPosition] = useState('');

  const isRelay = eventName.toLowerCase().includes('relay');
  const isMedleyRelay = eventName.toLowerCase().includes('medley relay');
  const editIsRelay = editEventName.toLowerCase().includes('relay');
  const editIsMedleyRelay = editEventName.toLowerCase().includes('medley relay');
  const sortedEvents = getSortedEvents();

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEditEventNumber(event.eventNumber?.toString() || '');
    setEditHeat(event.heat?.toString() || '');
    setEditLane(event.lane?.toString() || '');
    setEditEventName(event.eventName || '');
    setEditSeedTime(event.seedTimeSource === 'pr' ? '' : (event.seedTime || ''));
    setEditTargetTime(event.targetTime || '');
    setEditRelayPosition(event.relayPosition || '');
  };

  const closeEditModal = () => {
    setEditingEvent(null);
  };

  const handleSaveEdit = () => {
    if (!editingEvent || !editEventNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const pr = getSwimmerPR(editingEvent.swimmerName, editEventName, currentMeet?.poolType || 'SCY');

    updateEvent(editingEvent.id, {
      eventNumber: parseInt(editEventNumber),
      heat: editHeat ? parseInt(editHeat) : undefined,
      lane: editLane ? parseInt(editLane) : undefined,
      eventName: editEventName || undefined,
      seedTime: pr || editSeedTime || undefined,
      seedTimeSource: pr ? 'pr' : (editSeedTime ? 'manual' : undefined),
      targetTime: editTargetTime || undefined,
      relayPosition: editRelayPosition || undefined,
    });

    closeEditModal();
  };

  const handleAddEvent = () => {
    if (!swimmerName.trim() || !eventNumber) {
      alert('Please fill in all required fields');
      return;
    }

    let swimmer = getSwimmerByName(swimmerName.trim());
    if (!swimmer) {
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
      heat: heat ? parseInt(heat) : undefined,
      lane: lane ? parseInt(lane) : undefined,
      eventName: eventName || undefined,
      seedTime: getSwimmerPR(swimmerName.trim(), eventName, currentMeet?.poolType || 'SCY') || seedTime || undefined,
      seedTimeSource: getSwimmerPR(swimmerName.trim(), eventName, currentMeet?.poolType || 'SCY') ? 'pr' : (seedTime ? 'manual' : undefined),
      targetTime: targetTime || undefined,
      relayPosition: relayPosition || undefined,
      completed: false,
    };

    addEvent(eventData);

    setEventNumber('');
    setHeat('');
    setLane('');
    setEventName('');
    setSeedTime('');
    setTargetTime('');
    setRelayPosition('');
  };

  const handleSeedTimeChange = (e) => {
    setSeedTime(e.target.value);
    setTimeout(() => {
      formatSeedTime(e.target);
      setSeedTime(e.target.value);
    }, 0);
  };

  const handleTargetTimeChange = (e) => {
    setTargetTime(e.target.value);
    setTimeout(() => {
      formatSeedTime(e.target);
      setTargetTime(e.target.value);
    }, 0);
  };

  const handleEditSeedTimeChange = (e) => {
    setEditSeedTime(e.target.value);
    setTimeout(() => {
      formatSeedTime(e.target);
      setEditSeedTime(e.target.value);
    }, 0);
  };

  const handleEditTargetTimeChange = (e) => {
    setEditTargetTime(e.target.value);
    setTimeout(() => {
      formatSeedTime(e.target);
      setEditTargetTime(e.target.value);
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
            <label htmlFor="heat">Heat (optional)</label>
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
            <label htmlFor="lane">Lane (optional)</label>
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

          <div className="form-group">
            <label htmlFor="targetTime">Target Time (optional)</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id="targetTime"
              value={targetTime}
              onChange={handleTargetTimeChange}
              placeholder="e.g., 1:20.00"
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
                <RelayPositionOptions isMedley={isMedleyRelay} />
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
                <div
                  key={event.id}
                  className={`standard-list-item ${event.completed ? 'completed' : ''}`}
                  onClick={() => openEditModal(event)}
                  style={{ cursor: 'pointer' }}
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
                        {abbreviateEventName(event.eventName) || 'Event ' + event.eventNumber}
                      </span>
                      {event.seedTime && (
                        <span style={{ flexShrink: 0 }}>
                          {event.seedTimeSource === 'pr' ? 'PR' : 'Seed'}: {event.seedTime}
                        </span>
                      )}
                      {event.targetTime && (
                        <span style={{ flexShrink: 0, color: '#059669', fontWeight: '600' }}>
                          Target: {event.targetTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="compact-heat-lane">
                    <span className="compact-heat">H{event.heat ?? '—'}</span>
                    <span className="compact-lane">L{event.lane ?? '—'}</span>
                  </div>
                  <button
                    className="btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
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

      {/* Edit Event Modal */}
      {editingEvent && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeEditModal}
        >
          <div
            className="input-section"
            style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: '20px', color: '#374151' }}>Edit Event</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Swimmer Name</label>
                <input
                  type="text"
                  value={editingEvent.swimmerName}
                  readOnly
                  className="form-input"
                  style={{ background: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }}
                />
              </div>
              <div className="form-group">
                <label>Event #</label>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={editEventNumber}
                  onChange={(e) => setEditEventNumber(e.target.value)}
                  min="1"
                  placeholder="1"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Heat (optional)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={editHeat}
                  onChange={(e) => setEditHeat(e.target.value)}
                  min="1"
                  placeholder="1"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Lane (optional)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={editLane}
                  onChange={(e) => setEditLane(e.target.value)}
                  min="1"
                  max="10"
                  placeholder="1"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Event Name (optional)</label>
                <select
                  value={editEventName}
                  onChange={(e) => setEditEventName(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select an event...</option>
                  {getAvailableEvents(currentMeet?.poolType).map(group => (
                    <optgroup key={group.group} label={group.group}>
                      {group.events.map(evt => (
                        <option key={evt} value={evt}>{evt}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="form-group">
                {(() => {
                  const pr = getSwimmerPR(editingEvent.swimmerName, editEventName, currentMeet?.poolType || 'SCY');
                  if (pr) {
                    return (
                      <>
                        <label>Personal Record</label>
                        <div
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
                        <label>Seed Time (optional)</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={editSeedTime}
                          onChange={handleEditSeedTimeChange}
                          placeholder="e.g., 1:23.45"
                          className="form-input"
                        />
                      </>
                    );
                  }
                })()}
              </div>

              <div className="form-group">
                <label>Target Time (optional)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={editTargetTime}
                  onChange={handleEditTargetTimeChange}
                  placeholder="e.g., 1:20.00"
                  className="form-input"
                />
              </div>

              {editIsRelay && (
                <div className="form-group">
                  <label>Relay Position (optional)</label>
                  <select
                    value={editRelayPosition}
                    onChange={(e) => setEditRelayPosition(e.target.value)}
                    className="form-input"
                  >
                    <RelayPositionOptions isMedley={editIsMedleyRelay} />
                  </select>
                </div>
              )}

              <div className="form-group" style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={handleSaveEdit}>Save Changes</button>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={closeEditModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
