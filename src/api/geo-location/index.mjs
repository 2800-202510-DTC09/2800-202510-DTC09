import {Router as router} from 'express';
import {api} from '../index.mjs';

export const geoLocation = router();
// Define path
api.use('/geo-location', geoLocation);
