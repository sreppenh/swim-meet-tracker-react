'use client';

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CustomColorModal from './modals/CustomColorModal';

export default function ThemePicker() {
    const { theme, presets, applyPreset, updateTheme } = useTheme();
    const [selectedColorName, setSelectedColorName] = useState('');
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [customColors, setCustomColors] = useState({
        primary: theme.primary,
        secondary: theme.secondary,
        background: theme.background
    });

    // Add this useEffect to initialize the selected color name
    React.useEffect(() => {
        // Find which preset matches the current theme
        const matchingPreset = presets.find(preset => preset.primary === theme.primary);
        if (matchingPreset) {
            setSelectedColorName(matchingPreset.name);
        } else {
            setSelectedColorName('Custom Colors');
        }
    }, [theme, presets]);

    // Add custom as the 12th option
    const colorOptions = [
        ...presets,
        {
            name: 'Custom Colors',
            primary: customColors.primary,
            secondary: customColors.secondary,
            background: customColors.background,
            isCustom: true
        }
    ];

    const handleColorSelect = (option) => {
        setSelectedColorName(option.name);

        if (option.isCustom) {
            setShowCustomModal(true);
        } else {
            // Apply preset immediately
            applyPreset(option);
            // Update custom colors to match so they don't reset
            setCustomColors({
                primary: option.primary,
                secondary: option.secondary,
                background: option.background
            });
        }
    };

    const handleCustomApply = () => {
        updateTheme(customColors);
        setSelectedColorName('Custom Colors');
    };

    const isSelected = (option) => {
        if (option.isCustom) {
            // Custom is selected if current theme matches our custom colors exactly
            return selectedColorName === 'Custom Colors' &&
                theme.primary === customColors.primary &&
                theme.secondary === customColors.secondary &&
                theme.background === customColors.background;
        } else {
            // Preset is selected if current theme matches
            return selectedColorName === option.name && theme.primary === option.primary;
        }
    };

    return (
        <div>
            <div style={{
                fontSize: '1.1em',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#374151'
            }}>Team Colors</div>

            {/* Selected Color Name */}
            {selectedColorName && (
                <div style={{
                    marginBottom: '16px',
                    padding: '8px 12px',
                    background: '#f0f9ff',
                    borderRadius: '6px',
                    color: '#0369a1',
                    fontWeight: '600',
                    fontSize: '0.9em'
                }}>
                    Selected: {selectedColorName}
                </div>
            )}

            {/* 3x4 Color Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginBottom: '24px'
            }}>
                {colorOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleColorSelect(option)}
                        style={{
                            aspectRatio: '1',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            border: isSelected(option) ? `3px solid ${option.primary}` : '1.5px solid #d1d5db',
                            padding: '8px',                    // Increased from 6px for more consistent buffer
                            background: isSelected(option) ? option.primary + '20' : 'white',
                            boxShadow: isSelected(option)
                                ? `0 0 8px ${option.primary}66`
                                : '0 1px 3px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',                   // Add explicit flex
                            alignItems: 'center',              // Add explicit centering
                            justifyContent: 'center',           // Add explicit centering
                        }}
                        title={option.name}
                    >
                        {option.isCustom ? (
                            // Rainbow gradient for custom option
                            <div style={{
                                width: 'calc(100% - 4px)',        // Slightly smaller to ensure buffer
                                height: 'calc(100% - 4px)',       // Slightly smaller to ensure buffer
                                borderRadius: '8px',              // Slightly smaller radius
                                background: 'linear-gradient(45deg, #ff0000 0%, #ff8000 14%, #ffff00 28%, #80ff00 42%, #00ff00 57%, #00ff80 71%, #00ffff 85%, #0080ff 100%)',
                                boxShadow: isSelected(option)
                                    ? `0 0 8px rgba(255, 255, 255, 0.8)`
                                    : '0 1px 3px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,                    // Prevent shrinking on mobile
                            }}>
                                ✨
                            </div>
                        ) : (
                            // Team color gradient
                            <div style={{
                                width: 'calc(100% - 4px)',        // Slightly smaller to ensure buffer
                                height: 'calc(100% - 4px)',       // Slightly smaller to ensure buffer
                                background: `linear-gradient(135deg, ${option.primary} 0%, ${option.secondary} 100%)`,
                                borderRadius: '6px',              // Slightly smaller radius
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,                    // Prevent shrinking on mobile
                            }}>
                            </div>
                        )}
                    </button>
                ))}
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

            {/* Custom Color Modal */}
            <CustomColorModal
                isOpen={showCustomModal}
                onClose={() => setShowCustomModal(false)}
                customColors={customColors}
                setCustomColors={setCustomColors}
                onApply={handleCustomApply}
            />
        </div>
    );
}