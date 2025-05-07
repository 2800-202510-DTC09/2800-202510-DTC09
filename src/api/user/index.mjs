import {Router} from 'express';
import {api} from '../index.mjs';

export const user = Router();
api.use('/user', user);

export const normalize = (v) => ({
   id: v._id,
   username: v.username,
   badges: v.badges,
   score: v.score,
   types: v.types,
});
