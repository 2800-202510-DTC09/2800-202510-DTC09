import {Router} from 'express';
import {api} from '..';

export const ipLocation = Router();
api.use('/ip-location', ipLocation); // Define path
