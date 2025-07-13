'use client';

import React, { useState } from 'react';
import { Palette, Trash2 } from 'lucide-react';
import { useSwimmers } from '../hooks/useSwimmers';
import { useEvents } from '../hooks/useEvents';

const SWIMMER_ICONS = [
  '🐬', '🦈', '🐊', '🐙', '🐠', '🐟', 
  '🦭','🐳', '🦑', '🌊', '⭐', '🚀', 
  '🔥', '💎', '🎯', '🏆', '🎪', '🎨', 
  '🎭', '🎸', '🦄', '🌟', '💫', '🎈'
];

const SWIMMER_COLORS = [
  { name: 'Purple/Blue', class: 'swimmer-color-0' },
  { name: 'Pink/Red', class: 'swimmer-color-1' },
  { name: 'Blue/Cyan', class: 'swimmer-color-2' },
  { name: 'Green/Cyan', class: 'swimmer-color-3' },
  { name: 'Pink/Yellow', class: 'swimmer-color-4' },
  { name: 'Teal/Pink', class: 'swimmer-color-5' },
  { name: 'Pink/Purple', class: 'swimmer-color-6' },
  { name: 'Orange/Peach', class: 'swimmer-color-7' },
  { name: 'Green/Lime', class: 'swimmer-color-8' },
  { name: 'Orange/Yellow', class: 'swimmer-color-9' }
];

// Color/Icon Picker Modal
const ColorIconPicker = ({ swimmer, onUpdate, onCancel }) => {
  const [selectedColor, setSelectedColor] = useState(swimmer.colorIndex);
  const [selectedIcon, setSelectedIcon] = useState(swimmer.icon);

  const handleSave = () => {
    onUpdate({
      ...swimmer,
      colorIndex: selectedColor,
      icon: selectedIcon
    });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', padding: '20px', zIndex: 3001
    }}>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        maxWidth: '400px', width: '100%', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, color: '#374151' }}>Customize {swimmer.name}</h3>
          <button 
            onClick={onCancel}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}
          >
            ×
          </button>
        </div>

        {/* Preview */}
        <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', marginBottom: '8px', color: '#6b7280' }}>Preview:</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className={`compact-event-number swimmer-color-${selectedColor}`}>15</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                <span style={{ fontSize: '18px' }}>{selectedIcon}</span>
                <span>{swimmer.name}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>100 Freestyle • Seed: 1:23.45</div>
            </div>
          </div>
        </div>

        {/* Color Selection */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '12px', color: '#374151' }}>Choose Color</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {SWIMMER_COLORS.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                style={{
                  padding: '12px', borderRadius: '8px', cursor: 'pointer',
                  border: selectedColor === index ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                  background: selectedColor === index ? '#eff6ff' : 'white'
                }}
              >
                <div className={`swimmer-color-${index}`} style={{ height: '32px', borderRadius: '4px', marginBottom: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Icon Selection */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '12px', color: '#374151' }}>Choose Icon</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
            {SWIMMER_ICONS.map((icon, index) => (
              <button
                key={index}
                onClick={() => setSelectedIcon(icon)}
                style={{
                  padding: '8px', fontSize: '20px', borderRadius: '6px', cursor: 'pointer',
                  border: selectedIcon === icon ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                  background: selectedIcon === icon ? '#eff6ff' : 'white'
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px',
              background: 'white', cursor: 'pointer', color: '#6b7280'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1, padding: '12px', border: 'none', borderRadius: '6px',
              background: '#4facfe', color: 'white', cursor: 'pointer'
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SwimmerSettings({ onClose }) {
  const { swimmers, updateSwimmer, deleteSwimmer } = useSwimmers();
  const { events, deleteEventsBySwimmer } = useEvents();
  const [editingSwimmer, setEditingSwimmer] = useState(null);

  const handleDeleteSwimmer = (swimmer) => {
    const swimmerEvents = events.filter(e => e.swimmerId === swimmer.id);
    const eventCount = swimmerEvents.length;
    
    let message = `Are you sure you want to remove ${swimmer.name}?`;
    if (eventCount > 0) {
      message += ` This will also delete ${eventCount} event${eventCount !== 1 ? 's' : ''}.`;
    }
    
    if (confirm(message)) {
      deleteEventsBySwimmer(swimmer.id);
      deleteSwimmer(swimmer.id);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', padding: '20px', zIndex: 3000
    }}>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        maxWidth: '600px', width: '100%', maxHeight: '80vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, color: '#374151' }}>Swimmer Settings</h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}
          >
            ×
          </button>
        </div>

        {swimmers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏊‍♀️</div>
            <h4>No swimmers yet</h4>
            <p>Swimmers will appear here after you add events for them.</p>
          </div>
        ) : (
          <div>
            {swimmers.map(swimmer => (
              <div 
                key={swimmer.id} 
                style={{
                  background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '16px', marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className={`swimmer-color-${swimmer.colorIndex}`} style={{ width: '24px', height: '24px', borderRadius: '4px' }}></div>
                    <span style={{ fontSize: '20px' }}>{swimmer.icon}</span>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{swimmer.name}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      ({SWIMMER_COLORS[swimmer.colorIndex]?.name})
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setEditingSwimmer(swimmer)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px',
                        padding: '6px 12px', cursor: 'pointer', color: '#2563eb'
                      }}
                    >
                      <Palette style={{ width: '16px', height: '16px' }} />
                      Change
                    </button>
                    <button
                      onClick={() => handleDeleteSwimmer(swimmer)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px',
                        padding: '6px 12px', cursor: 'pointer', color: '#dc2626'
                      }}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={onClose}
            className="btn"
          >
            Done
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSwimmer && (
        <ColorIconPicker
          swimmer={editingSwimmer}
          onUpdate={(updatedSwimmer) => {
            updateSwimmer(editingSwimmer.id, { 
              colorIndex: updatedSwimmer.colorIndex, 
              icon: updatedSwimmer.icon 
            });
            setEditingSwimmer(null);
          }}
          onCancel={() => setEditingSwimmer(null)}
        />
      )}
    </div>
  );
}