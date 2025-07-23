'use client';

import React, { useState } from 'react';
import { Palette, Trash2 } from 'lucide-react';
import { useSwimmers } from '../hooks/useSwimmers';
import { useEvents } from '../hooks/useEvents';
import PRModal from './modals/PRModal';
import ColorIconPicker from './modals/ColorIconPicker';



export default function SwimmerManager() {
    const { swimmers, updateSwimmer, deleteSwimmer } = useSwimmers();
    const { events, deleteEventsBySwimmer } = useEvents();
    const [editingSwimmer, setEditingSwimmer] = useState(null);
    const [editingPRs, setEditingPRs] = useState(null);

    // Add this function to handle PR updates:
    const handleUpdatePRs = (updatedSwimmer) => {
        updateSwimmer(updatedSwimmer.id, updatedSwimmer);
        setEditingPRs(null);
    };

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
                    <div style={{
                        fontSize: '1.1em',
                        fontWeight: '600',
                        color: '#374151'
                    }}>Swimmers</div>
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
                                    <div style={{
                                        fontWeight: '500',  // Reduced from 600
                                        fontSize: '0.95em', // Slightly smaller
                                        color: '#374151'
                                    }}>
                                        {swimmer.name}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => setEditingPRs(swimmer)}
                                        className="btn-secondary"
                                        style={{
                                            padding: '6px',
                                            fontSize: '16px',
                                            minWidth: '32px',
                                            minHeight: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Manage Personal Records"
                                    >
                                        ⏱️
                                    </button>





                                    <button
                                        onClick={() => setEditingSwimmer(swimmer)}
                                        className="btn-secondary"
                                        style={{
                                            padding: '6px',
                                            fontSize: '16px',
                                            minWidth: '32px',
                                            minHeight: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Edit swimmer"
                                    >
                                        🎨
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

            {/* PR Management Modal */}
            {editingPRs && (
                <PRModal
                    swimmer={editingPRs}
                    onSave={handleUpdatePRs}
                    onCancel={() => setEditingPRs(null)}
                />
            )}
        </div>
    );
}