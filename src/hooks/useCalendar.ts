import { useState, useCallback } from 'react';
import type { ViewType, CalendarEvent } from '../components/Calendar/CalendarView.types';
import {
  getMonthDays,
  getWeekDays,
  getPreviousMonth,
  getNextMonth,
  getPreviousWeek,
  getNextWeek,
} from '../utils/date.utils';

export function useCalendar(initialDate: Date = new Date()) {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [viewType, setViewType] = useState<ViewType>('month');

  const navigatePrevious = useCallback(() => {
    setCurrentDate((prevDate) =>
      viewType === 'month' ? getPreviousMonth(prevDate) : getPreviousWeek(prevDate)
    );
  }, [viewType]);

  const navigateNext = useCallback(() => {
    setCurrentDate((prevDate) =>
      viewType === 'month' ? getNextMonth(prevDate) : getNextWeek(prevDate)
    );
  }, [viewType]);

  const navigateToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const switchView = useCallback((view: ViewType) => {
    setViewType(view);
  }, []);

  const setDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  const getDays = useCallback(
    (events: CalendarEvent[]) => {
      return viewType === 'month'
        ? getMonthDays(currentDate, events)
        : getWeekDays(currentDate, events);
    },
    [currentDate, viewType]
  );

  return {
    currentDate,
    viewType,
    navigatePrevious,
    navigateNext,
    navigateToday,
    switchView,
    setDate,
    getDays,
  };
}
