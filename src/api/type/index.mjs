import {Router} from 'express';
import {api} from '../index.mjs';

export const type = Router();
api.use('/type', type);
