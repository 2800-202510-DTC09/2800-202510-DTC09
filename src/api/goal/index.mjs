import {Router as router} from 'express';
import {api} from '../index.mjs';

export const goal = router();
api.use('/goal', goal);
