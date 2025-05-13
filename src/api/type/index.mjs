import {Router} from 'express';
import {api} from '..';

export const type = Router();
api.use('/type', type);
