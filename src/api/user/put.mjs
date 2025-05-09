import {user} from './index.mjs';

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     description: Update user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: Super_secure_password
 *     responses:
 *       200:
 *         description: User is updated
 *       404:
 *         description: User not found
 */
user.put('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
