'use client';

import React, { useState, useEffect } from 'react';

// Color Picker Component for the custom modal
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

// Custom Color Modal
export default function CustomColorModal({ isOpen, onClose, customColors, setCustomColors, onApply }) {
    const [originalColors, setOriginalColors] = useState(customColors);

    // Store original colors when modal opens
    useEffect(() => {
        if (isOpen) {
            setOriginalColors({ ...customColors });
        }
    }, [isOpen, customColors]);

    if (!isOpen) return null;

    const handleReset = () => {
        setCustomColors(originalColors);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: '20px', zIndex: 3001
        }}>
            <div style={{
                background: 'white', borderRadius: '12px', padding: '24px',
                maxWidth: '450px', width: '100%', maxHeight: '90vh', overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, color: '#374151' }}>Custom Team Colors</h3>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}
                    >
                        ×
                    </button>
                </div>

                {/* Live Preview */}
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '8px', color: '#374151', fontSize: '0.9em' }}>Live Preview</h4>
                    <div style={{
                        background: `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`,
                        padding: '12px',
                        borderRadius: '8px',
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '0.9em'
                    }}>
                        🏊‍♀️ Your Custom Colors
                        <div style={{ fontSize: '0.75em', opacity: 0.9, marginTop: '2px' }}>
                            Header uses Primary → Secondary gradient
                        </div>
                    </div>
                    <div style={{
                        background: `linear-gradient(135deg, ${customColors.background} 0%, ${customColors.primary} 100%)`,
                        padding: '8px',
                        borderRadius: '6px',
                        marginTop: '6px',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '0.8em',
                        opacity: 0.9
                    }}>
                        Background uses Background → Primary gradient
                    </div>
                </div>

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

                <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                    <button
                        onClick={handleReset}
                        style={{
                            padding: '12px 16px',
                            height: '44px',
                            border: '1px solid #d1d5db',
                            background: '#f9fafb',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85em',
                            color: '#6b7280'
                        }}
                    >
                        Reset
                    </button>
                    <button
                        onClick={onClose}
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
                        onClick={() => {
                            onApply();
                            onClose();
                        }}
                        style={{
                            flex: 1,
                            background: `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`,
                            color: 'white',
                            border: 'none',
                            padding: '12px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9em',
                            transition: 'all 0.2s',
                            minHeight: '44px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Apply Colors
                    </button>
                </div>
            </div>
        </div>
    );
}