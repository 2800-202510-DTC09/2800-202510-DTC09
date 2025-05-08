import {Router} from 'express';
import {api} from '../index.mjs';

export const type = Router();
api.use('/type', type);

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
                     'name',
                     'description',
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
