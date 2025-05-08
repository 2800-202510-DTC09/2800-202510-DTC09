import {Router} from 'express';
import {api} from '../index.mjs';

export const record = Router();
api.use('/record', record);

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
                     'userId',
                     'emission',
                     'description',
                     'type',
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
