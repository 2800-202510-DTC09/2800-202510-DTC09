import {model, Schema} from 'mongoose';

export const Record = model(
   'record',
   new Schema({
      value: Schema.Types.Number,
      description: Schema.Types.String,
      type: Schema.Types.ObjectId,
   }),
);
