import {Router} from 'express';
import {api} from '../index.mjs';

export const record = Router();
api.use('/record', record);
