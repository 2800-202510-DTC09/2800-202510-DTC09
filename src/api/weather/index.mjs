import {Router as router} from 'express';
import {api} from '../index.mjs';

export const weather = router();
api.use('/weather', weather);
