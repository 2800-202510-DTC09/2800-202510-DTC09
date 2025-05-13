import {Router} from 'express';
import {api} from '..';

export const badge = Router();
api.use('/badge', badge);
