import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leaderBoard/{id}:
 *   delete:
 *     description: Delete leaderBoard
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
 *       '202':
 *         description: leaderBoard is deleted
 *       '404':
 *         description: leaderBoard not found
 */
leaderBoard.delete('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
