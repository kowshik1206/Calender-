import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import clsx from 'clsx';
import { useCalendar } from '../../hooks/useCalendar';
import { useEventManager } from '../../hooks/useEventManager';
import MonthView from './MonthView';
import WeekView from './WeekView';
import Button from '../primitives/Button';
import Select from '../primitives/Select';
import type { CalendarEvent, EventFormData, ViewType } from './CalendarView.types';
import { getMonthName, getYear, createDateAtTime } from '../../utils/date.utils';

// Lazy load EventModal for better performance
const EventModal = lazy(() => import('./EventModal'));

export interface CalendarViewProps {
  initialDate?: Date;
  initialEvents?: CalendarEvent[];
  className?: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  initialDate,
  initialEvents = [],
  className,
}) => {
  const {
    currentDate,
    viewType,
    navigatePrevious,
    navigateNext,
    navigateToday,
    switchView,
    setDate,
    getDays,
  } = useCalendar(initialDate);

  const { events, addEvent, updateEvent, deleteEvent, setEvents } = useEventManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Initialize events
  React.useEffect(() => {
    if (initialEvents.length > 0) {
      setEvents(initialEvents);
    }
  }, [initialEvents, setEvents]);

  const days = useMemo(() => getDays(events), [getDays, events]);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  }, []);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setIsModalOpen(true);
  }, []);

  const handleTimeSlotClick = useCallback((date: Date, hour: number, minute: number) => {
    const slotDate = createDateAtTime(date, hour, minute);
    setSelectedDate(slotDate);
    setSelectedEvent(null);
    setIsModalOpen(true);
  }, []);

  const handleSaveEvent = useCallback(
    (formData: EventFormData) => {
      if (selectedEvent) {
        updateEvent(selectedEvent.id, formData);
      } else {
        addEvent(formData);
      }
      setIsModalOpen(false);
      setSelectedEvent(null);
      setSelectedDate(undefined);
    },
    [selectedEvent, addEvent, updateEvent]
  );

  const handleDeleteEvent = useCallback(() => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  }, [selectedEvent, deleteEvent]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(undefined);
  }, []);

  const handleMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(parseInt(e.target.value, 10));
      setDate(newDate);
    },
    [currentDate, setDate]
  );

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(parseInt(e.target.value, 10));
      setDate(newDate);
    },
    [currentDate, setDate]
  );

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i.toString(),
        label: new Date(2000, i, 1).toLocaleString('default', { month: 'long' }),
      })),
    []
  );

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => ({
      value: (currentYear - 5 + i).toString(),
      label: (currentYear - 5 + i).toString(),
    }));
  }, []);

  const handleViewSwitch = useCallback(
    (view: ViewType) => {
      switchView(view);
    },
    [switchView]
  );

  return (
    <div className={clsx('calendar-view', className)} role="application" aria-label="Calendar">
      {/* Header Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-neutral-900">
            {getMonthName(currentDate)} {getYear(currentDate)}
          </h1>
          <Button onClick={navigateToday} variant="ghost" size="sm">
            Today
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Month/Year Selectors */}
          <div className="flex gap-2">
            <Select
              options={monthOptions}
              value={currentDate.getMonth().toString()}
              onChange={handleMonthChange}
              className="w-32"
              aria-label="Select month"
            />
            <Select
              options={yearOptions}
              value={currentDate.getFullYear().toString()}
              onChange={handleYearChange}
              className="w-24"
              aria-label="Select year"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1">
            <Button
              onClick={navigatePrevious}
              variant="secondary"
              size="sm"
              aria-label={`Previous ${viewType}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              onClick={navigateNext}
              variant="secondary"
              size="sm"
              aria-label={`Next ${viewType}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => handleViewSwitch('month')}
              className={clsx(
                'px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus-ring',
                viewType === 'month'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              )}
              aria-pressed={viewType === 'month'}
            >
              Month
            </button>
            <button
              onClick={() => handleViewSwitch('week')}
              className={clsx(
                'px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus-ring',
                viewType === 'week'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              )}
              aria-pressed={viewType === 'week'}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewType === 'month' ? (
        <MonthView
          days={days}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      ) : (
        <WeekView
          days={days}
          onEventClick={handleEventClick}
          onTimeSlotClick={handleTimeSlotClick}
        />
      )}

      {/* Event Modal */}
      <Suspense fallback={null}>
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          onDelete={selectedEvent ? handleDeleteEvent : undefined}
          event={selectedEvent}
          initialDate={selectedDate}
        />
      </Suspense>
    </div>
  );
};

export default CalendarView;
