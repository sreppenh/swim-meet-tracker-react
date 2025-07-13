export function abbreviateEventName(eventName: string): string {
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

export function isRelayEvent(eventName: string): boolean {
  if (!eventName) return false;
  return eventName.toLowerCase().includes('relay');
}

export function getEventIcon(eventName: string, relayPosition?: string): string {
  const isRelay = isRelayEvent(eventName);
  if (isRelay) {
    return relayPosition ? `🤝 (${relayPosition})` : '🤝';
  }
  return '🏊‍♀️';
}

export function formatSeedTime(timeString: string): string {
  let value = timeString.replace(/[^\d]/g, ''); // Remove all non-digits
  
  if (value.length === 0) return '';
  
  // Format based on length
  if (value.length <= 4) {
    // For times like 23.45 (under 1 minute)
    if (value.length > 2) {
      return value.slice(0, 2) + '.' + value.slice(2);
    } else {
      return value;
    }
  } else {
    // For times like 1:23.45 (over 1 minute)
    if (value.length === 5) {
      return value.slice(0, 1) + ':' + value.slice(1, 3) + '.' + value.slice(3);
    } else if (value.length === 6) {
      return value.slice(0, 2) + ':' + value.slice(2, 4) + '.' + value.slice(4);
    } else if (value.length > 6) {
      // Limit to 6 digits max (e.g., 12:34.56)
      value = value.slice(0, 6);
      return value.slice(0, 2) + ':' + value.slice(2, 4) + '.' + value.slice(4);
    } else {
      // 4 digits: add colon
      return value.slice(0, 1) + ':' + value.slice(1);
    }
  }
}