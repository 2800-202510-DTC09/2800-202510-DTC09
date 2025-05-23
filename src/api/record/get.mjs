import {status} from 'http-status';
import mongoose from 'mongoose';
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
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const userRecord = await Record.findOne({user: userId});
        // eslint-disable-next-line no-console
        console.log(userRecord)

        if (userRecord) {
            res.status(200).json(userRecord);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error fetching record:', error);
        res.sendStatus(500);
    }
});
