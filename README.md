# 🌍 World Clock Dashboard

A modern, responsive world clock application built with Astro, React, and Mantine UI. Track time across multiple cities worldwide with an elegant, performant interface.

## ✨ Features

- **🌐 Multi-City Time Tracking**: Add cities from around the world to track different time zones
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop with adaptive grid layout
- **💾 Local Storage**: Your selected cities persist between browser sessions
- **⚡ Performance Optimized**: Lazy loading, bundle splitting, and efficient time updates
- **🎨 Modern UI**: Clean interface built with Mantine UI components
- **📊 Performance Monitoring**: Optional performance panel for development (add `?perf=1` to URL)
- **🔍 Smart Search**: Searchable city selector with country information

## 🚀 Project Structure

```text
/
├── public/
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx         # Main application component
│   │   ├── CityGrid.tsx    # Responsive grid layout for city cards
│   │   ├── CityClockCard.tsx # Individual city time display
│   │   ├── CitySelector.tsx # City search and selection
│   │   └── PerformancePanel.tsx # Development performance monitoring
│   ├── data/
│   │   └── cities.ts       # World cities database with timezones
│   ├── hooks/              # Custom React hooks
│   │   ├── useCityManager.ts # City management and localStorage
│   │   ├── useCurrentTime.ts # Optimized time tracking
│   │   └── useInterval.ts   # Efficient interval management
│   ├── pages/
│   │   └── index.astro     # Main page entry point
│   ├── utils/              # Utility functions
│   │   ├── cityStorage.ts  # localStorage utilities
│   │   ├── performance.ts  # Performance logging
│   │   └── time.ts         # Time formatting and timezone utilities
│   └── types.ts            # TypeScript type definitions
├── astro.config.mjs        # Astro configuration with optimizations
└── package.json
```

## 🛠️ Tech Stack

- **[Astro](https://astro.build/)** - Static site generator with React integration
- **[React](https://react.dev/)** - UI library for interactive components
- **[Mantine](https://mantine.dev/)** - Modern React components library
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

- Page load times
- Component render times
- Bundle size information
- Performance ratings

### Responsive Breakpoints

The grid layout adapts to different screen sizes:

- **Mobile** (base): 1 card per row
- **Tablet** (sm): 2 cards per row
- **Desktop** (md): 3 cards per row
- **Large Desktop** (lg): 4 cards per row

## 🌍 Supported Cities

The app includes 30+ major cities from around the world:

- **North America**: New York, Los Angeles, Chicago, Toronto, Vancouver, Mexico City
- **South America**: São Paulo, Buenos Aires, Lima
- **Europe**: London, Paris, Berlin, Rome, Madrid, Amsterdam, Moscow
- **Asia**: Tokyo, Beijing, Shanghai, Hong Kong, Singapore, Mumbai, Delhi, Bangkok, Seoul
- **Middle East**: Dubai, Istanbul
- **Africa**: Cairo, Johannesburg, Lagos
- **Oceania**: Sydney, Melbourne, Auckland

## 📱 Features in Detail

### Smart City Search

- Type to search cities by name or country
- Visual indicators for already selected cities
- Prevents duplicate selections

### Time Display

- 12-hour format with AM/PM
- Current date display
- Timezone abbreviations (EST, PST, etc.)
- Real-time updates every second

### Data Persistence

- Selected cities saved to localStorage
- Automatic restoration on page reload
- Graceful fallback when storage unavailable

### Performance Optimizations

- Lazy loading of non-critical components
- Bundle splitting for optimal loading
- Single timer for all cities (prevents multiple intervals)
- Efficient re-rendering with change detection

## 🏗️ Architecture

### Component Hierarchy

```
App
├── CitySelector (search and add cities)
├── CityGrid (responsive layout)
│   └── CityClockCard[] (individual city displays)
└── PerformancePanel (optional, lazy loaded)
```

### State Management

- **useCityManager**: Handles city CRUD operations and localStorage
- **useCurrentTime**: Optimized time tracking with change detection
- **useInterval**: Efficient timer management with cleanup

### Performance Strategy

- **Lazy Loading**: Performance panel and cities data load on demand
- **Bundle Splitting**: Separate chunks for different features
- **Memoization**: Prevents unnecessary re-renders
- **Single Timer**: One interval updates all cities simultaneously

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
