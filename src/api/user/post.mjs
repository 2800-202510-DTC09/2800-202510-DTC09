import {Error, MongooseError} from 'mongoose';
import {User} from '../../model/user.mjs';
import {normalize, user} from './index.mjs';
import {hash} from 'bcryptjs';

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
 *               username:
 *                 type: string
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 example: Super_secure_password
 *     responses:
 *       '200':
 *         description: An user is created
 */
user.post('/', async (req, res) => {
   try {
      res.json(
         normalize(
            await new User({
               username: req.body.username,
               password: await hash(req.body.password, 10),
            }).save(),
         ),
      );
   } catch (error) {
      if (error.name === Error.ValidationError.name) {
         res.status(400).json(error.errors);
      } else {
         console.error(error);
         res.status(500);
      }
   }
});
