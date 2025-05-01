import {Router} from 'express';
import {api} from '../index.mjs';
import {model, Schema} from 'mongoose';

export const leaderBoard = Router();
api.use('/leader-board', leaderBoard);

export const LeaderBoard = model(
   'leader-board',
   new Schema({
      userId: Schema.Types.ObjectId,
      rank: Schema.Types.Number,
      value: Schema.Types.Number,
   }),
);
