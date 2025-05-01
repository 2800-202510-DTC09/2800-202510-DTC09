import {user} from './index.mjs';

/**
 * @openapi
 * /user:
 *   get:
 *     description: Get all users
 *     responses:
 *       '200':
 *         description: Fetched all users
 */
user.get('/', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: true});
});
