import {Router} from 'express';
import {api} from '../index.mjs';

export const badge = Router();
api.use('/badge', badge);
