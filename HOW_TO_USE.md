# 📅 How to Use the Calendar Component

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run dev
```
Then open: **http://localhost:5173/**

---

## ✨ Creating Events - 3 Ways!

### Method 1: **Create Event Button** (NEW!)
1. Click the purple **"+ Create Event"** button in the header
2. Fill in event details in the modal
3. Click "Create Event" to save

### Method 2: **Click Calendar Cells** (Month View)
1. Switch to **Month** view
2. Click any date cell - you'll see a **+** icon appear on hover
3. The create event modal opens with that date pre-filled
4. Fill in your event details and save

### Method 3: **Click Time Slots** (Week View)
1. Switch to **Week** view
2. Hover over any time slot - you'll see:
   - Purple/blue gradient background
   - **+** icon in the center
3. Click the time slot to create an event at that specific time
4. The modal opens with date + time pre-filled
5. Add title, description, and save

---

## 🎯 Key Features

### **View Modes**
- **Month View**: See entire month, click any date to create events
- **Week View**: See 7 days with hourly time slots (12 AM - 11:30 PM)

### **Event Management**
- **Create**: Click cells (Month), time slots (Week), or "Create Event" button
- **Edit**: Click any existing event to modify
- **Delete**: Open event modal and click "Delete Event"
- **Drag & Drop**: Drag events to different dates/times

### **Search & Filter**
- Search by title or description
- Filter by: All, Work, Personal, Meeting, Other
- Event counts shown on each filter chip

### **Statistics Dashboard**
- Total events this month
- Upcoming events
- Events by category breakdown

### **Theme Toggle**
- Click 🌙/☀️ icon in header to switch dark/light mode
- Preference saved in localStorage

### **Navigation**
- **Previous/Next**: Arrow buttons
- **Today**: Quick jump to current date
- **Month/Year Picker**: Click date to open advanced picker

---

## 🎨 Visual Indicators

### **Hover Effects**
- **Month cells**: Purple gradient background + plus icon
- **Week time slots**: Blue/purple gradient + plus icon
- **Events**: Shadow and scale on hover

### **Today's Date**
- Purple ring highlight
- Pulsing animation on date number

### **Event Colors**
- 🔵 **Work**: Blue
- 🟢 **Personal**: Green  
- 🔴 **Meeting**: Red
- 🟣 **Other**: Purple

---

## ⌨️ Keyboard Shortcuts

- **Arrow Keys**: Navigate between dates
- **Enter/Space**: Select focused date
- **Tab**: Move between interactive elements
- **Escape**: Close modals

---

## 💡 Pro Tips

1. **Drag events** in week view to reschedule quickly
2. Use **filters** to focus on specific event types
3. **Search** works on both title and description
4. All data is **saved to localStorage** - persists across sessions
5. The calendar is **fully responsive** - works on mobile too!

---

## 🐛 Troubleshooting

**Not seeing the calendar?**
- Ensure dev server is running: `npm run dev`
- Check http://localhost:5173/ in your browser
- Try refreshing the page (Ctrl+R)

**Events not saving?**
- Check browser console for errors (F12)
- Ensure localStorage is enabled
- Try a different browser

**Can't create events?**
- Look for the purple "+ Create Event" button
- Try clicking directly on a date cell (Month view)
- Try clicking a time slot (Week view)
- Hover to see the plus icon appear

---

## 📚 Need More Help?

Check the README.md for:
- Installation instructions
- Build commands
- Storybook documentation
- Technical details
