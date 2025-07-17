import React, { useState } from 'react';
import { Select, Group, Text } from '@mantine/core';
import { IconWorldPin } from '@tabler/icons-react';
// Lazy load cities data to reduce initial bundle size
const getCities = () => import('../data/cities').then(m => m.WORLD_CITIES);
import { performanceLogger, usePerformanceLogging } from '../utils/performance';
import type { CityData } from '../types';

interface CitySelectorProps {
  onCitySelect: (city: CityData) => void;
  selectedCityIds: string[];
}

export default function CitySelector({ onCitySelect, selectedCityIds }: CitySelectorProps) {
  // Track CitySelector component performance
  usePerformanceLogging('CitySelector');
  
  const [searchValue, setSearchValue] = useState('');
  const [cities, setCities] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cities data on component mount
  React.useEffect(() => {
    getCities().then(worldCities => {
      setCities(worldCities);
      setIsLoading(false);
    });
  }, []);

  // Filter out already selected cities and create options for the Select component
  const availableCities = cities.filter(city => !selectedCityIds.includes(city.id));
  
  const selectData = availableCities.map(city => ({
    value: city.id,
    label: `${city.name}, ${city.country}`,
    city: city
  }));

  // Filter cities based on search input
  const filteredData = selectData.filter(item =>
    item.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCitySelection = (value: string | null) => {
    if (value) {
      const selectedOption = selectData.find(item => item.value === value);
      if (selectedOption) {
        onCitySelect(selectedOption.city);
        setSearchValue(''); // Clear search after selection
      }
    }
  };

  return (
    <Group gap="sm" align="center" mb="xl">
      <IconWorldPin size={20} />
      <Select
        placeholder="Search and select a city to add..."
        data={filteredData}
        value={null} // Always reset to null after selection
        onChange={handleCitySelection}
        searchable
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        clearable
        size="md"
        style={{ flex: 1 }}
        comboboxProps={{
          transitionProps: { transition: 'pop', duration: 200 },
        }}
        renderOption={({ option }) => {
          const cityData = selectData.find(item => item.value === option.value)?.city;
          return (
            <Group gap="sm">
              <div>
                <Text size="sm">{cityData?.name}</Text>
                <Text size="xs" c="dimmed">{cityData?.country}</Text>
              </div>
            </Group>
          );
        }}
        nothingFoundMessage={
          availableCities.length === 0 
            ? "All cities have been added to your dashboard"
            : "No cities found matching your search"
        }
      />
    </Group>
  );
}