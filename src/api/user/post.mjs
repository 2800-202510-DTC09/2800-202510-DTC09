import {user} from './index.mjs';

/**
 * @openapi
 * /user:
 *   post:
 *     description: Create user
 *     tags:
 *       - User
 *     requestBody:
 *       description: User information
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
   // const api = await Todo.find();
   res.json({a: req.body});
});
