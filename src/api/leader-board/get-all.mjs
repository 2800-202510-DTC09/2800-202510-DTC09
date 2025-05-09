import {LeaderBoard} from '../../model/leader-board.mjs';
import {leaderBoard, normalize} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /leader-board:
 *   get:
 *     description: Get all leader board entries
 *     tags:
 *       - Leader Board
 *     responses:
 *       200:
 *         description: Fetched all leader board entries
 *       500:
 *         description: Server internal error
 */
leaderBoard.get('/', async (req, res) => {
   try {
      res.status(status.OK).json(
         normalize(
            await LeaderBoard.find({
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
