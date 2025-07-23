'use client';
import { useState, useEffect } from 'react';

// Speedo-inspired team color presets based on classic swim team colors
const SPEEDO_TEAM_PRESETS = [
    {
        name: 'Classic Turquoise (Default)',
        primary: '#4facfe',
        secondary: '#00f2fe',
        background: '#667eea'
    },
    {
        name: 'Elite Black',
        primary: '#1f2937',
        secondary: '#4b5563',
        background: '#111827'
    },
    {
        name: 'Speedo Red Power',
        primary: '#dc2626',
        secondary: '#f87171',
        background: '#991b1b'
    },
    {
        name: 'Championship Blue',
        primary: '#1e40af',
        secondary: '#3b82f6',
        background: '#1e3a8a'
    },
    {
        name: 'Victory Purple',
        primary: '#7c3aed',
        secondary: '#a855f7',
        background: '#581c87'
    },
    {
        name: 'Energy Orange',
        primary: '#ea580c',
        secondary: '#fb923c',
        background: '#9a3412'
    },
    {
        name: 'Go Green',
        primary: '#059669',
        secondary: '#34d399',
        background: '#064e3b'
    },
    {
        name: 'Bright Yellow',
        primary: '#eab308',
        secondary: '#fde047',
        background: '#a16207'
    },
    {
        name: 'Navy Gold',
        primary: '#1e3a8a',
        secondary: '#fbbf24',
        background: '#1e40af'
    },
    {
        name: 'Teal Wave',
        primary: '#0d9488',
        secondary: '#5eead4',
        background: '#134e4a'
    },
    {
        name: 'Maroon & Silver',
        primary: '#991b1b',
        secondary: '#9ca3af',
        background: '#7f1d1d'
    }
];

const DEFAULT_THEME = {
    primary: '#4facfe',
    secondary: '#00f2fe',
    background: '#667eea'
};

export function useTheme() {
    const [theme, setTheme] = useState(DEFAULT_THEME);

    // Load theme from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('appTheme');
            if (saved) {
                const savedTheme = JSON.parse(saved);
                setTheme(savedTheme);
            }
        } catch (error) {
            console.log('Could not load theme:', error);
        }
    }, []);

    // Save theme to localStorage
    const saveTheme = (newTheme) => {
        setTheme(newTheme);
        try {
            localStorage.setItem('appTheme', JSON.stringify(newTheme));
        } catch (error) {
            console.log('Could not save theme:', error);
        }
    };

    // Apply a preset theme
    const applyPreset = (preset) => {
        const newTheme = {
            primary: preset.primary,
            secondary: preset.secondary,
            background: preset.background
        };
        saveTheme(newTheme);
    };

    const updateTheme = (colors) => {
        console.log('updateTheme called with:', colors);
        saveTheme(colors);
        console.log('saveTheme completed, current theme should be:', colors);
    };

    // Reset to default theme
    const resetTheme = () => {
        setTheme(DEFAULT_THEME);
        try {
            localStorage.removeItem('appTheme');
        } catch (error) {
            console.log('Could not reset theme:', error);
        }
    };

    return {
        theme,
        presets: SPEEDO_TEAM_PRESETS,
        applyPreset,
        updateTheme,
        resetTheme
    };
}