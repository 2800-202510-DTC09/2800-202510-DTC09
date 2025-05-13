import {status} from 'http-status';
import {Error} from 'mongoose';
import {Record, normalize} from '../../model/record.mjs';
import {record} from '.';

/**
 * @openapi
 * /record:
 *   post:
 *     description: Create record
 *     tags:
 *       - Record
 *     requestBody:
 *       description: Record information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: 681342414429d3a18ad3fb45
 *               emission:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: New car first drive
 *               type:
 *                 type: string
 *                 example: 681a3ef31674a09cc7fa43e3
 *     responses:
 *       200:
 *         description: An record is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
record.post('/', async (req, res) => {
    try {
        res.status(status.OK).json(
            normalize(
                await new Record(
                    Object.fromEntries(
                        ['user', 'emission', 'description', 'type'].map((v) => [
                            v,
                            req.body[v],
                        ]),
                    ),
                ).save(),
            ).pop(),
        );
    } catch (e) {
        if (e.name === Error.ValidationError.name) {
            res.status(status.BAD_REQUEST).json(e.errors);
        } else {
            console.error(e);
            res.sendStatus(status.INTERNAL_SERVER_ERROR);
        }
    }
});
