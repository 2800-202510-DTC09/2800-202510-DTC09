import {Router} from 'express';
import {api} from '../index.mjs';
import {normalize as userNormalize} from '../user/index.mjs';
import {normalize as typeNormalize} from '../type/index.mjs';

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
               return {
                  ...Object.fromEntries(
                     [
                        'id',
                        'emission',
                        'description',
                     ].map((x) => [
                        x,
                        w[x],
                     ]),
                  ),
                  user: userNormalize(w.user),
                  type: typeNormalize(w.type),
               };
            } else {
               return null;
            }
         }
      })
      .filter((v) => v);
