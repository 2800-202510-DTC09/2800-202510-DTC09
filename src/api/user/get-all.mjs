import {User} from '../../model/user.mjs';
import {user} from './index.mjs';

/**
 * @openapi
 * /user:
 *   get:
 *     description: Get all users
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Fetched all users
 */
user.get('/', async (req, res) => {
   res.json(
      (await User.find()).map((v) => ({
         username: v.username,
         badges: v.badges,
         score: v.score,
         types: v.types,
      })),
   );
});
