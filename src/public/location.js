/**
 * This script fetches the user's location using the browser's geolocation API, and if that fails, it falls back to using the IPAPI service.
 * It updates the HTML elements on profile with the user's city, country, and timezone. The timezone is set to the browser's timezone.
 *
 *  *** NOTE ***
 * I used claude to help me clean up the try catch blocks and make the code more readable.
 * Otherwise, I consulted the documentation for the APIs used in this script.
 *
 * @author Dilinder Garcha
 * @version 1.0
 */

window.addEventListener('DOMContentLoaded', () => {
    const cityEl = document.querySelector('p[data-location="city"]');
    const countryEl = document.querySelector('p[data-location="country"]');
    const timezoneEl = document.querySelector('p[data-location="timezone"]');

    async function getLocationWithGeolocation() {
        try {
            // Get coordinates from the browser's geolocation IF supported
            const position = await new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation not supported'));
                    return;
                }
                // Check if the user has granted permission to the location prompt if so resolve, else reject
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const {latitude, longitude} = position.coords;

            // Send the JSON geo data to backend for location data
            const res = await fetch('/api/geo-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({latitude, longitude}),
            });

            const data = await res.json();

            // Update The Card Elements on Profile
            cityEl.textContent = `City: ${data.city}`;
            countryEl.textContent = `Country: ${data.country}`;
            timezoneEl.textContent = `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

            // If geolocation fails, fallback to IP-based locations
        } catch (error) {
            console.error(
                'Geolocation or Nominatim error:',
                error.message || error,
            );
            fallbackToIP();
        }
    }

    async function fallbackToIP() {
        try {
            // Get the user's IP address from ipecho.net
            const ipResponse = await fetch('https://ipecho.net/plain');
            const userIp = await ipResponse.text();
            // Console.log('Client-detected IP:', userIp); // debugging line

            // Send the JSON IP data to backend for location data
            const res = await fetch('/api/ip-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({clientIp: userIp.trim()}),
            });
            const data = await res.json();
            // Console.log('Backend IP data received:', data); // debugging line

            // Update The Card Elements on Profile if found, else set to Unavailable
            cityEl.textContent = `City: ${data.city || 'Unavailable'}`;
            countryEl.textContent = `Country: ${data.countryName || 'Unavailable'}`;
            timezoneEl.textContent = `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable'}`;

            // If errors occur, set the elements to Unavailable in catch block
        } catch (error) {
            console.error('IPAPI fallback error:', error);
            cityEl.textContent = 'City: Unavailable';
            countryEl.textContent = 'Country: Unavailable';
            timezoneEl.textContent = `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable'}`;
        }
    }

    // Call the primary function to get the location, fallback to IP if geolocation fails
    getLocationWithGeolocation();
});
