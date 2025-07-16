import type { CityData } from '../types';

const STORAGE_KEY = 'world-clock-cities';

// Storage utility functions with error handling
export const cityStorageUtils = {
  // Load cities from localStorage with validation
  loadCities(): CityData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      
      // Validate that parsed data is an array of valid CityData objects
      if (!Array.isArray(parsed)) {
        console.warn('Invalid city data format in localStorage, resetting');
        return [];
      }
      
      // Validate each city object has required properties
      const validCities = parsed.filter((city: any) => 
        city && 
        typeof city.id === 'string' &&
        typeof city.name === 'string' &&
        typeof city.country === 'string' &&
        typeof city.timezone === 'string'
      );
      
      if (validCities.length !== parsed.length) {
        console.warn('Some invalid city entries were filtered out');
      }
      
      return validCities;
    } catch (error) {
      console.error('Error loading cities from localStorage:', error);
      return [];
    }
  },

  // Save cities to localStorage with error handling
  saveCities(cities: CityData[]): boolean {
    try {
      const serialized = JSON.stringify(cities);
      localStorage.setItem(STORAGE_KEY, serialized);
      return true;
    } catch (error) {
      console.error('Error saving cities to localStorage:', error);
      // Handle quota exceeded or other storage errors
      if (error instanceof DOMException && error.code === 22) {
        console.error('localStorage quota exceeded');
      }
      return false;
    }
  },

  // Check if localStorage is available
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Clear all stored cities
  clearCities(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing cities from localStorage:', error);
      return false;
    }
  }
};