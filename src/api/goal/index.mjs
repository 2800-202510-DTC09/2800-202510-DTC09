import {Router} from 'express';
import {api} from '..';

export const goal = Router();
api.use('/goal', goal);
