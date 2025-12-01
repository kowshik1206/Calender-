import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  format,
  startOfDay,
  setHours,
  setMinutes,
} from 'date-fns';
import type { CalendarDay, CalendarEvent, TimeSlot } from '../components/Calendar/CalendarView.types';

/**
 * Get all days to display in month view (42 cells: 6 weeks × 7 days)
 */
export function getMonthDays(date: Date, events: CalendarEvent[]): CalendarDay[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return days.map((day) => ({
    date: day,
    isCurrentMonth: isSameMonth(day, date),
    isToday: isToday(day),
    events: getEventsForDay(day, events),
  }));
}

/**
 * Get all days to display in week view (7 days)
 */
export function getWeekDays(date: Date, events: CalendarEvent[]): CalendarDay[] {
  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);

  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return days.map((day) => ({
    date: day,
    isCurrentMonth: true,
    isToday: isToday(day),
    events: getEventsForDay(day, events),
  }));
}

/**
 * Get events for a specific day
 */
export function getEventsForDay(day: Date, events: CalendarEvent[]): CalendarEvent[] {
  return events.filter((event) => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = startOfDay(event.endDate);
    const currentDay = startOfDay(day);

    return currentDay >= eventStart && currentDay <= eventEnd;
  });
}

/**
 * Navigate to previous month
 */
export function getPreviousMonth(date: Date): Date {
  return subMonths(date, 1);
}

/**
 * Navigate to next month
 */
export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

/**
 * Navigate to previous week
 */
export function getPreviousWeek(date: Date): Date {
  return subWeeks(date, 1);
}

/**
 * Navigate to next week
 */
export function getNextWeek(date: Date): Date {
  return addWeeks(date, 1);
}

/**
 * Format date for display
 */
export function formatDate(date: Date, formatString: string): string {
  return format(date, formatString);
}

/**
 * Get time slots for week view (24 hours with 30-min intervals)
 */
export function getTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];

  for (let hour = 0; hour < 24; hour++) {
    slots.push({
      hour,
      minute: 0,
      label: format(setHours(setMinutes(new Date(), 0), hour), 'h:mm a'),
    });
    slots.push({
      hour,
      minute: 30,
      label: format(setHours(setMinutes(new Date(), 30), hour), 'h:mm a'),
    });
  }

  return slots;
}

/**
 * Calculate event position in week view
 */
export function calculateEventPosition(event: CalendarEvent): {
  top: number;
  height: number;
} {
  const startHour = event.startDate.getHours();
  const startMinute = event.startDate.getMinutes();
  const endHour = event.endDate.getHours();
  const endMinute = event.endDate.getMinutes();

  // Each hour is 60px, each minute is 1px
  const top = startHour * 60 + startMinute;
  const bottom = endHour * 60 + endMinute;
  const height = bottom - top;

  return { top, height: Math.max(height, 30) }; // Minimum 30px height
}

/**
 * Check if two events overlap
 */
export function eventsOverlap(event1: CalendarEvent, event2: CalendarEvent): boolean {
  return (
    event1.startDate < event2.endDate && event1.endDate > event2.startDate
  );
}

/**
 * Get current week number
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Check if date is in current month
 */
export function isInCurrentMonth(date: Date, currentDate: Date): boolean {
  return isSameMonth(date, currentDate);
}

/**
 * Get day name
 */
export function getDayName(date: Date, formatStr: 'short' | 'long' = 'short'): string {
  return format(date, formatStr === 'short' ? 'EEE' : 'EEEE');
}

/**
 * Get month name
 */
export function getMonthName(date: Date): string {
  return format(date, 'MMMM');
}

/**
 * Get year
 */
export function getYear(date: Date): number {
  return date.getFullYear();
}

/**
 * Create a new date at a specific time on a given day
 */
export function createDateAtTime(day: Date, hour: number, minute: number): Date {
  return setMinutes(setHours(day, hour), minute);
}
