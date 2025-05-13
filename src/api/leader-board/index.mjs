import {Router as router} from 'express';
import {api} from '../index.mjs';

export const leaderBoard = router();
api.use('/leader-board', leaderBoard);
