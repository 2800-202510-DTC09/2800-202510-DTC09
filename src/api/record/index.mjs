import {Router} from 'express';
import {api} from '..';

export const record = Router();
api.use('/record', record);
