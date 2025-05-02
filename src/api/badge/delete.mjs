import {badge} from './index.mjs';

/**
 * @openapi
 * /badge/{id}:
 *   delete:
 *     description: Delete badge
 *     tags:
 *       - Badge
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: badge ID
 *     responses:
 *       '202':
 *         description: badge is deleted
 *       '404':
 *         description: badge not found
 */
badge.delete('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
