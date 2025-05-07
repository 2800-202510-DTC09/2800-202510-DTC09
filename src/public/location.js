
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

window.addEventListener('DOMContentLoaded', function () {
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

            const { latitude: lat, longitude: lon } = position.coords;

            // Fetch location data from Nominatim API
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
                headers: { 'User-Agent': 'SustainMe/1.0 (dgarcha9@my.bcit.ca)' }
            });
            const data = await res.json();
            const address = data.address;

            // Update The Card Elements on Profile
            cityEl.textContent = `City: ${address.city || address.town || address.village || 'Unknown'}`;
            countryEl.textContent = `Country: ${address.country || 'Unknown'}`;
            timezoneEl.textContent = `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

            // If geolocation fails, fallback to IP-based locations
        } catch (error) {
            console.error('Geolocation or Nominatim error:', error.message || error);
            fallbackToIP();
        }
    }

    async function fallbackToIP() {
        try {
            // Fetch location data from IPAPI
            const res = await fetch(`https://api.ipapi.com/api/check?access_key=a82b3de77ef402c6996211776aa1dfd7`);
            const data = await res.json();
            const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Update The Card Elements on Profile if found, else set to Unavailable
            cityEl.textContent = `City: ${data.city || 'Unavailable'}`;
            countryEl.textContent = `Country: ${data.country_name || 'Unavailable'}`;
            timezoneEl.textContent = `Timezone: ${browserTimezone || 'Unavailable'}`;

            // Check if the data is incomplete and log a warning if so
            if (!data.city || !data.country_name) {
                console.warn('IPAPI fallback warning: incomplete data');
            }
            // If errors occur, set the elements to Unavailable in catch block
        } catch (error) {
            console.error('IPAPI fallback error:', error);
            cityEl.textContent = 'City: Unavailable';
            countryEl.textContent = 'Country: Unavailable';
            timezoneEl.textContent = 'Timezone: Unavailable';
        }

    }

    // Call the primary function to get the location, fallback to IP if geolocation fails
    getLocationWithGeolocation();
});