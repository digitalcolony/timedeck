/**
 * Time conversion utilities for the Quick Time Converter
 */

export interface ParsedTime {
  hours: number;
  minutes: number;
  timezone: string;
}

export interface ConversionResult {
  cityId: string;
  cityName: string;
  country: string;
  timezone: string;
  convertedTime: Date;
  timeString: string;
  dateString: string;
  dayDifference: number;
  hourDifference: number;
  dayNightIcon: string;
  relativeDifference: string;
}

/**
 * Parse various time input formats
 * Supports: "3 PM", "15:30", "3:30 PM", "noon", "midnight"
 */
export function parseTimeInput(input: string): ParsedTime | null {
  const cleanInput = input.trim().toLowerCase();
  
  // Handle special cases
  if (cleanInput === 'noon' || cleanInput === '12 pm') {
    return { hours: 12, minutes: 0, timezone: '' };
  }
  if (cleanInput === 'midnight' || cleanInput === '12 am') {
    return { hours: 0, minutes: 0, timezone: '' };
  }
  
  // Parse various time formats
  const timeRegex = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i;
  const match = cleanInput.match(timeRegex);
  
  if (!match) return null;
  
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2] || '0');
  const period = match[3]?.toLowerCase();
  
  // Validate input
  if (hours > 23 || minutes > 59) return null;
  if (period && (hours > 12 || hours === 0)) return null;
  
  // Convert to 24-hour format
  if (period === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period === 'am' && hours === 12) {
    hours = 0;
  } else if (!period && hours <= 12) {
    // If no AM/PM specified, make intelligent guess
    // 1-7 without AM/PM likely means PM (afternoon/evening)
    // 8-12 without AM/PM likely means AM (morning)
    if (hours >= 1 && hours <= 7) {
      hours += 12;
    }
  }
  
  return { hours, minutes, timezone: '' };
}

/**
 * Create a Date object for a specific time in a given timezone
 */
export function createTimeInTimezone(hours: number, minutes: number, timezone: string): Date {
  const now = new Date();
  
  // Create a date string in ISO format for today
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const timeString = `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  
  // Create the date and adjust for timezone
  const date = new Date(timeString);
  
  // Get timezone offset for the source timezone
  const tempDate = new Date();
  const utcTime = tempDate.getTime() + (tempDate.getTimezoneOffset() * 60000);
  
  // This is a simplified approach - for production, you'd want to use a proper timezone library like date-fns-tz
  return date;
}

/**
 * Convert a time from one timezone to another
 */
export function convertTimeToTimezone(sourceTime: Date, sourceTimezone: string, targetTimezone: string): Date {
  // Get the time as it would appear in the target timezone
  const targetTime = new Date(sourceTime.toLocaleString("en-US", { timeZone: targetTimezone }));
  return targetTime;
}

/**
 * Get day/night icon based on hour
 */
export function getDayNightIcon(hour: number): string {
  if (hour >= 5 && hour < 8) return '🌅'; // Sunrise
  if (hour >= 8 && hour < 17) return '☀️'; // Day
  if (hour >= 17 && hour < 20) return '🌇'; // Sunset
  return '🌙'; // Night
}

/**
 * Calculate the difference between two dates in hours
 */
export function calculateHourDifference(date1: Date, date2: Date): number {
  return Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60));
}

/**
 * Calculate the difference between two dates in days
 */
export function calculateDayDifference(date1: Date, date2: Date): number {
  const day1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const day2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.round((day2.getTime() - day1.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Format relative time difference for display
 */
export function formatRelativeTimeDifference(hourDiff: number, dayDiff: number): string {
  if (hourDiff === 0 && dayDiff === 0) {
    return 'Same time';
  }
  
  let result = '';
  
  // Format hour difference
  if (hourDiff > 0) {
    result = `${hourDiff} hr${hourDiff === 1 ? '' : 's'} ahead`;
  } else if (hourDiff < 0) {
    result = `${Math.abs(hourDiff)} hr${Math.abs(hourDiff) === 1 ? '' : 's'} behind`;
  }
  
  // Add day difference
  if (dayDiff > 0) {
    const dayText = dayDiff === 1 ? '+1 day' : `+${dayDiff} days`;
    result = result ? `${result}, ${dayText}` : dayText;
  } else if (dayDiff < 0) {
    const dayText = dayDiff === -1 ? '-1 day' : `${dayDiff} days`;
    result = result ? `${result}, ${dayText}` : dayText;
  }
  
  return result || 'Same time';
}

/**
 * Format conversion results for sharing/copying
 */
export function formatConversionForSharing(
  inputTime: string, 
  inputTimezone: string, 
  results: ConversionResult[]
): string {
  const timezoneLabel = inputTimezone.split('/').pop()?.replace('_', ' ') || inputTimezone;
  
  const header = `Time Conversion: ${inputTime} ${timezoneLabel}\n\n`;
  
  const cityResults = results
    .map(result => 
      `${result.cityName}: ${result.timeString} ${result.dayNightIcon} (${result.relativeDifference})`
    )
    .join('\n');
  
  const footer = '\n\nGenerated by TimeDeck';
  
  return header + cityResults + footer;
}