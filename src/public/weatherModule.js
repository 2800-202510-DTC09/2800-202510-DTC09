import { fetchAQI } from './airQuality.js';
import { fetchUVIndex } from './uvIndex.js';

// Function to get user location from the backend API
async function getUserLocation() {
    try {
        // Fetch location data from backend API
        const response = await fetch('/api/user/profile', {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const userData = await response.json();

        // Check if location data exists in the user profile
        if (
            typeof userData?.location?.latitude !== 'undefined' &&
            typeof userData?.location?.longitude !== 'undefined'
        ) {
            return {
                lat: userData.location.latitude,
                lon: userData.location.longitude,
            };
        }
        // Handle case where location data is not available
        throw new Error('Location data not available in user profile');
    } catch (error) {
        console.error('Error fetching user location:', error);
        return null;
    }
}

// Function to initialize weather data display on main.html
async function initWeatherData() {
    // Get references to DOM elements
    const aqiEl = document.getElementById('aqiDisplay');
    const uvEl = document.getElementById('uvIndexDisplay');

    // Verify elements exist
    if (!aqiEl || !uvEl) {
        console.error('Weather display elements not found in the DOM');
        return;
    }

    // Show loading state
    aqiEl.textContent = 'Loading air quality data...';
    uvEl.textContent = 'Loading UV index data...';

    // Get user location from profile
    const coordinates = await getUserLocation();

    // This if statement is to handle when location data is unavailable
    if (!coordinates) {
        aqiEl.textContent = 'Unable to retrieve your location data.';
        uvEl.textContent = 'Unable to retrieve your location data.';
        return;
    }

    // Fetch weather data with coordinates
    fetchAQI(coordinates.lat, coordinates.lon);
    fetchUVIndex(coordinates.lat, coordinates.lon);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initWeatherData);
