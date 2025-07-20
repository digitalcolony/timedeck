# ⏰ TimeDeck

Your global time dashboard • Track multiple cities and timezones with draggable cards.

A modern, responsive world clock application built with Astro, React, and Mantine UI. Experience time zones around the world with an elegant, travel-inspired interface.

## ✨ Features

- **🌐 Multi-City Time Tracking**: Add cities from around the world to track different time zones
- **🎴 Draggable Cards**: Reorder your cities with smooth drag-and-drop functionality
- **🌅 Day/Night Indicators**: Visual icons showing sunrise, day, sunset, and night for each city
- **🌙 Dark/Light Mode**: Beautiful themes that adapt to your system preference
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop with adaptive grid layout
- **💾 Persistent Storage**: Your selected cities and order persist between browser sessions
- **⚡ Performance Optimized**: Lazy loading, bundle splitting, and efficient time updates
- **🎨 Travel-Inspired UI**: Beautiful gradients and modern design with Poppins typography
- **📊 Performance Monitoring**: Optional performance panel for development (add `?perf=1` to URL)
- **🔍 Smart Search**: Searchable city selector with country information

## 🚀 Project Structure

```text
/
├── public/
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx         # Main application component
│   │   ├── CityGrid.tsx    # Draggable grid layout for city cards
│   │   ├── CityClockCard.tsx # Individual city time display with day/night icons
│   │   ├── CitySelector.tsx # City search and selection
│   │   └── PerformancePanel.tsx # Development performance monitoring
│   ├── data/
│   │   └── cities.ts       # World cities database with IANA timezones
│   ├── hooks/              # Custom React hooks
│   │   ├── useCityManager.ts # City management, reordering, and localStorage
│   │   ├── useCurrentTime.ts # Optimized time tracking with day/night detection
│   │   └── useInterval.ts   # Efficient interval management
│   ├── pages/
│   │   └── index.astro     # Main page entry point
│   ├── utils/              # Utility functions
│   │   ├── cityStorage.ts  # localStorage utilities
│   │   ├── performance.ts  # Performance logging
│   │   └── time.ts         # Time formatting, timezone utilities, and day/night detection
│   └── types.ts            # TypeScript type definitions
├── astro.config.mjs        # Astro configuration with optimizations
└── package.json
```

## 🛠️ Tech Stack

- **[Astro](https://astro.build/)** - Static site generator with React integration
- **[React](https://react.dev/)** - UI library for interactive components
- **[Mantine](https://mantine.dev/)** - Modern React components library
- **[React DnD](https://react-dnd.github.io/react-dnd/)** - Drag and drop functionality
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tabler Icons](https://tabler-icons.io/)** - Beautiful SVG icons

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:4321`

4. **Add cities**
   Use the search bar to find and add cities from around the world

5. **Customize your deck**
   Drag and drop cards to reorder them to your preference

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🔧 Development Features

### Performance Monitoring

Add `?perf=1` to the URL to enable the performance panel:

```
http://localhost:4321/?perf=1
```

This shows:

- Page load times (in seconds)
- Component render times
- Bundle size information
- Performance ratings

### Theme System

TimeDeck automatically detects your system preference (light/dark mode) and provides a toggle to switch themes. Your preference is saved and restored on future visits.

### Responsive Breakpoints

The grid layout adapts to different screen sizes:

- **Mobile** (base): 1 card per row
- **Tablet** (sm): 2 cards per row
- **Desktop** (md): 3 cards per row
- **Large Desktop** (lg): 4 cards per row

## 🌍 Supported Cities

The app includes 50+ major cities from around the world:

- **North America**: New York, Los Angeles, Chicago, Toronto, Vancouver, Seattle, Mexico City
- **Central America**: Guatemala City, San José, Panama City, Tegucigalpa, Managua
- **South America**: São Paulo, Buenos Aires, Lima
- **Europe**: London, Paris, Berlin, Rome, Madrid, Amsterdam, Moscow
- **Asia**: Tokyo, Beijing, Shanghai, Hong Kong, Singapore, Mumbai, Delhi, Bangkok, Seoul
- **Southeast Asia**: Manila, Jakarta, Kuala Lumpur, Ho Chi Minh City, Hanoi, Yangon, Phnom Penh
- **Middle East**: Dubai, Istanbul
- **Africa**: Cairo, Johannesburg, Lagos, Nairobi, Casablanca, Accra, Addis Ababa, Cape Town, Dar es Salaam
- **Oceania**: Sydney, Melbourne, Auckland

## 📱 Features in Detail

### Smart City Search

- Type to search cities by name or country
- Visual indicators for already selected cities
- Prevents duplicate selections
- Travel-inspired search interface

### Time Display with Day/Night Indicators

- 12-hour format with AM/PM
- Current date display
- Timezone abbreviations (EST, PST, etc.)
- Real-time updates every second
- **Day/Night Icons**:
  - 🌅 **Sunrise** (5:00 AM - 8:00 AM)
  - ☀️ **Day** (8:00 AM - 5:00 PM)
  - 🌇 **Sunset** (5:00 PM - 8:00 PM)
  - 🌙 **Night** (8:00 PM - 5:00 AM)

### Drag & Drop Reordering

- Drag any city card to reorder
- Visual feedback during drag (tilt and transparency)
- Smooth animations and transitions
- Order persists between sessions
- Touch device support

### Data Persistence

- Selected cities saved to localStorage
- Card order preserved
- Theme preference saved
- Automatic restoration on page reload
- Graceful fallback when storage unavailable

### Performance Optimizations

- Lazy loading of non-critical components
- Bundle splitting for optimal loading
- Single timer for all cities (prevents multiple intervals)
- Efficient re-rendering with change detection
- Memoized expensive operations

## 🏗️ Architecture

### Component Hierarchy

```
App (with DnD Provider)
├── CitySelector (search and add cities)
├── CityGrid (responsive drag-and-drop layout)
│   └── DraggableCityCard[] (draggable wrappers)
│       └── CityClockCard[] (individual city displays)
└── PerformancePanel (optional, lazy loaded)
```

### State Management

- **useCityManager**: Handles city CRUD operations, reordering, and localStorage
- **useCurrentTime**: Optimized time tracking with day/night detection
- **useInterval**: Efficient timer management with cleanup

### Performance Strategy

- **Lazy Loading**: Performance panel and cities data load on demand
- **Bundle Splitting**: Separate chunks for different features
- **Memoization**: Prevents unnecessary re-renders
- **Single Timer**: One interval updates all cities simultaneously
- **Drag Optimization**: Efficient drag-and-drop with React DnD

## 🎨 Design Philosophy

TimeDeck embraces a **travel-inspired aesthetic** with:

- **Poppins Typography**: Modern, friendly font perfect for travel apps
- **Ocean & Sunset Colors**: Deep blues and warm oranges
- **Card-Based Layout**: Like travel postcards from around the world
- **Smooth Animations**: Subtle hover effects and transitions
- **Day/Night Context**: Visual indicators for time of day worldwide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**TimeDeck** - Your global time dashboard • Track the world, one timezone at a time ⏰🌍