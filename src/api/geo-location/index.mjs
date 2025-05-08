import { Router } from 'express';
import { api } from '../index.mjs';

export const geoLocation = Router();
api.use('/geo-location', geoLocation); // define path