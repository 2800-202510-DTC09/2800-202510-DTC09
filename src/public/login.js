function createHiddenInput(name, value) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
}

async function getUserIP() {
    try {
        const ipResponse = await fetch('https://ipecho.net/plain');
        const userIp = await ipResponse.text();
        return userIp.trim();
    } catch (error) {
        console.error('IP fetch error:', error);
        return '';
    }
}

// Code below was taken from location.js and repurposed
async function getLocationWithGeolocation() {
    try {
        // Get coordinates from the browser's geolocation IF supported
        const position = await new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const {latitude, longitude} = position.coords;

        // Send the JSON geo data to backend for location data
        await fetch('/api/geo-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({latitude, longitude}),
        });
        return {latitude, longitude, userIP: ''};
    } catch (error) {
        console.error(
            'Geolocation or Nominatim error:',
            error.message || error,
        );
        return fallbackToIP();
    }
}

async function fallbackToIP() {
    try {
        // Get the user's IP address from ipecho.net
        const ipResponse = await fetch('https://ipecho.net/plain');
        const userIp = await ipResponse.text();

        // Send the JSON IP data to backend for location data
        await fetch('/api/ip-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({clientIp: userIp.trim()}),
        });

        return {latitude: '', longitude: '', userIP: userIp.trim()};
    } catch (error) {
        console.error('IP location fallback error:', error.message || error);
        return {latitude: '', longitude: '', userIP: ''};
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    try {
        // Get location data and user IP in parallel
        const [locationData, userIP] = await Promise.all([
            getLocationWithGeolocation(),
            getUserIP(),
        ]);

        // Use userIP if available, otherwise use the one from locationData
        const finalIP = userIP || locationData.userIP;

        // Add hidden fields
        if (locationData.latitude) {
            form.appendChild(
                createHiddenInput('latitude', locationData.latitude),
            );
        }
        if (locationData.longitude) {
            form.appendChild(
                createHiddenInput('longitude', locationData.longitude),
            );
        }
        if (finalIP) {
            form.appendChild(createHiddenInput('ip', finalIP));
        }
    } catch (err) {
        console.error('Failed to get location or IP data:', err);
    }
});
