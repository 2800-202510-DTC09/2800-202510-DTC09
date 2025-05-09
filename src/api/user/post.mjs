import {Error} from 'mongoose';
import {User} from '../../model/user.mjs';
import {normalize, user} from './index.mjs';
import {hash} from 'bcryptjs';
import {status} from 'http-status';

/**
 * @openapi
 * /user:
 *   post:
 *     description: Create user
 *     tags:
 *       - User
 *     requestBody:
 *       description: User basic information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *               username:
 *                 type: string
 *                 example: alice
 *               password:
 *                 type: string
 *                 example: Super_secure_password
 *     responses:
 *       200:
 *         description: An user is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
user.post('/', async (req, res) => {
   try {
      res.status(status.OK).json(
         normalize(
            await new User({
               email: req.body.username,
               username: req.body.username,
               password: await hash(req.body.password, 10),
            }).save(),
         ),
      );
   } catch (e) {
      if (e.name === Error.ValidationError.name) {
         res.status(status.BAD_REQUEST).json(e.errors);
      } else {
         console.error(e);
         res.sendStatus(status.INTERNAL_SERVER_ERROR);
      }
   }
});
