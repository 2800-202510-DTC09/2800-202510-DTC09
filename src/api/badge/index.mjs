import {Router as router} from 'express';
import {api} from '../index.mjs';

export const badge = router();
api.use('/badge', badge);
