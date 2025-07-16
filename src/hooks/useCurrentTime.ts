import { useState, useEffect, useCallback } from 'react';
import type { TimeData } from '../types';
import { getCurrentTimeForTimezone } from '../utils/time';
import { useInterval } from './useInterval';

/**
 * Custom React hook for managing current time for a specific timezone
 * Optimized to only re-render when time values actually change
 * @param timezone - IANA timezone identifier
 * @returns TimeData object with current time information
 */
export const useCurrentTime = (timezone: string): TimeData => {
  const [timeData, setTimeData] = useState<TimeData>(() => 
    getCurrentTimeForTimezone(timezone)
  );

  // Update time when timezone changes
  useEffect(() => {
    setTimeData(getCurrentTimeForTimezone(timezone));
  }, [timezone]);

  // Optimized update function that only triggers re-render when values change
  const updateTime = useCallback(() => {
    const newTimeData = getCurrentTimeForTimezone(timezone);
    
    setTimeData(prevTimeData => {
      // Only update if time or date has actually changed
      if (
        prevTimeData.time !== newTimeData.time ||
        prevTimeData.date !== newTimeData.date ||
        prevTimeData.timezone !== newTimeData.timezone
      ) {
        return newTimeData;
      }
      return prevTimeData;
    });
  }, [timezone]);

  // Use the custom useInterval hook for efficient timer management
  useInterval(updateTime, 1000);

  return timeData;
};

/**
 * Custom React hook for managing current time for multiple timezones
 * Optimized to only re-render when time values actually change
 * @param timezones - Array of IANA timezone identifiers
 * @returns Map of timezone to TimeData objects
 */
export const useMultipleCurrentTimes = (timezones: string[]): Map<string, TimeData> => {
  const [timeDataMap, setTimeDataMap] = useState<Map<string, TimeData>>(() => {
    const initialMap = new Map<string, TimeData>();
    timezones.forEach(timezone => {
      initialMap.set(timezone, getCurrentTimeForTimezone(timezone));
    });
    return initialMap;
  });

  // Update times when timezones array changes
  useEffect(() => {
    const newMap = new Map<string, TimeData>();
    timezones.forEach(timezone => {
      newMap.set(timezone, getCurrentTimeForTimezone(timezone));
    });
    setTimeDataMap(newMap);
  }, [timezones.join(',')]); // Use join to create stable dependency

  // Optimized update function that only triggers re-render when values change
  const updateAllTimes = useCallback(() => {
    setTimeDataMap(prevMap => {
      const newMap = new Map<string, TimeData>();
      let hasChanges = false;

      timezones.forEach(timezone => {
        const newTimeData = getCurrentTimeForTimezone(timezone);
        const prevTimeData = prevMap.get(timezone);

        // Check if this timezone's data has actually changed
        if (
          !prevTimeData ||
          prevTimeData.time !== newTimeData.time ||
          prevTimeData.date !== newTimeData.date ||
          prevTimeData.timezone !== newTimeData.timezone
        ) {
          hasChanges = true;
        }

        newMap.set(timezone, newTimeData);
      });

      // Only return new map if there are actual changes
      return hasChanges ? newMap : prevMap;
    });
  }, [timezones.join(',')]);

  // Use the custom useInterval hook for efficient timer management
  useInterval(updateAllTimes, 1000);

  return timeDataMap;
};