import React from 'react';
import { SimpleGrid, Container, Text, Stack, Button } from '@mantine/core';
import { IconWorldPin } from '@tabler/icons-react';
import { useMultipleCurrentTimes } from '../hooks/useCurrentTime';
import CityClockCard from './CityClockCard';
import { performanceLogger, usePerformanceLogging } from '../utils/performance';
import type { CityData } from '../types';

interface CityGridProps {
  cities: CityData[];
  onRemoveCity: (cityId: string) => void;
  onAddFirstCity?: () => void;
}

export default function CityGrid({ cities, onRemoveCity, onAddFirstCity }: CityGridProps) {
  // Track CityGrid component performance
  usePerformanceLogging('CityGrid');
  
  // Use a single timer for all cities to improve performance
  const timezones = cities.map(city => city.timezone);
  const timeDataMap = useMultipleCurrentTimes(timezones);

  // Track time data loading performance
  React.useEffect(() => {
    if (cities.length > 0) {
      performanceLogger.startTimer('Time Data Loading');
      const hasAllTimeData = cities.every(city => timeDataMap.get(city.timezone));
      if (hasAllTimeData) {
        performanceLogger.endTimer('Time Data Loading');
        performanceLogger.logMeasurement('Cities Rendered Count', cities.length);
      }
    }
  }, [cities.length, timeDataMap]);

  // Show empty state when no cities are selected
  if (cities.length === 0) {
    return (
      <Container size="sm" py="xl">
        <Stack align="center" gap="lg">
          <IconWorldPin size={48} stroke={1.5} color="var(--mantine-color-dimmed)" />
          <Text size="lg" fw={500} ta="center">
            No cities selected
          </Text>
          <Text size="sm" c="dimmed" ta="center" maw={400}>
            Add cities from around the world to track time across different time zones. 
            Use the search above to get started.
          </Text>
          {onAddFirstCity && (
            <Button variant="light" onClick={onAddFirstCity}>
              Add your first city
            </Button>
          )}
        </Stack>
      </Container>
    );
  }

  return (
    <SimpleGrid
      cols={{
        base: 1,    // Mobile: 1 card per row
        sm: 2,      // Tablet: 2 cards per row
        md: 3,      // Desktop: 3 cards per row
        lg: 4       // Large desktop: 4 cards per row
      }}
      spacing={{
        base: 'md',
        sm: 'lg'
      }}
      verticalSpacing={{
        base: 'md',
        sm: 'lg'
      }}
    >
      {cities.map((city) => (
        <CityClockCard
          key={city.id}
          city={city}
          timeData={timeDataMap.get(city.timezone)}
          onRemove={onRemoveCity}
        />
      ))}
    </SimpleGrid>
  );
}