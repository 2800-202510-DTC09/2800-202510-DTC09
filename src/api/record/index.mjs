import {Router} from 'express';
import {api} from '../index.mjs';
import {model, Schema} from 'mongoose';

export const record = Router();
api.use('/record', record);

export const Record = model(
   'record',
   new Schema({
      value: Schema.Types.Number,
      description: Schema.Types.String,
      type: Schema.Types.ObjectId,
   }),
);
