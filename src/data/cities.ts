import type { CityData } from "../types";

// Major world cities from different continents with proper IANA timezone identifiers
export const WORLD_CITIES: CityData[] = [
  // North America
  {
    id: "new-york-us",
    name: "New York",
    country: "United States",
    timezone: "America/New_York",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "los-angeles-us",
    name: "Los Angeles",
    country: "United States",
    timezone: "America/Los_Angeles",
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "chicago-us",
    name: "Chicago",
    country: "United States",
    timezone: "America/Chicago",
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
  {
    id: "toronto-ca",
    name: "Toronto",
    country: "Canada",
    timezone: "America/Toronto",
    coordinates: { lat: 43.6532, lng: -79.3832 },
  },
  {
    id: "vancouver-ca",
    name: "Vancouver",
    country: "Canada",
    timezone: "America/Vancouver",
    coordinates: { lat: 49.2827, lng: -123.1207 },
  },
  {
    id: "seattle-us",
    name: "Seattle",
    country: "United States",
    timezone: "America/Los_Angeles",
    coordinates: { lat: 47.6062, lng: -122.3321 },
  },
  {
    id: "mexico-city-mx",
    name: "Mexico City",
    country: "Mexico",
    timezone: "America/Mexico_City",
    coordinates: { lat: 19.4326, lng: -99.1332 },
  },

  // Central America
  {
    id: "guatemala-city-gt",
    name: "Guatemala City",
    country: "Guatemala",
    timezone: "America/Guatemala",
    coordinates: { lat: 14.6349, lng: -90.5069 },
  },
  {
    id: "san-jose-cr",
    name: "San José",
    country: "Costa Rica",
    timezone: "America/Costa_Rica",
    coordinates: { lat: 9.9281, lng: -84.0907 },
  },
  {
    id: "panama-city-pa",
    name: "Panama City",
    country: "Panama",
    timezone: "America/Panama",
    coordinates: { lat: 8.9824, lng: -79.5199 },
  },
  {
    id: "tegucigalpa-hn",
    name: "Tegucigalpa",
    country: "Honduras",
    timezone: "America/Tegucigalpa",
    coordinates: { lat: 14.0723, lng: -87.1921 },
  },
  {
    id: "managua-ni",
    name: "Managua",
    country: "Nicaragua",
    timezone: "America/Managua",
    coordinates: { lat: 12.1364, lng: -86.2514 },
  },

  // South America
  {
    id: "sao-paulo-br",
    name: "São Paulo",
    country: "Brazil",
    timezone: "America/Sao_Paulo",
    coordinates: { lat: -23.5505, lng: -46.6333 },
  },
  {
    id: "buenos-aires-ar",
    name: "Buenos Aires",
    country: "Argentina",
    timezone: "America/Argentina/Buenos_Aires",
    coordinates: { lat: -34.6118, lng: -58.396 },
  },
  {
    id: "lima-pe",
    name: "Lima",
    country: "Peru",
    timezone: "America/Lima",
    coordinates: { lat: -12.0464, lng: -77.0428 },
  },

  // Europe
  {
    id: "london-gb",
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    id: "paris-fr",
    name: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    id: "berlin-de",
    name: "Berlin",
    country: "Germany",
    timezone: "Europe/Berlin",
    coordinates: { lat: 52.52, lng: 13.405 },
  },
  {
    id: "rome-it",
    name: "Rome",
    country: "Italy",
    timezone: "Europe/Rome",
    coordinates: { lat: 41.9028, lng: 12.4964 },
  },
  {
    id: "madrid-es",
    name: "Madrid",
    country: "Spain",
    timezone: "Europe/Madrid",
    coordinates: { lat: 40.4168, lng: -3.7038 },
  },
  {
    id: "amsterdam-nl",
    name: "Amsterdam",
    country: "Netherlands",
    timezone: "Europe/Amsterdam",
    coordinates: { lat: 52.3676, lng: 4.9041 },
  },
  {
    id: "moscow-ru",
    name: "Moscow",
    country: "Russia",
    timezone: "Europe/Moscow",
    coordinates: { lat: 55.7558, lng: 37.6176 },
  },
  {
    id: "zurich-ch",
    name: "Zurich",
    country: "Switzerland",
    timezone: "Europe/Zurich",
    coordinates: { lat: 47.3769, lng: 8.5417 },
  },
  {
    id: "vienna-at",
    name: "Vienna",
    country: "Austria",
    timezone: "Europe/Vienna",
    coordinates: { lat: 48.2082, lng: 16.3738 },
  },
  {
    id: "prague-cz",
    name: "Prague",
    country: "Czech Republic",
    timezone: "Europe/Prague",
    coordinates: { lat: 50.0755, lng: 14.4378 },
  },
  {
    id: "stockholm-se",
    name: "Stockholm",
    country: "Sweden",
    timezone: "Europe/Stockholm",
    coordinates: { lat: 59.3293, lng: 18.0686 },
  },
  {
    id: "copenhagen-dk",
    name: "Copenhagen",
    country: "Denmark",
    timezone: "Europe/Copenhagen",
    coordinates: { lat: 55.6761, lng: 12.5683 },
  },
  {
    id: "oslo-no",
    name: "Oslo",
    country: "Norway",
    timezone: "Europe/Oslo",
    coordinates: { lat: 59.9139, lng: 10.7522 },
  },
  {
    id: "helsinki-fi",
    name: "Helsinki",
    country: "Finland",
    timezone: "Europe/Helsinki",
    coordinates: { lat: 60.1699, lng: 24.9384 },
  },
  {
    id: "warsaw-pl",
    name: "Warsaw",
    country: "Poland",
    timezone: "Europe/Warsaw",
    coordinates: { lat: 52.2297, lng: 21.0122 },
  },
  {
    id: "budapest-hu",
    name: "Budapest",
    country: "Hungary",
    timezone: "Europe/Budapest",
    coordinates: { lat: 47.4979, lng: 19.0402 },
  },
  {
    id: "brussels-be",
    name: "Brussels",
    country: "Belgium",
    timezone: "Europe/Brussels",
    coordinates: { lat: 50.8503, lng: 4.3517 },
  },

  // Asia
  {
    id: "tokyo-jp",
    name: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
  {
    id: "beijing-cn",
    name: "Beijing",
    country: "China",
    timezone: "Asia/Shanghai",
    coordinates: { lat: 39.9042, lng: 116.4074 },
  },
  {
    id: "shanghai-cn",
    name: "Shanghai",
    country: "China",
    timezone: "Asia/Shanghai",
    coordinates: { lat: 31.2304, lng: 121.4737 },
  },
  {
    id: "hong-kong-hk",
    name: "Hong Kong",
    country: "Hong Kong",
    timezone: "Asia/Hong_Kong",
    coordinates: { lat: 22.3193, lng: 114.1694 },
  },
  {
    id: "singapore-sg",
    name: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
    coordinates: { lat: 1.3521, lng: 103.8198 },
  },
  {
    id: "mumbai-in",
    name: "Mumbai",
    country: "India",
    timezone: "Asia/Kolkata",
    coordinates: { lat: 19.076, lng: 72.8777 },
  },
  {
    id: "delhi-in",
    name: "Delhi",
    country: "India",
    timezone: "Asia/Kolkata",
    coordinates: { lat: 28.7041, lng: 77.1025 },
  },
  {
    id: "bangkok-th",
    name: "Bangkok",
    country: "Thailand",
    timezone: "Asia/Bangkok",
    coordinates: { lat: 13.7563, lng: 100.5018 },
  },
  {
    id: "seoul-kr",
    name: "Seoul",
    country: "South Korea",
    timezone: "Asia/Seoul",
    coordinates: { lat: 37.5665, lng: 126.978 },
  },

  // Southeast Asia
  {
    id: "manila-ph",
    name: "Manila",
    country: "Philippines",
    timezone: "Asia/Manila",
    coordinates: { lat: 14.5995, lng: 120.9842 },
  },
  {
    id: "jakarta-id",
    name: "Jakarta",
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    coordinates: { lat: -6.2088, lng: 106.8456 },
  },
  {
    id: "kuala-lumpur-my",
    name: "Kuala Lumpur",
    country: "Malaysia",
    timezone: "Asia/Kuala_Lumpur",
    coordinates: { lat: 3.139, lng: 101.6869 },
  },
  {
    id: "ho-chi-minh-vn",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    timezone: "Asia/Ho_Chi_Minh",
    coordinates: { lat: 10.8231, lng: 106.6297 },
  },
  {
    id: "hanoi-vn",
    name: "Hanoi",
    country: "Vietnam",
    timezone: "Asia/Ho_Chi_Minh",
    coordinates: { lat: 21.0285, lng: 105.8542 },
  },
  {
    id: "yangon-mm",
    name: "Yangon",
    country: "Myanmar",
    timezone: "Asia/Yangon",
    coordinates: { lat: 16.8661, lng: 96.1951 },
  },
  {
    id: "phnom-penh-kh",
    name: "Phnom Penh",
    country: "Cambodia",
    timezone: "Asia/Phnom_Penh",
    coordinates: { lat: 11.5564, lng: 104.9282 },
  },

  // Middle East
  {
    id: "dubai-ae",
    name: "Dubai",
    country: "United Arab Emirates",
    timezone: "Asia/Dubai",
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  {
    id: "istanbul-tr",
    name: "Istanbul",
    country: "Turkey",
    timezone: "Europe/Istanbul",
    coordinates: { lat: 41.0082, lng: 28.9784 },
  },

  // Africa
  {
    id: "cairo-eg",
    name: "Cairo",
    country: "Egypt",
    timezone: "Africa/Cairo",
    coordinates: { lat: 30.0444, lng: 31.2357 },
  },
  {
    id: "johannesburg-za",
    name: "Johannesburg",
    country: "South Africa",
    timezone: "Africa/Johannesburg",
    coordinates: { lat: -26.2041, lng: 28.0473 },
  },
  {
    id: "lagos-ng",
    name: "Lagos",
    country: "Nigeria",
    timezone: "Africa/Lagos",
    coordinates: { lat: 6.5244, lng: 3.3792 },
  },
  {
    id: "nairobi-ke",
    name: "Nairobi",
    country: "Kenya",
    timezone: "Africa/Nairobi",
    coordinates: { lat: -1.2921, lng: 36.8219 },
  },
  {
    id: "casablanca-ma",
    name: "Casablanca",
    country: "Morocco",
    timezone: "Africa/Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
  },
  {
    id: "accra-gh",
    name: "Accra",
    country: "Ghana",
    timezone: "Africa/Accra",
    coordinates: { lat: 5.6037, lng: -0.187 },
  },
  {
    id: "addis-ababa-et",
    name: "Addis Ababa",
    country: "Ethiopia",
    timezone: "Africa/Addis_Ababa",
    coordinates: { lat: 9.145, lng: 38.7451 },
  },
  {
    id: "cape-town-za",
    name: "Cape Town",
    country: "South Africa",
    timezone: "Africa/Johannesburg",
    coordinates: { lat: -33.9249, lng: 18.4241 },
  },
  {
    id: "dar-es-salaam-tz",
    name: "Dar es Salaam",
    country: "Tanzania",
    timezone: "Africa/Dar_es_Salaam",
    coordinates: { lat: -6.7924, lng: 39.2083 },
  },

  // Oceania
  {
    id: "sydney-au",
    name: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
    coordinates: { lat: -33.8688, lng: 151.2093 },
  },
  {
    id: "melbourne-au",
    name: "Melbourne",
    country: "Australia",
    timezone: "Australia/Melbourne",
    coordinates: { lat: -37.8136, lng: 144.9631 },
  },
  {
    id: "auckland-nz",
    name: "Auckland",
    country: "New Zealand",
    timezone: "Pacific/Auckland",
    coordinates: { lat: -36.8485, lng: 174.7633 },
  },
];

// Helper function to get city by ID
export const getCityById = (id: string): CityData | undefined => {
  return WORLD_CITIES.find((city) => city.id === id);
};

// Helper function to search cities by name or country
export const searchCities = (query: string): CityData[] => {
  const searchTerm = query.toLowerCase();
  return WORLD_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm) ||
      city.country.toLowerCase().includes(searchTerm)
  );
};
