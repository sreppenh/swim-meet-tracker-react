'use client';

import React, { useState, useEffect } from 'react';
import {
    COURSE_TYPES,
    filterEventsByCourse,
    formatEventNameWithCourse,
    formatSeedTime
} from '../../../lib/swimming';

export default function PRModal({ swimmer, onSave, onCancel }) {
    const [selectedCourse, setSelectedCourse] = useState('SCY');
    const [prTimes, setPrTimes] = useState({});

    useEffect(() => {
        if (swimmer?.prs && swimmer.prs[selectedCourse]) {
            setPrTimes(swimmer.prs[selectedCourse]);
        } else {
            setPrTimes({});
        }
    }, [swimmer, selectedCourse]);

    const handleTimeChange = (eventName, value) => {
        setPrTimes(prev => ({
            ...prev,
            [eventName]: value
        }));
    };

    const handleTimeFormat = (eventName, e) => {
        formatSeedTime(e.target);
        handleTimeChange(eventName, e.target.value);
    };

    const handleSave = () => {
        // Clean up empty times
        const cleanedTimes = Object.fromEntries(
            Object.entries(prTimes).filter(([_, time]) => time && time.trim())
        );

        const updatedSwimmer = {
            ...swimmer,
            prs: {
                ...(swimmer.prs || {}),
                [selectedCourse]: cleanedTimes
            }
        };

        onSave(updatedSwimmer);
    };

    const filteredEvents = filterEventsByCourse(selectedCourse);
    const currentCourse = COURSE_TYPES.find(c => c.value === selectedCourse);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div className="standard-list" style={{
                background: 'white',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                margin: 0
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #e5e7eb',
                    background: '#f9fafb'
                }}>
                    <div style={{
                        fontSize: '1.1em',
                        fontWeight: '600',
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        ⏱️ {swimmer?.name}'s PRs
                    </div>
                    <div style={{
                        color: '#6b7280',
                        fontSize: '0.9em',
                        marginTop: '8px'
                    }}>
                        Enter PRs to auto-populate seed times when adding events
                    </div>
                </div>

                {/* Course Type Selector */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <label style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#374151'
                    }}>
                        Course Type
                    </label>

                    {/* Three Button Selector */}
                    <div style={{
                        display: 'flex',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        padding: '4px',
                        gap: '4px'
                    }}>
                        {COURSE_TYPES.map(course => (
                            <button
                                key={course.value}
                                onClick={() => setSelectedCourse(course.value)}
                                style={{
                                    flex: 1,
                                    padding: '10px 16px',
                                    border: 'none',
                                    background: selectedCourse === course.value ? 'white' : 'transparent',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    color: selectedCourse === course.value ? 'var(--theme-primary)' : '#6b7280',
                                    fontSize: '0.9em',
                                    transition: 'all 0.2s',
                                    boxShadow: selectedCourse === course.value ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                {course.value}
                            </button>
                        ))}
                    </div>

                    {/* Course Description */}
                    <div style={{
                        marginTop: '12px',
                        padding: '8px 12px',
                        background: '#f0f9ff',
                        borderRadius: '6px',
                        border: '1px solid #bae6fd',
                        fontSize: '0.85em',
                        color: '#0369a1'
                    }}>
                        <strong>{currentCourse?.label}:</strong> {currentCourse?.description}
                    </div>
                </div>

                {/* Events List */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '20px'
                }}>

                    {filteredEvents.map(group => (
                        <div key={group.group} style={{ marginBottom: '24px' }}>
                            <h4 style={{
                                margin: '0 0 12px 0',
                                color: '#374151',
                                fontSize: '1.1em',
                                fontWeight: '600',
                                borderBottom: '2px solid #e5e7eb',
                                paddingBottom: '8px'
                            }}>
                                {group.group}
                            </h4>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '12px'
                            }}>
                                {group.events.map(eventName => (
                                    <div key={eventName} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <label style={{
                                            flex: 1,
                                            fontSize: '0.9em',
                                            color: '#374151',
                                            minWidth: '140px'
                                        }}>
                                            {formatEventNameWithCourse(eventName, selectedCourse)}
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            value={prTimes[eventName] || ''}
                                            onChange={(e) => handleTimeFormat(eventName, e)}
                                            placeholder="1:23.45"
                                            className="form-input"
                                            style={{
                                                width: '90px',
                                                padding: '8px 10px',
                                                fontSize: '0.9em',
                                                textAlign: 'center'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '20px',
                    borderTop: '1px solid #e5e7eb',
                    background: '#f9fafb',
                    display: 'flex',
                    gap: '12px'
                }}>
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
                            fontWeight: '600',
                            color: '#374151'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn-primary"
                        style={{
                            flex: 1,
                            height: '44px',
                            minHeight: '44px',
                            padding: '12px 20px',
                            boxSizing: 'border-box'
                        }}
                    >
                        Save PRs
                    </button>
                </div>
            </div>
        </div>
    );
}