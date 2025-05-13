import {Router} from 'express';
import {api} from '..';

export const leaderBoard = Router();
api.use('/leader-board', leaderBoard);
