import {Router} from 'express';
import {api} from '../index.mjs';
import {model, Schema} from 'mongoose';

export const badge = Router();
api.use('/badge', badge);

export const Badge = model(
   'badge',
   new Schema({
      name: Schema.Types.String,
      description: Schema.Types.String,
      icon: Schema.Types.String,
      criteria: Schema.Types.String,
   }),
);
