export type ViewType = 'month' | 'week';

export type EventCategory = 'work' | 'personal' | 'meeting' | 'reminder' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: string;
  category: EventCategory;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarState {
  currentDate: Date;
  viewType: ViewType;
  events: CalendarEvent[];
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  color: string;
  category: EventCategory;
}

export interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

export const EVENT_COLORS = [
  '#0ea5e9', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // green
  '#ef4444', // red
  '#6366f1', // indigo
  '#14b8a6', // teal
] as const;

export const CATEGORY_OPTIONS: { value: EventCategory; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'other', label: 'Other' },
];
