import {Router} from 'express';
import {api} from '../index.mjs';
import {normalize as userNormalize} from '../user/index.mjs';
import {normalize as typeNormalize} from '../type/index.mjs';
import {User} from '../../model/user.mjs';
import {Type} from '../../model/type.mjs';

export const record = Router();
api.use('/record', record);

export const normalize = async (v) =>
   (
      await Promise.all(
         [
            v,
         ]
            .flat()
            .filter((w) => w)
            .map(async (w) => {
               {
                  if (!w.deletedAt || w.deletedAt > Date.now()) {
                     return {
                        user: userNormalize(await User.findById(w.userId)),
                        emission: w.emission,
                        description: w.description,
                        type: typeNormalize(await Type.findById(w.typeId)),
                     };
                  } else {
                     return null;
                  }
               }
            }),
      )
   ).filter((v) => v);
