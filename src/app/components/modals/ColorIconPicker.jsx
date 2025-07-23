'use client';

import React, { useState } from 'react';
import { SWIMMER_ICONS, SWIMMER_COLORS } from '../../../lib/constants';

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

export default ColorIconPicker;