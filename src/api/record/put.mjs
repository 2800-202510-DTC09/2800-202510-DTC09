import {record} from './index.mjs';

/**
 * @openapi
 * /record/{id}:
 *   put:
 *     description: Update record
 *     tags:
 *       - Record
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: record ID
 *     requestBody:
 *       description: record information
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
 *       '200':
 *         description: record is updated
 *       '404':
 *         description: record not found
 */
record.put('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
