'use client';

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

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

export default function ThemePicker() {
    const { theme, presets, applyPreset, updateTheme } = useTheme();
    const [customColors, setCustomColors] = useState({
        primary: theme.primary,
        secondary: theme.secondary,
        background: theme.background
    });

    const applyCustomColors = () => {
        updateTheme(customColors);
    };

    return (
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
                    style={{
                        background: `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`,
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9em',
                        transition: 'all 0.2s',
                        width: '100%',
                        marginTop: '8px',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
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
    );
}