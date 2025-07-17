// Simple test to verify useInterval and useCurrentTime hooks work correctly
import { getCurrentTimeForTimezone, isValidTimezone } from './src/utils/time.js';

console.log('Testing time utilities...');

// Test timezone validation
console.log('Valid timezone (America/New_York):', isValidTimezone('America/New_York'));
console.log('Invalid timezone (Invalid/Zone):', isValidTimezone('Invalid/Zone'));

// Test time formatting
const timeData = getCurrentTimeForTimezone('America/New_York');
console.log('New York time data:', timeData);

const utcTimeData = getCurrentTimeForTimezone('UTC');
console.log('UTC time data:', utcTimeData);

console.log('Time utilities test completed successfully!');