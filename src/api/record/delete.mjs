import {record} from './index.mjs';

/**
 * @openapi
 * /record/{id}:
 *   delete:
 *     description: Delete record
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
 *       202:
 *         description: record is deleted
 *       404:
 *         description: record not found
 */
record.delete('/:id', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
