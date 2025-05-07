import {User} from '../../model/user.mjs';
import {normalize, user} from './index.mjs';
import {status} from 'http-status';

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
 *       '500':
 *         description: Server internal error
 */
user.get('/', async (req, res) => {
   try {
      res.status(status.OK).json(normalize(await User.find()));
   } catch (e) {
      console.error(e);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
   }
});
