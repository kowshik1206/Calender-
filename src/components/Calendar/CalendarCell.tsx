import React, { useState, useCallback, useRef } from 'react';
import clsx from 'clsx';
import type { CalendarDay, CalendarEvent } from './CalendarView.types';

interface CalendarCellProps {
  day: CalendarDay;
  onCellClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  maxVisibleEvents?: number;
}

const CalendarCell = React.memo<CalendarCellProps>(({
  day,
  onCellClick,
  onEventClick,
  maxVisibleEvents = 3,
}) => {
  const [showAll, setShowAll] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  const visibleEvents = showAll ? day.events : day.events.slice(0, maxVisibleEvents);
  const remainingCount = day.events.length - maxVisibleEvents;

  const handleCellClick = useCallback(() => {
    onCellClick(day.date);
  }, [day.date, onCellClick]);

  const handleEventClick = useCallback(
    (e: React.MouseEvent, event: CalendarEvent) => {
      e.stopPropagation();
      onEventClick(event);
    },
    [onEventClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCellClick();
      }
    },
    [handleCellClick]
  );

  return (
    <div
      ref={cellRef}
      role="button"
      tabIndex={0}
      aria-label={`${day.date.toLocaleDateString()}, ${day.events.length} events`}
      className={clsx(
        'min-h-[120px] border border-neutral-200 p-2 cursor-pointer transition-colors',
        'hover:bg-neutral-50 focus-ring',
        day.isCurrentMonth ? 'bg-white' : 'bg-neutral-50',
        day.isToday && 'ring-2 ring-primary-500 ring-inset'
      )}
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={clsx(
            'text-sm font-medium',
            day.isCurrentMonth ? 'text-neutral-900' : 'text-neutral-400',
            day.isToday && 'bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center'
          )}
        >
          {day.date.getDate()}
        </span>
      </div>

      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <button
            key={event.id}
            onClick={(e) => handleEventClick(e, event)}
            className={clsx(
              'w-full text-left px-2 py-1 rounded text-xs font-medium truncate',
              'hover:opacity-80 focus-ring transition-opacity'
            )}
            style={{ backgroundColor: event.color, color: '#fff' }}
            aria-label={`Event: ${event.title}`}
          >
            {event.title}
          </button>
        ))}

        {remainingCount > 0 && !showAll && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(true);
            }}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium focus-ring"
          >
            +{remainingCount} more
          </button>
        )}
      </div>
    </div>
  );
});

CalendarCell.displayName = 'CalendarCell';

export default CalendarCell;
