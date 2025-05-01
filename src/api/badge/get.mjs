import {badge} from './index.mjs';

/**
 * @openapi
 * /badge/{id}:
 *   get:
 *     description: Get badge by ID
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
 *       '200':
 *         description: Found a badge
 *       '404':
 *         description: badge not found
 */
badge.get('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.params.id});
});
