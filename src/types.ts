/**
 * Type definitions for the World Clock Dashboard
 */

export interface CityData {
  id: string;
  name: string;
  country: string;
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TimeData {
  time: string;
  date: string;
  timezone: string;
  timestamp?: number;
  timeOfDay?: {
    icon: string;
    label: string;
    period: 'sunrise' | 'day' | 'sunset' | 'night';
  };
}
