import axios from 'axios';
import {status} from 'http-status';
import {weather} from './index.mjs';

/**
 * @openapi
 * TODO
 * @DSG
 */
weather.get('/air-quality', async (req, res) => {
    const {lat, lon} = req.query;
    if (!lat || !lon) {
        return res
            .status(status.BAD_REQUEST)
            .json({error: 'Latitude and Longitude required'});
    }

    try {
        const {OPENWEATHER_API_KEY} = process.env;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`,
        );
        return res.status(status.OK).json(response.data);
    } catch (error) {
        console.error('AQI fetch error:', error);
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to fetch AQI',
        });
    }
});
