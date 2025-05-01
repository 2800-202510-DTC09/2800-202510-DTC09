import {model, Schema} from 'mongoose';

export const Badge = model(
   'badge',
   new Schema({
      name: Schema.Types.String,
      description: Schema.Types.String,
      icon: Schema.Types.String,
      criteria: Schema.Types.String,
   }),
);
