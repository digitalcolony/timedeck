import { useEffect, useRef } from 'react';

/**
 * Custom React hook for managing intervals with proper cleanup
 * @param callback - Function to call on each interval
 * @param delay - Delay in milliseconds, or null to pause the interval
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

/**
 * Custom React hook for managing multiple intervals efficiently
 * Useful when you need different update frequencies for different components
 */
export const useMultipleIntervals = (
  intervals: Array<{ callback: () => void; delay: number | null }>
) => {
  const savedCallbacks = useRef<Array<() => void>>([]);

  // Remember the latest callbacks
  useEffect(() => {
    savedCallbacks.current = intervals.map(interval => interval.callback);
  }, [intervals]);

  // Set up the intervals
  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];

    intervals.forEach((interval, index) => {
      if (interval.delay !== null) {
        const tick = () => {
          if (savedCallbacks.current[index]) {
            savedCallbacks.current[index]();
          }
        };

        const id = setInterval(tick, interval.delay);
        intervalIds.push(id);
      }
    });

    // Cleanup all intervals
    return () => {
      intervalIds.forEach(id => clearInterval(id));
    };
  }, [intervals.map(i => i.delay).join(',')]); // Stable dependency array
};