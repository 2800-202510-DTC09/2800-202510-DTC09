import {model, Schema} from 'mongoose';

export const User = model(
   'user',
   new Schema({
      username: Schema.Types.String,
      password: Schema.Types.String,
      badges: [
         Schema.Types.ObjectId,
      ],
   }),
);
