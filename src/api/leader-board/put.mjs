import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leader-board/{id}:
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
 *         description: LeaderBoard ID
 *     requestBody:
 *       description: LeaderBoard information
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
 *         description: LeaderBoard is updated
 *       404:
 *         description: LeaderBoard not found
 */
leaderBoard.put('/:id', async (req, res) => {
    // Const api = await Todo.find();
    res.json({a: req.body});
});
