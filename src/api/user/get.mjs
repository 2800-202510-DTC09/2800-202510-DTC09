import {user} from './index.mjs';

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     description: Get user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Found a user
 *       '404':
 *         description: User not found
 */
user.get('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.params.id});
});
