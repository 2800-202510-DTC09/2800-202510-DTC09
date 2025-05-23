// Function to fetch air quality data from the backend
export async function fetchAQI(lat, lon) {
    try {
        const response = await fetch(
            `/api/weather/air-quality?lat=${lat}&lon=${lon}`,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract AQI value from the OpenWeatherMap response structure
        const aqi = data?.list?.[0]?.main?.aqi;

        // Map AQI values to descriptive text
        const qualityMap = {
            1: 'Good',
            2: 'Fair',
            3: 'Moderate',
            4: 'Poor',
            5: 'Very Poor',
        };

        // Format display text based on data availability
        const aqiText =
            typeof aqi === 'number'
                ? `AQI: ${aqi} (${qualityMap[aqi] || 'Unknown'})`
                : 'Air quality data not available.';

        // Update the DOM element
        const aqiDisplay = document.getElementById('aqiDisplay');
        if (aqiDisplay) {
            aqiDisplay.textContent = aqiText;
        }
    } catch (error) {
        console.error('Air quality data fetch error:', error);
        const aqiDisplay = document.getElementById('aqiDisplay');
        if (aqiDisplay) {
            aqiDisplay.textContent = 'Failed to load air quality data.';
        }
    }
}
