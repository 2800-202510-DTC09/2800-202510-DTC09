import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leaderBoard/{id}:
 *   put:
 *     description: Update leaderBoard
 *     tags:
 *       - Leader Board
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: leaderBoard ID
 *     requestBody:
 *       description: leaderBoard information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               criteria:
 *                 type: string
 *                 example: date > 0
 *     responses:
 *       200:
 *         description: leaderBoard is updated
 *       404:
 *         description: leaderBoard not found
 */
leaderBoard.put('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
