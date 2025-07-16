import type { CityData } from '../types';

// Major world cities from different continents with proper IANA timezone identifiers
export const WORLD_CITIES: CityData[] = [
  // North America
  {
    id: 'new-york-us',
    name: 'New York',
    country: 'United States',
    timezone: 'America/New_York',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'los-angeles-us',
    name: 'Los Angeles',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 'chicago-us',
    name: 'Chicago',
    country: 'United States',
    timezone: 'America/Chicago',
    coordinates: { lat: 41.8781, lng: -87.6298 }
  },
  {
    id: 'toronto-ca',
    name: 'Toronto',
    country: 'Canada',
    timezone: 'America/Toronto',
    coordinates: { lat: 43.6532, lng: -79.3832 }
  },
  {
    id: 'vancouver-ca',
    name: 'Vancouver',
    country: 'Canada',
    timezone: 'America/Vancouver',
    coordinates: { lat: 49.2827, lng: -123.1207 }
  },
  {
    id: 'mexico-city-mx',
    name: 'Mexico City',
    country: 'Mexico',
    timezone: 'America/Mexico_City',
    coordinates: { lat: 19.4326, lng: -99.1332 }
  },

  // South America
  {
    id: 'sao-paulo-br',
    name: 'São Paulo',
    country: 'Brazil',
    timezone: 'America/Sao_Paulo',
    coordinates: { lat: -23.5505, lng: -46.6333 }
  },
  {
    id: 'buenos-aires-ar',
    name: 'Buenos Aires',
    country: 'Argentina',
    timezone: 'America/Argentina/Buenos_Aires',
    coordinates: { lat: -34.6118, lng: -58.3960 }
  },
  {
    id: 'lima-pe',
    name: 'Lima',
    country: 'Peru',
    timezone: 'America/Lima',
    coordinates: { lat: -12.0464, lng: -77.0428 }
  },

  // Europe
  {
    id: 'london-gb',
    name: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    coordinates: { lat: 51.5074, lng: -0.1278 }
  },
  {
    id: 'paris-fr',
    name: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: 'berlin-de',
    name: 'Berlin',
    country: 'Germany',
    timezone: 'Europe/Berlin',
    coordinates: { lat: 52.5200, lng: 13.4050 }
  },
  {
    id: 'rome-it',
    name: 'Rome',
    country: 'Italy',
    timezone: 'Europe/Rome',
    coordinates: { lat: 41.9028, lng: 12.4964 }
  },
  {
    id: 'madrid-es',
    name: 'Madrid',
    country: 'Spain',
    timezone: 'Europe/Madrid',
    coordinates: { lat: 40.4168, lng: -3.7038 }
  },
  {
    id: 'amsterdam-nl',
    name: 'Amsterdam',
    country: 'Netherlands',
    timezone: 'Europe/Amsterdam',
    coordinates: { lat: 52.3676, lng: 4.9041 }
  },
  {
    id: 'moscow-ru',
    name: 'Moscow',
    country: 'Russia',
    timezone: 'Europe/Moscow',
    coordinates: { lat: 55.7558, lng: 37.6176 }
  },

  // Asia
  {
    id: 'tokyo-jp',
    name: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    coordinates: { lat: 35.6762, lng: 139.6503 }
  },
  {
    id: 'beijing-cn',
    name: 'Beijing',
    country: 'China',
    timezone: 'Asia/Shanghai',
    coordinates: { lat: 39.9042, lng: 116.4074 }
  },
  {
    id: 'shanghai-cn',
    name: 'Shanghai',
    country: 'China',
    timezone: 'Asia/Shanghai',
    coordinates: { lat: 31.2304, lng: 121.4737 }
  },
  {
    id: 'hong-kong-hk',
    name: 'Hong Kong',
    country: 'Hong Kong',
    timezone: 'Asia/Hong_Kong',
    coordinates: { lat: 22.3193, lng: 114.1694 }
  },
  {
    id: 'singapore-sg',
    name: 'Singapore',
    country: 'Singapore',
    timezone: 'Asia/Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    id: 'mumbai-in',
    name: 'Mumbai',
    country: 'India',
    timezone: 'Asia/Kolkata',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'delhi-in',
    name: 'Delhi',
    country: 'India',
    timezone: 'Asia/Kolkata',
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
  {
    id: 'bangkok-th',
    name: 'Bangkok',
    country: 'Thailand',
    timezone: 'Asia/Bangkok',
    coordinates: { lat: 13.7563, lng: 100.5018 }
  },
  {
    id: 'seoul-kr',
    name: 'Seoul',
    country: 'South Korea',
    timezone: 'Asia/Seoul',
    coordinates: { lat: 37.5665, lng: 126.9780 }
  },

  // Middle East
  {
    id: 'dubai-ae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    coordinates: { lat: 25.2048, lng: 55.2708 }
  },
  {
    id: 'istanbul-tr',
    name: 'Istanbul',
    country: 'Turkey',
    timezone: 'Europe/Istanbul',
    coordinates: { lat: 41.0082, lng: 28.9784 }
  },

  // Africa
  {
    id: 'cairo-eg',
    name: 'Cairo',
    country: 'Egypt',
    timezone: 'Africa/Cairo',
    coordinates: { lat: 30.0444, lng: 31.2357 }
  },
  {
    id: 'johannesburg-za',
    name: 'Johannesburg',
    country: 'South Africa',
    timezone: 'Africa/Johannesburg',
    coordinates: { lat: -26.2041, lng: 28.0473 }
  },
  {
    id: 'lagos-ng',
    name: 'Lagos',
    country: 'Nigeria',
    timezone: 'Africa/Lagos',
    coordinates: { lat: 6.5244, lng: 3.3792 }
  },

  // Oceania
  {
    id: 'sydney-au',
    name: 'Sydney',
    country: 'Australia',
    timezone: 'Australia/Sydney',
    coordinates: { lat: -33.8688, lng: 151.2093 }
  },
  {
    id: 'melbourne-au',
    name: 'Melbourne',
    country: 'Australia',
    timezone: 'Australia/Melbourne',
    coordinates: { lat: -37.8136, lng: 144.9631 }
  },
  {
    id: 'auckland-nz',
    name: 'Auckland',
    country: 'New Zealand',
    timezone: 'Pacific/Auckland',
    coordinates: { lat: -36.8485, lng: 174.7633 }
  }
];

// Helper function to get city by ID
export const getCityById = (id: string): CityData | undefined => {
  return WORLD_CITIES.find(city => city.id === id);
};

// Helper function to search cities by name or country
export const searchCities = (query: string): CityData[] => {
  const searchTerm = query.toLowerCase();
  return WORLD_CITIES.filter(city => 
    city.name.toLowerCase().includes(searchTerm) ||
    city.country.toLowerCase().includes(searchTerm)
  );
};