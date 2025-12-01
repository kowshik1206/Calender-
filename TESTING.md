# 🧪 Testing Guide

## Unit Testing (Future Enhancement)

While unit tests are not included in this initial version, here's how to add them:

### Setup Jest & React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest @types/jest jest-environment-jsdom
```

### Example Test Files

**CalendarCell.test.tsx**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarCell from './CalendarCell';

describe('CalendarCell', () => {
  it('renders date correctly', () => {
    const day = {
      date: new Date(2025, 11, 1),
      isCurrentMonth: true,
      isToday: false,
      events: [],
    };
    
    render(<CalendarCell day={day} onCellClick={() => {}} onEventClick={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onCellClick when clicked', () => {
    const mockClick = jest.fn();
    const day = {
      date: new Date(2025, 11, 1),
      isCurrentMonth: true,
      isToday: false,
      events: [],
    };
    
    render(<CalendarCell day={day} onCellClick={mockClick} onEventClick={() => {}} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

## Accessibility Testing

### Manual Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Screen reader announces content correctly
- [ ] ARIA labels are descriptive
- [ ] Color contrast meets WCAG AA standards

### Automated Testing with axe

```bash
npm install --save-dev @axe-core/react
```

## Visual Regression Testing

Storybook includes visual testing capabilities via Chromatic.

## E2E Testing (Future Enhancement)

Consider using Playwright or Cypress for end-to-end testing:

```bash
npm install --save-dev @playwright/test
```

## Running Tests

```bash
# Unit tests
npm test

# Coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```
