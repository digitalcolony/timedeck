# Implementation Plan

- [x] 1. Set up Astro project with React integration

  - Initialize new Astro project with React integration and TypeScript
  - Configure Mantine UI library with theme provider and core components
  - Set up project structure with components, pages, utils, and types folders
  - Configure Netlify deployment with astro.config.mjs
  - _Requirements: 5.1, 5.3_

- [x] 2. Implement core data models and city data

- [x] 2.1 Create TypeScript interfaces and city data

  - Define CityData, TimeData, and AppState TypeScript interfaces
  - Create cities.ts file with array of major world cities and IANA timezones
  - Include cities from different continents with proper timezone identifiers
  - _Requirements: 1.2, 1.4_

- [x] 2.2 Implement city management utilities and React hooks

  - Create useCityManager custom React hook for city state management
  - Implement localStorage persistence with error handling and validation
  - Write utility functions for add, remove, load, and save operations
  - _Requirements: 1.3, 3.2, 4.1, 4.2, 4.4_

- [x] 3. Implement time management functionality

- [x] 3.1 Create time management utilities and React hooks

  - Write useCurrentTime custom React hook using Intl.DateTimeFormat API
  - Implement timezone conversion utilities with proper error handling
  - Create formatTime and formatDate utility functions
  - _Requirements: 2.1, 2.3, 2.4_

- [x] 3.2 Implement real-time clock updates with React

  - Create useInterval custom hook for efficient timer management
  - Implement automatic time updates using React state and effects
  - Optimize re-renders to only update when time values change
  - _Requirements: 2.2_

- [x] 4. Build user interface components

- [x] 4.1 Create CityClockCard React component

  - Build CityClockCard component using Mantine Card and Text components
  - Implement real-time clock display with time, date, and timezone information
  - Add remove button functionality using Mantine ActionIcon component
  - Style with Mantine theme system for consistent modern design
  - _Requirements: 2.1, 2.3, 2.4, 3.1_

- [x] 4.2 Implement CitySelector React component

  - Create CitySelector component using Mantine Select or Autocomplete
  - Add search functionality to filter available cities with built-in Mantine filtering
  - Implement city selection handler that calls parent component callback
  - Style with Mantine components for consistent dropdown interface
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 4.3 Create responsive grid layout with Mantine


  - Implement responsive grid layout using Mantine Grid and SimpleGrid components
  - Add responsive breakpoints for desktop (3-4 cards), tablet (2 cards), mobile (1 card)
  - Style city cards with Mantine theme system and spacing utilities
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 5. Implement main application logic
- [x] 5.1 Create main Dashboard React component




  - Build Dashboard component that manages overall application state
  - Implement state management for selected cities using React hooks
  - Add smooth transitions and animations using Framer Motion or CSS transitions
  - _Requirements: 5.2, 5.4_

- [ ] 5.2 Create main Astro page and integrate React components

  - Build index.astro page with proper SEO meta tags and structure
  - Integrate Dashboard React component with client:load directive
  - Implement proper hydration strategy for interactive components

  - _Requirements: 4.3_

- [ ] 6. Add error handling and edge cases
- [x] 6.1 Implement localStorage error handling with React




  - Add graceful degradation when localStorage is unavailable using try-catch
  - Create fallback mode with session-only functionality in React state
  - Display user notifications using React toast/notification component
  - _Requirements: 4.4_

- [ ] 6.2 Add timezone and time display error handling

  - Implement fallback to UTC for invalid timezones in utility functions
  - Add error recovery for system clock changes in React hooks
  - Handle edge cases in time formatting with proper TypeScript error types
  - _Requirements: 2.1, 2.3_

- [ ] 7. Implement empty state and user guidance
- [ ] 7.1 Create EmptyState React component

  - Design and implement EmptyState component when no cities are selected
  - Add instructional text and call-to-action button using Mantine Text and Button components
  - Style empty state with Mantine theme system for consistent design language
  - _Requirements: 4.3, 5.1_

- [ ] 7.2 Add user interaction feedback with React

  - Implement hover effects and click feedback using Mantine's built-in component states
  - Add loading states during city addition/removal with Mantine Loader component
  - Create smooth animations for state transitions using Mantine transitions or CSS animations
  - _Requirements: 5.4_

- [ ] 8. Final integration and testing
- [ ] 8.1 Write comprehensive unit tests with Vitest

  - Set up Vitest testing framework for React components and utilities
  - Create tests for React hooks (useCityManager, useCurrentTime, useInterval)
  - Test localStorage persistence and error scenarios with mocked storage
  - Verify timezone calculations and time formatting utility functions
  - _Requirements: All requirements validation_

- [ ] 8.2 Perform integration testing and Netlify deployment

  - Test complete user workflows from city selection to removal in browser
  - Verify responsive design across different screen sizes using dev tools
  - Test Astro build process and static generation
  - Deploy to Netlify and verify production functionality
  - Fix any discovered issues and optimize performance
  - _Requirements: All requirements validation_
