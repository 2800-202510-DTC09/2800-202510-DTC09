import {model, Schema} from 'mongoose';

export const Goal = model(
   'goal',
   new Schema({
      name: Schema.Types.String,
      description: Schema.Types.String,
      icon: Schema.Types.String,
      emission: Schema.Types.Number,
      emissionDiff: Schema.Types.Number,
      emissionDiffPeriod: Schema.Types.Number,
   }),
);
