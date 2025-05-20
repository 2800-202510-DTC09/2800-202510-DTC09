import {status} from 'http-status';
import {Type, normalize} from '../../model/type.mjs';
import {type} from './index.mjs';

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
 *       400:
 *         description: Given data is invalid
 *       404:
 *         description: Type not found
 *       500:
 *         description: Server internal error
 */
type.put('/:id', async (req, res) => {
    try {
        const typeData = await Type.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (typeData) {
            ['description'].forEach((v) => {
                if (req.body[v]) {
                    typeData[v] = req.body[v];
                }
            });
            res.status(status.OK).json(normalize(await typeData.save()).pop());
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        if (e.name === Error.ValidationError.name) {
            res.status(status.BAD_REQUEST).json(e.errors);
        } else {
            console.error(e);
            res.sendStatus(status.INTERNAL_SERVER_ERROR);
        }
    }
});
