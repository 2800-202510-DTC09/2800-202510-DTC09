import {Router as router} from 'express';
import {api} from '../index.mjs';

export const geoLocation = router();
api.use('/geo-location', geoLocation);
