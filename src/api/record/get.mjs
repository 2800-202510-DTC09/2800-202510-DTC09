import {status} from 'http-status';
import {Record, normalize} from '../../model/record.mjs';
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
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Found a record
 *       404:
 *         description: Record not found
 *       500:
 *         description: Server internal error
 */
record.get('/:id', async (req, res) => {
    try {
        const records = normalize(await Record.findById(req.params.id));
        if (records.length) {
            res.status(status.OK).json(records.pop());
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
