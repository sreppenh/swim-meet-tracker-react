'use client';

import React, { useState } from 'react';
import { Palette, Users } from 'lucide-react';
import SwimmerManager from './SwimmerManager';
import ThemePicker from './ThemePicker';

export default function SettingsContainer() {
    const [settingsView, setSettingsView] = useState('swimmers'); // 'app' or 'swimmers'

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

            {/* Content */}
            {settingsView === 'app' && <ThemePicker />}
            {settingsView === 'swimmers' && <SwimmerManager />}
        </div>
    );
}