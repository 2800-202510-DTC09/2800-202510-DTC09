import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leaderBoard/{id}:
 *   get:
 *     description: Get leaderBoard by ID
 *     tags:
 *       - Leader Board
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: leaderBoard ID
 *     responses:
 *       '200':
 *         description: Found a leaderBoard
 *       '404':
 *         description: leaderBoard not found
 */
leaderBoard.get('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.params.id});
});
