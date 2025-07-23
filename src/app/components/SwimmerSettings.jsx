'use client';

import React, { useState } from 'react';
import { Palette, Trash2, Users } from 'lucide-react';
import { useSwimmers } from '../hooks/useSwimmers';
import { useEvents } from '../hooks/useEvents';
import { useTheme } from '../hooks/useTheme';

const SWIMMER_ICONS = [
  '🐬', '🦈', '🐊', '🐙', '🐠', '🐟',
  '🦭', '🐳', '🦑', '🌊', '⭐', '🚀',
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

// Color/Icon Picker Modal - keeping your original design
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

        {/* Preview - keeping your original compact design */}
        <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', marginBottom: '8px', color: '#6b7280' }}>Preview:</p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '100px'
          }}>
            <div
              className={`swimmer-color-${selectedColor}`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0px'
              }}
            />
            <div style={{
              fontSize: '20px',
              minWidth: '24px'
            }}>
              {selectedIcon}
            </div>
          </div>
        </div>

        {/* Color Selection - keeping your original grid layout */}
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
                <div className={`swimmer-color-${index}`} style={{ height: '32px', borderRadius: '4px' }}></div>
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
              flex: 1,
              padding: '12px 20px',
              height: '44px',
              border: '1px solid #e5e7eb',
              background: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
            style={{
              flex: 1,
              padding: '12px 20px !important',
              height: '44px !important',
              minHeight: '44px !important'
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Color Picker Component for theme colors
const ColorPicker = ({ label, value, onChange }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
      {label}
    </label>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '50px', height: '40px',
          border: '2px solid #e5e7eb', borderRadius: '8px',
          cursor: 'pointer'
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1, padding: '8px 12px',
          border: '2px solid #e5e7eb', borderRadius: '6px',
          fontFamily: 'monospace', fontSize: '14px'
        }}
        placeholder="#4facfe"
      />
    </div>
  </div>
);

export default function SwimmerSettings() {
  const { swimmers, updateSwimmer, deleteSwimmer } = useSwimmers();
  const { events, deleteEventsBySwimmer } = useEvents();
  const [editingSwimmer, setEditingSwimmer] = useState(null);

  // Theme picker state
  const [settingsView, setSettingsView] = useState('swimmers'); // 'app' or 'swimmers'
  const { theme, presets, applyPreset, updateTheme } = useTheme();
  const [customColors, setCustomColors] = useState({
    primary: theme.primary,
    secondary: theme.secondary,
    background: theme.background
  });

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

  const applyCustomColors = () => {
    console.log('Apply button clicked!', customColors);
    updateTheme(customColors);
    console.log('Theme should be updated');
  };

  return (
    <div>
      {/* Settings Sub-Navigation */}
      <div style={{
        display: 'flex',
        background: '#f8fafc',
        borderRadius: '8px',
        padding: '4px',
        marginBottom: '24px',
        gap: '4px'
      }}>
        <button
          onClick={() => setSettingsView('app')}
          style={{
            flex: 1, padding: '10px 16px', border: 'none',
            background: settingsView === 'app' ? 'white' : 'transparent',
            borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
            color: settingsView === 'app' ? 'var(--theme-primary)' : '#6b7280',
            fontSize: '0.9em', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
            boxShadow: settingsView === 'app' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <Palette size={16} /> App Theme
        </button>
        <button
          onClick={() => setSettingsView('swimmers')}
          style={{
            flex: 1, padding: '10px 16px', border: 'none',
            background: settingsView === 'swimmers' ? 'white' : 'transparent',
            borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
            color: settingsView === 'swimmers' ? 'var(--theme-primary)' : '#6b7280',
            fontSize: '0.9em', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
            boxShadow: settingsView === 'swimmers' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <Users size={16} /> Swimmers
        </button>
      </div>

      {/* App Theme Settings */}
      {settingsView === 'app' && (
        <div>
          <h3 style={{ marginBottom: '20px', color: '#374151' }}>Customize Team Colors</h3>

          {/* Preset Colors */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ marginBottom: '16px', color: '#6b7280', fontSize: '1em' }}>Team Color Presets</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px'
            }}>
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => {
                    applyPreset(preset);
                    setCustomColors({
                      primary: preset.primary,
                      secondary: preset.secondary,
                      background: preset.background
                    });
                  }}
                  style={{
                    padding: '12px',
                    border: theme.primary === preset.primary ? `2px solid ${preset.primary}` : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    background: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '20px',
                    background: `linear-gradient(135deg, ${preset.primary} 0%, ${preset.secondary} 100%)`,
                    borderRadius: '4px',
                    marginBottom: '8px'
                  }}></div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    {preset.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div style={{
            background: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #e5e7eb'
          }}>
            <h4 style={{ marginBottom: '16px', color: '#374151', fontSize: '1em' }}>Custom Colors</h4>

            <ColorPicker
              label="Header Primary Color"
              value={customColors.primary}
              onChange={(value) => setCustomColors(prev => ({ ...prev, primary: value }))}
            />

            <ColorPicker
              label="Header Secondary Color"
              value={customColors.secondary}
              onChange={(value) => setCustomColors(prev => ({ ...prev, secondary: value }))}
            />

            <ColorPicker
              label="Background Color"
              value={customColors.background}
              onChange={(value) => setCustomColors(prev => ({ ...prev, background: value }))}
            />

            <button
              onClick={applyCustomColors}
              className="btn-primary"
              style={{
                background: `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`,
                width: '100%',
                marginTop: '8px'
              }}
            >
              Apply Custom Colors
            </button>
          </div>

          {/* Preview */}
          <div style={{ marginTop: '24px' }}>
            <h4 style={{ marginBottom: '12px', color: '#374151' }}>Preview</h4>
            <div style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
              padding: '16px',
              borderRadius: '8px',
              color: 'white',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              🏊‍♀️ Your Team Colors Look Great!
              <div style={{ fontSize: '0.8em', opacity: 0.9, marginTop: '4px' }}>
                Colors automatically sync across the entire app
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Swimmer Settings - keeping your exact original layout */}
      {settingsView === 'swimmers' && (
        <div>
          <div className="standard-list">
            <div className="standard-list-header">
              <h3 style={{ color: '#374151' }}>Swimmers</h3>
              <span className="events-count">{swimmers.length} swimmer{swimmers.length !== 1 ? 's' : ''}</span>
            </div>

            {swimmers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏊‍♀️</div>
                <h4>No swimmers yet</h4>
                <p>Swimmers will appear here after you add events for them.</p>
              </div>
            ) : (
              <div>
                {swimmers.map(swimmer => (
                  <div key={swimmer.id} className="standard-list-item">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div
                        className={`swimmer-color-${swimmer.colorIndex}`}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px'
                        }}
                      />
                      <div style={{
                        fontSize: '24px'
                      }}>
                        {swimmer.icon}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#374151' }}>
                        {swimmer.name}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setEditingSwimmer(swimmer)}
                        className="btn-secondary"
                        style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          height: '28px',
                          minHeight: '28px'
                        }}
                      >
                        🎨 Edit
                      </button>

                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteSwimmer(swimmer)}
                        title="Delete swimmer"
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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