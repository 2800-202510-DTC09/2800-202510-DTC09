import {Type} from '../../model/type.mjs';
import {type, normalize} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /type:
 *   get:
 *     description: Get all types
 *     tags:
 *       - Type
 *     responses:
 *       200:
 *         description: Fetched all types
 *       500:
 *         description: Server internal error
 */
type.get('/', async (req, res) => {
   try {
      res.status(status.OK).json(
         normalize(
            await Type.find({
               $or: [
                  {deletedAt: {$exists: false}},
                  {deletedAt: null},
                  {deletedAt: {$gt: req.timestamp}},
               ],
            }),
         ),
      );
   } catch (e) {
      console.error(e);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
   }
});
