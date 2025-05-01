import {Router} from 'express';
import {api} from '../index.mjs';
import {model, Schema} from 'mongoose';

export const user = Router();
api.use('/user', user);

export const User = model(
   'user',
   new Schema({
      username: String,
      password: String,
   }),
);
