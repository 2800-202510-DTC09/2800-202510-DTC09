import {Error} from 'mongoose';
import {leaderBoard, normalize} from './index.mjs';
import {LeaderBoard} from '../../model/leader-board.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /leader-board:
 *   post:
 *     description: Create leader board entry
 *     tags:
 *       - Leader Board
 *     requestBody:
 *       description: Leader board information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: 681342414429d3a18ad3fb45
 *               rank:
 *                 type: number
 *                 example: 1
 *               value:
 *                 type: number
 *                 example: 9999
 *     responses:
 *       200:
 *         description: A leader board entry is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
leaderBoard.post('/', async (req, res) => {
   try {
      const leaderBoard = await new LeaderBoard(
         Object.fromEntries(
            [
               'user',
               'rank',
               'value',
            ].map((v) => [
               v,
               req.body[v],
            ]),
         ),
      ).populate([
         'user',
      ]);

      const errors = [];
      await Promise.all([
         (async () => {
            if (!leaderBoard.user) {
               errors.push(
                  new Error.ValidatorError({
                     message: 'Path `user` is invalid.',
                     type: 'required',
                     path: 'user',
                     value: req.body.userId,
                     reason: '`user` not found in `users`',
                  }),
               );
            }
         })(),
      ]);
      if (errors.length) {
         const error = new Error.ValidationError();
         errors.forEach((v) => {
            error.addError(v.path, v);
         });
         throw error;
      }

      res.status(status.OK).json(normalize(await leaderBoard.save()).pop());
   } catch (e) {
      if (e.name === Error.ValidationError.name) {
         res.status(status.BAD_REQUEST).json(e.errors);
      } else {
         console.error(e);
         res.sendStatus(status.INTERNAL_SERVER_ERROR);
      }
   }
});
