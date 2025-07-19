import React from 'react';
import { SimpleGrid, Container, Text, Stack, Button } from '@mantine/core';
import { IconWorldPin } from '@tabler/icons-react';
import { useMultipleCurrentTimes } from '../hooks/useCurrentTime';
import CityClockCard from './CityClockCard';

import type { CityData } from '../types';

interface CityGridProps {
  cities: CityData[];
  onRemoveCity: (cityId: string) => void;
  onAddFirstCity?: () => void;
}

export default function CityGrid({ cities, onRemoveCity, onAddFirstCity }: CityGridProps) {
  // Use a single timer for all cities to improve performance
  // Memoize timezones to prevent unnecessary re-renders
  const timezones = React.useMemo(() => cities.map(city => city.timezone), [cities]);
  const timeDataMap = useMultipleCurrentTimes(timezones);

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