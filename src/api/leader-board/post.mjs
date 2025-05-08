import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leaderBoard:
 *   post:
 *     description: Create leaderBoard
 *     tags:
 *       - Leader Board
 *     requestBody:
 *       description: leaderBoard information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New comer
 *               description:
 *                 type: string
 *                 example: Joined the app
 *               icon:
 *                 type: string
 *                 example: /assets/icon.png
 *               criteria:
 *                 type: string
 *                 example: date > 0
 *     responses:
 *       200:
 *         description: An leaderBoard is created
 */
leaderBoard.post('/', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
