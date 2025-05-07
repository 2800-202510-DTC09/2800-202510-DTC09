import {Router} from 'express';
import {api} from '../index.mjs';

export const user = Router();
api.use('/user', user);

export const normalize = (v) =>
   [
      v,
   ]
      .flat()
      .filter((v) => v)
      .map((w) => {
         {
            if (!w.deletedAt || w.deletedAt > Date.now()) {
               return {
                  id: w.id,
                  username: w.username,
                  badges: w.badges,
                  score: w.score,
                  types: w.types,
               };
            } else {
               return null;
            }
         }
      })
      .filter((v) => v);
