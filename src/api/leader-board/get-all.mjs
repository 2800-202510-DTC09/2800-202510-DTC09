import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leaderBoard:
 *   get:
 *     description: Get all leaderBoards
 *     tags:
 *       - Leader Board
 *     responses:
 *       '200':
 *         description: Fetched all leaderBoards
 */
leaderBoard.get('/', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: true});
});
