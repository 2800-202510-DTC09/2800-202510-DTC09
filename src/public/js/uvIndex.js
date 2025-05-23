// Constant values for UV index categories
const UV_LOW = 3;
const UV_MODERATE = 6;
const UV_HIGH = 8;
const UV_VERY_HIGH = 11;

// Function to determine UV index category based on the value
function getUVCategory(uvi) {
    if (!Number.isFinite(uvi)) return '';
    if (uvi < UV_LOW) return ' (Low)';
    if (uvi < UV_MODERATE) return ' (Moderate)';
    if (uvi < UV_HIGH) return ' (High)';
    if (uvi < UV_VERY_HIGH) return ' (Very High)';
    return ' (Extreme)';
}

// Function to format UV index text for display
function getUVText(uvi) {
    if (Number.isFinite(uvi)) {
        const uvCategory = getUVCategory(uvi);
        return `UV Index: ${uvi}${uvCategory}`;
    }
    return 'UV index data not available.';
}

// Function to update the UV index display element in the DOM
function updateUVIndexDisplay(text) {
    const uvIndexDisplay = document.getElementById('uvIndexDisplay');
    if (uvIndexDisplay) {
        uvIndexDisplay.textContent = text;
    }
}

// Function to fetch UV index data from the backend API
export async function fetchUVIndex(lat, lon) {
    try {
        const response = await fetch(
            `/api/weather/uv-index?lat=${lat}&lon=${lon}`,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const uvi = data?.uvi;
        const uvText = getUVText(uvi);
        updateUVIndexDisplay(uvText);
    } catch (error) {
        console.error('UV index fetch error:', error);
        updateUVIndexDisplay('Failed to load UV index data.');
    }
}
