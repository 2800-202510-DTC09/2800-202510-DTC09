import {model, Schema} from 'mongoose';

export const LeaderBoard = model(
   'leader-board',
   new Schema({
      userId: Schema.Types.ObjectId,
      rank: Schema.Types.Number,
      value: Schema.Types.Number,
   }),
);
