import {status} from 'http-status';
import {Record} from '../../model/record.mjs';
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
 *         description: Record ID
 *     responses:
 *       202:
 *         description: Record is deleted
 *       404:
 *         description: Record not found
 *       500:
 *         description: Server internal error
 */
record.delete('/:id', async (req, res) => {
    try {
        const recordData = await Record.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (recordData) {
            recordData.deletedAt = req.timestamp;
            await recordData.save();
            res.sendStatus(status.NO_CONTENT);
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
