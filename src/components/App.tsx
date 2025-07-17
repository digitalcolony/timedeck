import React from 'react';
import { MantineProvider, createTheme, Container, Title, Text, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import { useCityManager } from '../hooks/useCityManager';
import CitySelector from './CitySelector';
import CityGrid from './CityGrid';
import { performanceLogger, usePerformanceLogging } from '../utils/performance';

// Lazy load PerformancePanel to reduce initial bundle size
const PerformancePanel = React.lazy(() => import('./PerformancePanel'));
import type { CityData } from '../types';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

export default function App() {
  // Track App component performance
  usePerformanceLogging('App');
  
  // Check URL parameter to show/hide performance panel
  const [showPerformancePanel, setShowPerformancePanel] = React.useState(false);
  
  React.useEffect(() => {
    // Check for ?perf=1 in URL
    const urlParams = new URLSearchParams(window.location.search);
    setShowPerformancePanel(urlParams.get('perf') === '1');
  }, []);
  
  // Start timing city manager initialization
  performanceLogger.startTimer('CityManager Initialization');
  const { cities, addCity, removeCity, isLoading, hasStorageSupport, error } = useCityManager();
  
  // End timing when loading is complete
  React.useEffect(() => {
    if (!isLoading) {
      performanceLogger.endTimer('CityManager Initialization');
      performanceLogger.logMeasurement('Cities Loaded Count', cities.length);
    }
  }, [isLoading, cities.length]);

  const handleCitySelect = (city: CityData) => {
    const success = addCity(city);
    if (!success) {
      // Error handling is managed by the useCityManager hook
      console.log('Failed to add city');
    }
  };

  const handleCityRemove = (cityId: string) => {
    removeCity(cityId);
  };

  const selectedCityIds = cities.map(city => city.id);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container size="xl" py="xl">
        <Title order={1} ta="center" mb="xl">
          World Clock Dashboard
        </Title>
        <Text ta="center" c="dimmed" mb="xl">
          Select cities to track time across different time zones
        </Text>

        {/* Storage warning */}
        {!hasStorageSupport && (
          <Alert 
            icon={<IconInfoCircle size={16} />} 
            title="Storage not available" 
            color="yellow" 
            mb="lg"
          >
            Your selected cities will not be saved between browser sessions.
          </Alert>
        )}

        {/* Error display */}
        {error && (
          <Alert 
            icon={<IconInfoCircle size={16} />} 
            title="Notice" 
            color="red" 
            mb="lg"
          >
            {error}
          </Alert>
        )}

        {/* City selector */}
        <CitySelector 
          onCitySelect={handleCitySelect}
          selectedCityIds={selectedCityIds}
        />

        {/* Loading state */}
        {isLoading ? (
          <Text ta="center" c="dimmed">
            Loading your cities...
          </Text>
        ) : (
          /* City grid */
          <CityGrid 
            cities={cities}
            onRemoveCity={handleCityRemove}
          />
        )}
      </Container>
      
      {/* Performance Panel - Only show when ?perf=1 is in URL */}
      {showPerformancePanel && (
        <React.Suspense fallback={null}>
          <PerformancePanel />
        </React.Suspense>
      )}
    </MantineProvider>
  );
}