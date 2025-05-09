import {Router} from 'express';
import {api} from '../index.mjs';
import {normalize as userNormalize} from '../user/index.mjs';

export const leaderBoard = Router();
api.use('/leader-board', leaderBoard);

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
                        'rank',
                        'value',
                     ].map((x) => [
                        x,
                        w[x],
                     ]),
                  ),
                  user: userNormalize(w.user),
               };
            } else {
               return null;
            }
         }
      })
      .filter((v) => v);
