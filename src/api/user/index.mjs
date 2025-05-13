import {Router} from 'express';
import {api} from '../index.mjs';

export const user = Router();
api.use('/user', user);
