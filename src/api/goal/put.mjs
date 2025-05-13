import {goal} from '.';

/**
 * @openapi
 * /goal/{id}:
 *   put:
 *     description: Update goal
 *     tags:
 *       - Goal
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Goal ID
 *     requestBody:
 *       description: Goal information
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
 *         description: Goal is updated
 *       404:
 *         description: Goal not found
 */
goal.put('/:id', async (req, res) => {
    // Const api = await Todo.find();
    res.json({a: req.body});
});
