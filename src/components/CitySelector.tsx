import React, { useState } from 'react';
import { Select, Group, Text, useMantineColorScheme } from '@mantine/core';
import { IconWorldPin } from '@tabler/icons-react';
// Lazy load cities data to reduce initial bundle size
const getCities = () => import('../data/cities').then(m => m.WORLD_CITIES);

import type { CityData } from '../types';

interface CitySelectorProps {
  onCitySelect: (city: CityData) => void;
  selectedCityIds: string[];
}

export default function CitySelector({ onCitySelect, selectedCityIds }: CitySelectorProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [searchValue, setSearchValue] = useState('');
  const [cities, setCities] = useState<CityData[]>([]);

  // Load cities data on component mount
  React.useEffect(() => {
    getCities().then(worldCities => {
      setCities(worldCities);
    });
  }, []);

  // Memoize expensive filtering operations to prevent recalculation on every render
  const selectData = React.useMemo(() => {
    const availableCities = cities.filter(city => !selectedCityIds.includes(city.id));
    return availableCities.map(city => ({
      value: city.id,
      label: `${city.name}, ${city.country}`,
      city: city
    }));
  }, [cities, selectedCityIds]);

  // Memoize filtered data based on search input
  const filteredData = React.useMemo(() => {
    if (!searchValue) return selectData;
    return selectData.filter(item =>
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [selectData, searchValue]);

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
    <Group gap="md" align="center" mb="xl" 
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: isDark ? '1px solid #475569' : '1px solid #cbd5e1',
        boxShadow: isDark 
          ? '0 4px 6px rgba(0, 0, 0, 0.2)'
          : '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}
    >
      <IconWorldPin 
        size={24} 
        style={{ 
          color: '#f97316',
          filter: 'drop-shadow(0 2px 4px rgba(249, 115, 22, 0.2))'
        }} 
      />
      <Select
        placeholder="🔍 Discover a new destination..."
        data={filteredData}
        value={null} // Always reset to null after selection
        onChange={handleCitySelection}
        searchable
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        clearable
        size="lg"
        style={{ 
          flex: 1,
          fontFamily: 'Poppins, system-ui, sans-serif'
        }}
        styles={{
          input: {
            border: isDark ? '2px solid #475569' : '2px solid #e2e8f0',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: 500,
            backgroundColor: isDark ? '#334155' : '#ffffff',
            color: isDark ? '#f1f5f9' : '#1e293b',
            '&:focus': {
              borderColor: '#1e40af',
              boxShadow: '0 0 0 3px rgba(30, 64, 175, 0.1)'
            }
          },
          dropdown: {
            border: isDark ? '2px solid #475569' : '2px solid #e2e8f0',
            borderRadius: '0.75rem',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            boxShadow: isDark 
              ? '0 10px 25px rgba(0, 0, 0, 0.3)'
              : '0 10px 25px rgba(0, 0, 0, 0.1)'
          }
        }}
        comboboxProps={{
          transitionProps: { transition: 'pop', duration: 200 },
        }}
        renderOption={({ option }) => {
          const cityData = selectData.find(item => item.value === option.value)?.city;
          return (
            <Group gap="sm" style={{ padding: '0.5rem' }}>
              <div>
                <Text size="sm" fw={600} style={{ 
                  color: isDark ? '#60a5fa' : '#1e40af' 
                }}>
                  {cityData?.name}
                </Text>
                <Text size="xs" c="dimmed" fw={500}>
                  {cityData?.country}
                </Text>
              </div>
            </Group>
          );
        }}
        nothingFoundMessage={
          <Text ta="center" c="dimmed" py="md">
            {selectData.length === 0 
              ? "🎉 You've explored all available destinations!"
              : "🗺️ No cities found matching your search"}
          </Text>
        }
      />
    </Group>
  );
}