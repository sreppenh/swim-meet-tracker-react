// Centralized swimming constants and utilities

export const SWIM_EVENTS_BY_COURSE = {
    'SCY': [
        { group: 'Freestyle', events: ['25 Freestyle', '50 Freestyle', '100 Freestyle', '200 Freestyle', '500 Freestyle', '1000 Freestyle', '1650 Freestyle'] },
        { group: 'Backstroke', events: ['25 Backstroke', '50 Backstroke', '100 Backstroke', '200 Backstroke'] },
        { group: 'Breaststroke', events: ['25 Breaststroke', '50 Breaststroke', '100 Breaststroke', '200 Breaststroke'] },
        { group: 'Butterfly', events: ['25 Butterfly', '50 Butterfly', '100 Butterfly', '200 Butterfly'] },
        { group: 'Individual Medley', events: ['100 Individual Medley', '200 Individual Medley', '400 Individual Medley'] },
        { group: 'Relays', events: ['100 Freestyle Relay', '200 Freestyle Relay', '400 Freestyle Relay', '800 Freestyle Relay', '100 Medley Relay', '200 Medley Relay', '400 Medley Relay'] }
    ],
    'SCM': [
        { group: 'Freestyle', events: ['25 Freestyle', '50 Freestyle', '100 Freestyle', '200 Freestyle', '400 Freestyle', '800 Freestyle', '1500 Freestyle'] },
        { group: 'Backstroke', events: ['25 Backstroke', '50 Backstroke', '100 Backstroke', '200 Backstroke'] },
        { group: 'Breaststroke', events: ['25 Breaststroke', '50 Breaststroke', '100 Breaststroke', '200 Breaststroke'] },
        { group: 'Butterfly', events: ['25 Butterfly', '50 Butterfly', '100 Butterfly', '200 Butterfly'] },
        { group: 'Individual Medley', events: ['100 Individual Medley', '200 Individual Medley', '400 Individual Medley'] },
        { group: 'Relays', events: ['100 Freestyle Relay', '200 Freestyle Relay', '400 Freestyle Relay', '800 Freestyle Relay', '100 Medley Relay', '200 Medley Relay', '400 Medley Relay'] }
    ],
    'LCM': [
        { group: 'Freestyle', events: ['50 Freestyle', '100 Freestyle', '200 Freestyle', '400 Freestyle', '800 Freestyle', '1500 Freestyle'] },
        { group: 'Backstroke', events: ['50 Backstroke', '100 Backstroke', '200 Backstroke'] },
        { group: 'Breaststroke', events: ['50 Breaststroke', '100 Breaststroke', '200 Breaststroke'] },
        { group: 'Butterfly', events: ['50 Butterfly', '100 Butterfly', '200 Butterfly'] },
        { group: 'Individual Medley', events: ['200 Individual Medley', '400 Individual Medley'] },
        { group: 'Relays', events: ['200 Freestyle Relay', '400 Freestyle Relay', '800 Freestyle Relay', '200 Medley Relay', '400 Medley Relay'] }
    ]
};

// Fallback for when no course is specified (show all)
export const ALL_SWIM_EVENTS = [
    { group: 'Freestyle', events: ['25 Freestyle', '50 Freestyle', '100 Freestyle', '200 Freestyle', '400 Freestyle', '500 Freestyle', '800 Freestyle', '1000 Freestyle', '1500 Freestyle', '1650 Freestyle'] },
    { group: 'Backstroke', events: ['25 Backstroke', '50 Backstroke', '100 Backstroke', '200 Backstroke'] },
    { group: 'Breaststroke', events: ['25 Breaststroke', '50 Breaststroke', '100 Breaststroke', '200 Breaststroke'] },
    { group: 'Butterfly', events: ['25 Butterfly', '50 Butterfly', '100 Butterfly', '200 Butterfly'] },
    { group: 'Individual Medley', events: ['100 Individual Medley', '200 Individual Medley', '400 Individual Medley'] },
    { group: 'Relays', events: ['100 Freestyle Relay', '200 Freestyle Relay', '400 Freestyle Relay', '800 Freestyle Relay', '100 Medley Relay', '200 Medley Relay', '400 Medley Relay'] }
];

export const COURSE_TYPES = [
    { value: 'SCY', label: 'SCY (Short Course Yards)', description: 'Most high school & college meets' },
    { value: 'SCM', label: 'SCM (Short Course Meters)', description: 'Summer leagues & some club meets' },
    { value: 'LCM', label: 'LCM (Long Course Meters)', description: 'Olympic-size pools' }
];

// Event filtering utilities
export function filterEventsByCourse(courseType) {
    if (courseType && SWIM_EVENTS_BY_COURSE[courseType]) {
        // For PR modal, exclude relays
        return SWIM_EVENTS_BY_COURSE[courseType].filter(group => group.group !== 'Relays');
    }
    // Fallback - show all events except relays (for PR modal)
    return ALL_SWIM_EVENTS.filter(group => group.group !== 'Relays');
}

export function getAvailableEvents(courseType) {
    if (courseType && SWIM_EVENTS_BY_COURSE[courseType]) {
        return SWIM_EVENTS_BY_COURSE[courseType];
    }
    return ALL_SWIM_EVENTS;
}

// Event name utilities
export function abbreviateEventName(eventName) {
    if (!eventName) return eventName;

    return eventName
        .replace(/Freestyle Relay/g, 'Free Relay')
        .replace(/Medley Relay/g, 'Med Relay')
        .replace(/Individual Medley/g, 'IM')
        .replace(/Freestyle/g, 'Free')
        .replace(/Backstroke/g, 'Back')
        .replace(/Breaststroke/g, 'Breast')
        .replace(/Butterfly/g, 'Fly');
}

export function formatEventNameWithCourse(eventName, courseType) {
    // Get course indicator
    const courseIndicator = {
        'SCY': 'Y',
        'SCM': 'S',
        'LCM': 'L'
    }[courseType] || '';

    // Extract distance and stroke
    const parts = eventName.split(' ');
    const distance = parts[0];
    const stroke = parts.slice(1).join(' ')
        .replace('Freestyle', 'Free')
        .replace('Backstroke', 'Back')
        .replace('Breaststroke', 'Breast')
        .replace('Butterfly', 'Fly')
        .replace('Individual Medley', 'IM');

    return `${distance} ${courseIndicator} ${stroke}`;
}

// Event type checking utilities
export function isRelayEvent(eventName) {
    if (!eventName) return false;
    return eventName.toLowerCase().includes('relay');
}

export function getEventIcon(eventName, relayPosition) {
    const isRelay = isRelayEvent(eventName);
    if (isRelay) {
        return relayPosition ? `🤝 (${relayPosition})` : '🤝';
    }
    return '🏊‍♀️';
}

// Time formatting utility
export function formatSeedTime(input) {
    let value = input.value.replace(/[^\d]/g, ''); // Remove all non-digits

    if (value.length === 0) {
        input.value = '';
        return;
    }

    // Format based on length
    if (value.length <= 4) {
        // For times like 23.45 (under 1 minute)
        if (value.length > 2) {
            input.value = value.slice(0, 2) + '.' + value.slice(2);
        } else {
            input.value = value;
        }
    } else {
        // For times like 1:23.45 (over 1 minute)
        if (value.length === 5) {
            input.value = value.slice(0, 1) + ':' + value.slice(1, 3) + '.' + value.slice(3);
        } else if (value.length === 6) {
            input.value = value.slice(0, 2) + ':' + value.slice(2, 4) + '.' + value.slice(4);
        } else if (value.length > 6) {
            // Limit to 6 digits max (e.g., 12:34.56)
            value = value.slice(0, 6);
            input.value = value.slice(0, 2) + ':' + value.slice(2, 4) + '.' + value.slice(4);
        } else {
            // 4 digits: add colon
            input.value = value.slice(0, 1) + ':' + value.slice(1);
        }
    }
}