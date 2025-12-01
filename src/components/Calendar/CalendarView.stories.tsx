import type { Meta, StoryObj } from '@storybook/react';
import CalendarView from './CalendarView';
import type { CalendarEvent } from './CalendarView.types';
import { addDays, setHours, setMinutes } from 'date-fns';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

// Sample events for stories
const today = new Date();
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the team',
    startDate: setMinutes(setHours(today, 10), 0),
    endDate: setMinutes(setHours(today, 11), 0),
    color: '#0ea5e9',
    category: 'meeting',
  },
  {
    id: '2',
    title: 'Lunch Break',
    description: 'Time to eat',
    startDate: setMinutes(setHours(today, 12), 0),
    endDate: setMinutes(setHours(today, 13), 0),
    color: '#10b981',
    category: 'personal',
  },
  {
    id: '3',
    title: 'Project Deadline',
    description: 'Submit final deliverables',
    startDate: setMinutes(setHours(addDays(today, 2), 17), 0),
    endDate: setMinutes(setHours(addDays(today, 2), 18), 0),
    color: '#ef4444',
    category: 'work',
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review PRs from team',
    startDate: setMinutes(setHours(addDays(today, 1), 14), 0),
    endDate: setMinutes(setHours(addDays(today, 1), 15), 30),
    color: '#8b5cf6',
    category: 'work',
  },
  {
    id: '5',
    title: 'Gym Session',
    description: 'Workout time',
    startDate: setMinutes(setHours(addDays(today, 3), 18), 0),
    endDate: setMinutes(setHours(addDays(today, 3), 19), 30),
    color: '#f59e0b',
    category: 'personal',
  },
];

// Generate many events for stress test
const generateManyEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
  const categories: Array<'work' | 'personal' | 'meeting' | 'reminder' | 'other'> = [
    'work',
    'personal',
    'meeting',
    'reminder',
    'other',
  ];

  for (let i = 0; i < 50; i++) {
    const dayOffset = Math.floor(Math.random() * 30) - 15;
    const hour = Math.floor(Math.random() * 12) + 8;
    const duration = Math.floor(Math.random() * 3) + 1;

    events.push({
      id: `event-${i}`,
      title: `Event ${i + 1}`,
      description: `Description for event ${i + 1}`,
      startDate: setMinutes(setHours(addDays(today, dayOffset), hour), 0),
      endDate: setMinutes(setHours(addDays(today, dayOffset), hour + duration), 0),
      color: colors[Math.floor(Math.random() * colors.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }

  return events;
};

/**
 * 1. Default Month View with sample events
 */
export const DefaultMonthView: Story = {
  args: {
    initialDate: today,
    initialEvents: sampleEvents,
  },
};

/**
 * 2. Empty State - no events
 */
export const EmptyState: Story = {
  args: {
    initialDate: today,
    initialEvents: [],
  },
};

/**
 * 3. Week View
 */
export const WeekViewStory: Story = {
  args: {
    initialDate: today,
    initialEvents: sampleEvents,
  },
  play: async ({ canvasElement }) => {
    // Simulate clicking the Week button
    const weekButton = canvasElement.querySelector('button[aria-pressed="false"]') as HTMLButtonElement;
    if (weekButton && weekButton.textContent === 'Week') {
      weekButton.click();
    }
  },
};

/**
 * 4. Month with 20+ events (stress test)
 */
export const ManyEvents: Story = {
  args: {
    initialDate: today,
    initialEvents: generateManyEvents(),
  },
};

/**
 * 5. Interactive Playground - fully functional
 */
export const InteractivePlayground: Story = {
  args: {
    initialDate: today,
    initialEvents: sampleEvents,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive calendar. Try clicking on cells, creating events, switching views, and navigating.',
      },
    },
  },
};

/**
 * 6. Mobile View
 */
export const MobileView: Story = {
  args: {
    initialDate: today,
    initialEvents: sampleEvents,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * 7. Keyboard Navigation Demo
 */
export const KeyboardNavigationDemo: Story = {
  args: {
    initialDate: today,
    initialEvents: sampleEvents,
  },
  parameters: {
    docs: {
      description: {
        story: `
## Keyboard Navigation Features:

- **Arrow Keys**: Navigate between calendar cells
- **Enter/Space**: Activate focused cell or button
- **Escape**: Close modals
- **Tab**: Move through interactive elements
- **Home**: Jump to first cell
- **End**: Jump to last cell

Try clicking on the calendar grid and using arrow keys to navigate!
        `,
      },
    },
  },
};

/**
 * 8. Week View with Overlapping Events
 */
export const WeekViewOverlappingEvents: Story = {
  args: {
    initialDate: today,
    initialEvents: [
      {
        id: 'overlap-1',
        title: 'Morning Meeting',
        startDate: setMinutes(setHours(today, 9), 0),
        endDate: setMinutes(setHours(today, 10), 0),
        color: '#0ea5e9',
        category: 'meeting',
      },
      {
        id: 'overlap-2',
        title: 'Design Review',
        startDate: setMinutes(setHours(today, 9), 30),
        endDate: setMinutes(setHours(today, 11), 0),
        color: '#8b5cf6',
        category: 'work',
      },
      {
        id: 'overlap-3',
        title: 'Client Call',
        startDate: setMinutes(setHours(today, 10), 0),
        endDate: setMinutes(setHours(today, 11), 30),
        color: '#ec4899',
        category: 'meeting',
      },
    ],
  },
};

/**
 * 9. Custom Date Range
 */
export const CustomDateRange: Story = {
  args: {
    initialDate: new Date(2025, 11, 1), // December 2025
    initialEvents: [
      {
        id: 'holiday-1',
        title: 'Christmas Day',
        startDate: new Date(2025, 11, 25, 0, 0),
        endDate: new Date(2025, 11, 25, 23, 59),
        color: '#ef4444',
        category: 'other',
      },
      {
        id: 'holiday-2',
        title: "New Year's Eve",
        startDate: new Date(2025, 11, 31, 20, 0),
        endDate: new Date(2025, 11, 31, 23, 59),
        color: '#f59e0b',
        category: 'personal',
      },
    ],
  },
};
