import type { TimeData } from "../types";

// Time utility functions for timezone conversion and formatting

/**
 * Formats time for a specific timezone using Intl.DateTimeFormat
 * @param date - Date object to format
 * @param timezone - IANA timezone identifier
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (date: Date, timezone: string): string => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch (error) {
    // Fallback to UTC if timezone is invalid
    console.warn(`Invalid timezone: ${timezone}, falling back to UTC`);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }
};

/**
 * Formats date for a specific timezone using Intl.DateTimeFormat
 * @param date - Date object to format
 * @param timezone - IANA timezone identifier
 * @returns Formatted date string (e.g., "Jan 15, 2025")
 */
export const formatDate = (date: Date, timezone: string): string => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch (error) {
    // Fallback to UTC if timezone is invalid
    console.warn(`Invalid timezone: ${timezone}, falling back to UTC`);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }
};

/**
 * Gets timezone abbreviation for a specific timezone
 * @param timezone - IANA timezone identifier
 * @returns Timezone abbreviation (e.g., "EST", "PST")
 */
export const getTimezoneAbbreviation = (timezone: string): string => {
  try {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    });

    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find((part) => part.type === "timeZoneName");
    return timeZonePart?.value || timezone;
  } catch (error) {
    console.warn(
      `Invalid timezone: ${timezone}, using timezone as abbreviation`
    );
    return timezone;
  }
};

/**
 * Gets current time data for a specific timezone
 * @param timezone - IANA timezone identifier
 * @returns TimeData object with formatted time, date, timezone, and timestamp
 */
export const getCurrentTimeForTimezone = (timezone: string): TimeData => {
  const now = new Date();

  return {
    time: formatTime(now, timezone),
    date: formatDate(now, timezone),
    timezone: getTimezoneAbbreviation(timezone),
    timestamp: now.getTime(),
    timeOfDay: getTimeOfDay(timezone),
  };
};

/**
 * Validates if a timezone is supported by the browser
 * @param timezone - IANA timezone identifier to validate
 * @returns boolean indicating if timezone is valid
 */
export const isValidTimezone = (timezone: string): boolean => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Gets the time of day category based on local time
 * @param timezone - IANA timezone identifier
 * @returns Time of day category with icon and label
 */
export const getTimeOfDay = (timezone: string): {
  icon: string;
  label: string;
  period: 'sunrise' | 'day' | 'sunset' | 'night';
} => {
  try {
    const now = new Date();
    
    // Get the hour in the target timezone (24-hour format)
    const hour = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    }).format(now);
    
    const hourNum = parseInt(hour, 10);
    
    if (hourNum >= 5 && hourNum < 8) {
      return { icon: '🌅', label: 'Sunrise', period: 'sunrise' };
    } else if (hourNum >= 8 && hourNum < 17) {
      return { icon: '☀️', label: 'Day', period: 'day' };
    } else if (hourNum >= 17 && hourNum < 20) {
      return { icon: '🌇', label: 'Sunset', period: 'sunset' };
    } else {
      return { icon: '🌙', label: 'Night', period: 'night' };
    }
  } catch (error) {
    console.warn(`Error getting time of day for timezone: ${timezone}`);
    // Default to day if there's an error
    return { icon: '☀️', label: 'Day', period: 'day' };
  }
};
