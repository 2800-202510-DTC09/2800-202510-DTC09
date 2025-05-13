import {Router} from 'express';
import {api} from '../index.mjs';

export const tier = Router();
api.use('/tier', tier);
