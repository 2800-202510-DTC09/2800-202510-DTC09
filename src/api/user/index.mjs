import {Router} from 'express';
import {api} from '..';

export const user = Router();
api.use('/user', user);
