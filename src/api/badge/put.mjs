import {badge} from './index.mjs';

/**
 * @openapi
 * /badge/{id}:
 *   put:
 *     description: Update badge
 *     tags:
 *       - Badge
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: badge ID
 *     requestBody:
 *       description: badge information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               criteria:
 *                 type: string
 *                 example: date > 0
 *     responses:
 *       200:
 *         description: badge is updated
 *       404:
 *         description: badge not found
 */
badge.put('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
