import {record} from './index.mjs';

/**
 * @openapi
 * /record/{id}:
 *   get:
 *     description: Get record by ID
 *     tags:
 *       - Record
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: record ID
 *     responses:
 *       '200':
 *         description: Found a record
 *       '404':
 *         description: record not found
 */
record.get('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.params.id});
});
