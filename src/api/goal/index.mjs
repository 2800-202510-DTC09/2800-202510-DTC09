import {Router} from 'express';
import {api} from '../index.mjs';

export const goal = Router();
api.use('/goal', goal);
