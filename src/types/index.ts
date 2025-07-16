// Core data interfaces for the World Clock Dashboard

export interface CityData {
  id: string;           // Unique identifier (e.g., "new-york-us")
  name: string;         // Display name (e.g., "New York")
  country: string;      // Country name (e.g., "United States")
  timezone: string;     // IANA timezone (e.g., "America/New_York")
  coordinates?: {       // Optional for future features
    lat: number;
    lng: number;
  };
}

export interface TimeData {
  time: string;         // Formatted time (e.g., "2:30 PM")
  date: string;         // Formatted date (e.g., "Jan 15, 2025")
  timezone: string;     // Timezone abbreviation (e.g., "EST")
  timestamp: number;    // Unix timestamp
}

export interface AppState {
  selectedCities: CityData[];
  isLoading: boolean;
  lastUpdated: number;
}