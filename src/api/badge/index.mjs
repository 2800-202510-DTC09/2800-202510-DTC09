import {Router} from 'express';
import {api} from '../index.mjs';
import {model, Schema} from 'mongoose';

export const badge = Router();
api.use('/badge', badge);

export const Badge = model(
   'badge',
   new Schema({
      name: String,
      description: String,
      icon: String,
      criteria: String,
   }),
);
