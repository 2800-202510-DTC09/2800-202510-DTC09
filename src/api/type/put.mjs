import {type} from '.';

/**
 * @openapi
 * /type/{id}:
 *   put:
 *     description: Update type
 *     tags:
 *       - Type
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Type ID
 *     requestBody:
 *       description: Type information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Driving
 *     responses:
 *       200:
 *         description: Type is updated
 *       404:
 *         description: Type not found
 */
type.put('/:id', async (req, res) => {
    // Const api = await Todo.find();
    res.json({a: req.body});
});
