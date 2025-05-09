import {Record} from '../../model/record.mjs';
import {record, normalize} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /record:
 *   get:
 *     description: Get all records
 *     tags:
 *       - Record
 *     responses:
 *       200:
 *         description: Fetched all records
 *       500:
 *         description: Server internal error
 */
record.get('/', async (req, res) => {
   try {
      res.status(status.OK).json(
         normalize(
            await Record.find({
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
