import {Router} from 'express';
import {api} from '..';

export const geoLocation = Router();
api.use('/geo-location', geoLocation); // Define path
