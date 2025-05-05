import {model, Schema} from 'mongoose';

export const Record = model(
   'record',
   new Schema({
      userId: Schema.Types.ObjectId,
      emission: Schema.Types.Number,
      description: Schema.Types.String,
      type: Schema.Types.ObjectId,
   }),
);
