export interface Swimmer {
  id: string;
  name: string;
  colorIndex: number;
  icon: string;
  isFavorite: boolean;
  createdAt: Date;
  personalRecords?: PersonalRecord[];
}

export interface PersonalRecord {
  eventName: string;
  time: string;
  date: Date;
  meetName?: string;
}

export interface Event {
  id: string;
  swimmerId: string;
  swimmerName: string;
  eventNumber: number;
  heat: number;
  lane: number;
  eventName?: string;
  seedTime?: string;
  relayPosition?: string;
  completed: boolean;
  createdAt: Date;
}

export interface Meet {
  id: string;
  name: string;
  poolType?: 'SCY' | 'SCM' | 'LCM';
  date?: Date;
  createdAt: Date;
}

export interface AppState {
  currentMeet: Meet | null;
  swimmers: Swimmer[];
  events: Event[];
  favorites: string[]; // swimmer IDs
}

export type ViewMode = 'manage' | 'checklist' | 'swimmers';

export const SWIMMER_ICONS = [
  '🐬', '🦈', '🐊', '🐙', '🐠', '🐟', 
  '🦭','🐳', '🦑', '🌊', '⭐', '🚀', 
  '🔥', '💎', '🎯', '🏆', '🎪', '🎨', 
  '🎭', '🎸', '🦄', '🌟', '💫', '🎈'
] as const;

export const SWIMMER_COLORS = [
  'Purple/Blue', 'Pink/Red', 'Blue/Cyan', 'Green/Cyan',
  'Pink/Yellow', 'Teal/Pink', 'Pink/Purple', 'Orange/Peach',
  'Green/Lime', 'Orange/Yellow'
] as const;