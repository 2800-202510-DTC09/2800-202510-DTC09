import {Router} from 'express';
import {api} from '..';

export const tier = Router();
api.use('/tier', tier);
