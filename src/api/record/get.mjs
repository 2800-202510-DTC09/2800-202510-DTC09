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
record.get('/', async (req, res) => {
    const id = new mongoose.Types.ObjectId(String(req.query.id));

    try {
        const userRecord = await Record.findOne({user: id});

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
