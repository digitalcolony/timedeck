import { useState, useEffect, useCallback } from 'react';
import type { CityData } from '../types';
import { cityStorageUtils } from '../utils/cityStorage';

interface UseCityManagerReturn {
  cities: CityData[];
  addCity: (city: CityData) => boolean;
  removeCity: (cityId: string) => boolean;
  reorderCities: (reorderedCities: CityData[]) => boolean;
  isLoading: boolean;
  hasStorageSupport: boolean;
  error: string | null;
}

export const useCityManager = (): UseCityManagerReturn => {
  // Initialize storage support immediately to prevent flash
  const [hasStorageSupport] = useState(() => cityStorageUtils.isStorageAvailable());
  const [cities, setCities] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize cities from localStorage on mount
  useEffect(() => {
    const initializeCities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (hasStorageSupport) {
          const loadedCities = cityStorageUtils.loadCities();
          setCities(loadedCities);
        }
      } catch (err) {
        setError('Failed to initialize city data');
        console.error('Error initializing cities:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCities();
  }, [hasStorageSupport]);

  // Add a city to the list
  const addCity = useCallback((city: CityData): boolean => {
    try {
      setError(null);
      
      // Check if city already exists
      const cityExists = cities.some(existingCity => existingCity.id === city.id);
      if (cityExists) {
        setError(`${city.name} is already in your dashboard`);
        return false;
      }
      
      const updatedCities = [...cities, city];
      setCities(updatedCities);
      
      // Save to localStorage if available
      if (hasStorageSupport) {
        const saveSuccess = cityStorageUtils.saveCities(updatedCities);
        if (!saveSuccess) {
          setError('Failed to save city. Changes may not persist.');
        }
      }
      
      return true;
    } catch (err) {
      setError('Failed to add city');
      console.error('Error adding city:', err);
      return false;
    }
  }, [cities, hasStorageSupport]);

  // Remove a city from the list
  const removeCity = useCallback((cityId: string): boolean => {
    try {
      setError(null);
      
      const updatedCities = cities.filter(city => city.id !== cityId);
      setCities(updatedCities);
      
      // Save to localStorage if available
      if (hasStorageSupport) {
        const saveSuccess = cityStorageUtils.saveCities(updatedCities);
        if (!saveSuccess) {
          setError('Failed to save changes. City may reappear on refresh.');
        }
      }
      
      return true;
    } catch (err) {
      setError('Failed to remove city');
      console.error('Error removing city:', err);
      return false;
    }
  }, [cities, hasStorageSupport]);

  // Reorder cities (for drag and drop)
  const reorderCities = useCallback((reorderedCities: CityData[]): boolean => {
    try {
      setError(null);
      
      setCities(reorderedCities);
      
      // Save to localStorage if available
      if (hasStorageSupport) {
        const saveSuccess = cityStorageUtils.saveCities(reorderedCities);
        if (!saveSuccess) {
          setError('Failed to save new order. Changes may not persist.');
        }
      }
      
      return true;
    } catch (err) {
      setError('Failed to reorder cities');
      console.error('Error reordering cities:', err);
      return false;
    }
  }, [hasStorageSupport]);

  return {
    cities,
    addCity,
    removeCity,
    reorderCities,
    isLoading,
    hasStorageSupport,
    error
  };
};