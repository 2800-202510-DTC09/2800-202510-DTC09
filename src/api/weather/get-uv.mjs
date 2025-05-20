import axios from 'axios';
import {status} from 'http-status';
import {weather} from './index.mjs';

/**
 * @openapi
 * TODO
 * @DSG
 */
weather.get('/uv-index', async (req, res) => {
    const {lat, lon} = req.query;
    if (!lat || !lon) {
        return res
            .status(status.BAD_REQUEST)
            .json({error: 'Latitude and Longitude required'});
    }

    try {
        const {OPENWEATHER_API_KEY} = process.env;
        const response = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall`,
            {
                params: {
                    lat,
                    lon,
                    exclude: 'minutely,hourly,daily,alerts',
                    appid: OPENWEATHER_API_KEY,
                },
            },
        );

        const uvi = response.data?.current?.uvi;
        return res.status(status.OK).json({uvi});
    } catch (err) {
        console.error('UV index fetch error:', err);
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to fetch UV index',
        });
    }
});
