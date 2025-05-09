import {Goal, normalize} from '../../model/goal.mjs';
import {goal} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /goal/{id}:
 *   get:
 *     description: Get goal by ID
 *     tags:
 *       - Goal
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Found a goal
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Server internal error
 */
goal.get('/:id', async (req, res) => {
   try {
      const goals = normalize(await Goal.findById(req.params.id));
      if (goals.length) {
         res.status(status.OK).json(goals.pop());
      } else {
         res.sendStatus(status.NOT_FOUND);
      }
   } catch (e) {
      console.error(e);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
   }
});
