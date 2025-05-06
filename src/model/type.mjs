import {model, Schema} from 'mongoose';

export const Type = model(
   'type',
   new Schema({
      name: Schema.Types.String,
      description: Schema.Types.String,
   }),
);
