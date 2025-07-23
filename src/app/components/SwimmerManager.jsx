'use client';

import React, { useState } from 'react';
import { Palette, Trash2 } from 'lucide-react';
import { useSwimmers } from '../hooks/useSwimmers';
import { useEvents } from '../hooks/useEvents';

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

// Color/Icon Picker Modal - keeping your exact original design
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

export default function SwimmerManager() {
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