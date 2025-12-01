import type { CalendarEvent, EventFormData } from '../components/Calendar/CalendarView.types';

/**
 * Generate a unique ID for events
 */
export function generateEventId(): string {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new event from form data
 */
export function createEvent(formData: EventFormData): CalendarEvent {
  return {
    id: generateEventId(),
    ...formData,
  };
}

/**
 * Update an existing event
 */
export function updateEvent(
  events: CalendarEvent[],
  eventId: string,
  formData: Partial<EventFormData>
): CalendarEvent[] {
  return events.map((event) =>
    event.id === eventId ? { ...event, ...formData } : event
  );
}

/**
 * Delete an event
 */
export function deleteEvent(events: CalendarEvent[], eventId: string): CalendarEvent[] {
  return events.filter((event) => event.id !== eventId);
}

/**
 * Sort events by start date
 */
export function sortEventsByStartDate(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
}

/**
 * Validate event form data
 */
export function validateEventForm(formData: EventFormData): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }

  if (formData.endDate < formData.startDate) {
    errors.endDate = 'End date must be after start date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Get event duration in minutes
 */
export function getEventDuration(event: CalendarEvent): number {
  return Math.round(
    (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60)
  );
}

/**
 * Format event duration for display
 */
export function formatEventDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Get overlapping events for positioning
 */
export function getOverlappingEvents(
  event: CalendarEvent,
  events: CalendarEvent[]
): CalendarEvent[] {
  return events.filter(
    (e) =>
      e.id !== event.id &&
      e.startDate < event.endDate &&
      e.endDate > event.startDate
  );
}

/**
 * Calculate event columns for side-by-side display
 */
export function calculateEventColumns(events: CalendarEvent[]): Map<string, { column: number; totalColumns: number }> {
  const sortedEvents = sortEventsByStartDate(events);
  const columns = new Map<string, { column: number; totalColumns: number }>();
  const activeEvents: CalendarEvent[] = [];

  sortedEvents.forEach((event) => {
    // Remove events that have ended
    const stillActive = activeEvents.filter((e) => e.endDate > event.startDate);
    activeEvents.length = 0;
    activeEvents.push(...stillActive);

    // Find available column
    const usedColumns = activeEvents.map((e) => columns.get(e.id)!.column);
    let column = 0;
    while (usedColumns.includes(column)) {
      column++;
    }

    activeEvents.push(event);
    
    // Update total columns for all active events
    const totalColumns = activeEvents.length;
    activeEvents.forEach((e) => {
      const current = columns.get(e.id);
      if (current) {
        columns.set(e.id, { column: current.column, totalColumns });
      } else {
        columns.set(e.id, { column, totalColumns });
      }
    });
  });

  return columns;
}
