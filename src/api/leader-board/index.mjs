import {Router} from 'express';
import {api} from '../index.mjs';

export const leaderBoard = Router();
api.use('/leader-board', leaderBoard);
