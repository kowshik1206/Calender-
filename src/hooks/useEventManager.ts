import { create } from 'zustand';
import type { CalendarEvent, EventFormData } from '../components/Calendar/CalendarView.types';
import {
  createEvent,
  updateEvent as updateEventUtil,
  deleteEvent as deleteEventUtil,
  sortEventsByStartDate,
} from '../utils/event.utils';

interface EventStore {
  events: CalendarEvent[];
  addEvent: (formData: EventFormData) => void;
  updateEvent: (eventId: string, formData: Partial<EventFormData>) => void;
  deleteEvent: (eventId: string) => void;
  setEvents: (events: CalendarEvent[]) => void;
}

export const useEventManager = create<EventStore>((set) => ({
  events: [],
  
  addEvent: (formData: EventFormData) => {
    set((state) => ({
      events: sortEventsByStartDate([...state.events, createEvent(formData)]),
    }));
  },
  
  updateEvent: (eventId: string, formData: Partial<EventFormData>) => {
    set((state) => ({
      events: sortEventsByStartDate(updateEventUtil(state.events, eventId, formData)),
    }));
  },
  
  deleteEvent: (eventId: string) => {
    set((state) => ({
      events: deleteEventUtil(state.events, eventId),
    }));
  },
  
  setEvents: (events: CalendarEvent[]) => {
    set({ events: sortEventsByStartDate(events) });
  },
}));
