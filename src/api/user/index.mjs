import {Router} from 'express';
import {api} from '../index.mjs';

export const user = Router();
api.use('/user', user);

export const normalize = (v) =>
   [
      v,
   ]
      .flat()
      .filter((w) => w)
      .map((w) => {
         {
            if (!w.deletedAt || w.deletedAt > Date.now()) {
               return Object.fromEntries(
                  [
                     'id',
                     'email',
                     'username',
                     'badges',
                     'score',
                     'types',
                  ].map((x) => [
                     x,
                     w[x],
                  ]),
               );
            } else {
               return null;
            }
         }
      })
      .filter((v) => v);
