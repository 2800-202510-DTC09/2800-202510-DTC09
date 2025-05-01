import {user} from './index.mjs';

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     description: Delete user
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
 *       '202':
 *         description: User is deleted
 *       '404':
 *         description: User not found
 */
user.delete('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
