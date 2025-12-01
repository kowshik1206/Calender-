import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import type { CalendarDay, CalendarEvent } from './CalendarView.types';
import { getTimeSlots, calculateEventPosition, formatDate } from '../../utils/date.utils';
import { calculateEventColumns } from '../../utils/event.utils';

interface WeekViewProps {
  days: CalendarDay[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick: (date: Date, hour: number, minute: number) => void;
}

const WeekView = React.memo<WeekViewProps>(({
  days,
  onEventClick,
  onTimeSlotClick,
}) => {
  const timeSlots = useMemo(() => getTimeSlots(), []);

  const handleTimeSlotClick = useCallback(
    (day: Date, hour: number, minute: number) => {
      onTimeSlotClick(day, hour, minute);
    },
    [onTimeSlotClick]
  );

  const renderEvent = useCallback(
    (event: CalendarEvent, _day: CalendarDay, allDayEvents: CalendarEvent[]) => {
      const position = calculateEventPosition(event);
      const columns = calculateEventColumns(allDayEvents);
      const eventColumn = columns.get(event.id) || { column: 0, totalColumns: 1 };
      
      const width = `${100 / eventColumn.totalColumns}%`;
      const left = `${(eventColumn.column * 100) / eventColumn.totalColumns}%`;

      return (
        <button
          key={event.id}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick(event);
          }}
          className="absolute text-left px-2 py-1 rounded text-xs font-medium truncate hover:opacity-80 focus-ring transition-opacity z-10"
          style={{
            backgroundColor: event.color,
            color: '#fff',
            top: `${position.top}px`,
            height: `${position.height}px`,
            width,
            left,
          }}
          title={`${event.title} - ${formatDate(event.startDate, 'h:mm a')} to ${formatDate(event.endDate, 'h:mm a')}`}
        >
          <div className="font-semibold">{event.title}</div>
          <div className="text-xs opacity-90">
            {formatDate(event.startDate, 'h:mm a')}
          </div>
        </button>
      );
    },
    [onEventClick]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with day names and dates */}
      <div className="grid grid-cols-8 bg-neutral-100 border-b border-neutral-200 sticky top-0 z-20">
        <div className="py-3 px-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
          Time
        </div>
        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className="py-3 text-center border-r border-neutral-200 last:border-r-0"
          >
            <div className="text-sm font-semibold text-neutral-700">
              {formatDate(day.date, 'EEE')}
            </div>
            <div
              className={clsx(
                'text-lg font-bold mt-1',
                day.isToday
                  ? 'bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto'
                  : 'text-neutral-900'
              )}
            >
              {formatDate(day.date, 'd')}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="relative overflow-auto max-h-[600px]">
        <div className="grid grid-cols-8">
          {/* Time labels column */}
          <div className="border-r border-neutral-200">
            {timeSlots.filter((slot) => slot.minute === 0).map((slot) => (
              <div
                key={`time-${slot.hour}`}
                className="h-[60px] px-2 py-1 text-xs text-neutral-600 border-b border-neutral-200"
              >
                {slot.label}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day) => (
            <div
              key={day.date.toISOString()}
              className="relative border-r border-neutral-200 last:border-r-0"
            >
              {/* Time slots */}
              {timeSlots.map((slot) => (
                <button
                  key={`${day.date.toISOString()}-${slot.hour}-${slot.minute}`}
                  onClick={() => handleTimeSlotClick(day.date, slot.hour, slot.minute)}
                  className={clsx(
                    'w-full h-[30px] border-b hover:bg-primary-50 focus-ring transition-colors text-left',
                    slot.minute === 0 ? 'border-neutral-200' : 'border-neutral-100'
                  )}
                  aria-label={`${formatDate(day.date, 'MMM d')} at ${slot.label}`}
                />
              ))}

              {/* Events overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative h-full pointer-events-auto">
                  {day.events.map((event) => renderEvent(event, day, day.events))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

WeekView.displayName = 'WeekView';

export default WeekView;
