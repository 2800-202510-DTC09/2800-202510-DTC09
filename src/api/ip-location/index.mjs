import {Router as router} from 'express';
import {api} from '../index.mjs';

export const ipLocation = router();
// Define path
api.use('/ip-location', ipLocation);
