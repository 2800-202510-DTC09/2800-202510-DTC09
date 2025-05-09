import {Goal, normalize} from '../../model/goal.mjs';
import {goal} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /goal:
 *   get:
 *     description: Get all goals
 *     tags:
 *       - Goal
 *     responses:
 *       200:
 *         description: Fetched all goals
 *       500:
 *         description: Server internal error
 */
goal.get('/', async (req, res) => {
   try {
      res.status(status.OK).json(
         normalize(
            await Goal.find({
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
