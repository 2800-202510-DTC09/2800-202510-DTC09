import {model, Schema} from 'mongoose';

export const Record = model(
   'record',
   new Schema({
      name: Schema.Types.String,
      description: Schema.Types.String,
   }),
);
