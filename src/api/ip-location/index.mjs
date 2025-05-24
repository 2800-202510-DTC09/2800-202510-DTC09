import {Router as router} from 'express';
import {api} from '../index.mjs';

export const ipLocation = router();
api.use('/ip-location', ipLocation);
