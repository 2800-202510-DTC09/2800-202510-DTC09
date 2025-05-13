import fs from 'fs/promises';
import path from 'path';
import haversine from 'haversine-distance';

const IATA_COORDS_FILE = path.resolve('../data/iata_to_coords.json');

let airportDataCache = null;

/**
 * Returns the distance (km) between two airports, given by IATA codes.
 */
export async function getFlightDistance(departureIATA, arrivalIATA) {
	if (!airportDataCache) {
		const fileContents = await fs.readFile(IATA_COORDS_FILE, 'utf-8');
		airportDataCache = JSON.parse(fileContents);
	}

	const departureAirport = airportDataCache[departureIATA];
	const arrivalAirport = airportDataCache[arrivalIATA];

	if (!departureAirport || !arrivalAirport) {
		const missingCode = !departureAirport ? departureIATA : arrivalIATA;
		throw new Error(`Missing coordinates for IATA code: ${missingCode}`);
	}

	const departureCoords = {
		latitude: departureAirport.lat,
		longitude: departureAirport.lon
	};

	const arrivalCoords = {
		latitude: arrivalAirport.lat,
		longitude: arrivalAirport.lon
	};

	const distanceInMeters = haversine(departureCoords, arrivalCoords);
	const distanceInKilometers = distanceInMeters / 1000;

	return Math.round(distanceInKilometers * 10) / 10; // rounded to 1 decimal place
}

// testing
const distance = await getFlightDistance('YVR', 'YEG');
console.log(distance);
