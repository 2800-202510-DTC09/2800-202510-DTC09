import {status} from 'http-status';
import {Type} from '../../model/type.mjs';
import {type} from './index.mjs';

/**
 * @openapi
 * /type/{id}:
 *   delete:
 *     description: Delete type
 *     tags:
 *       - Type
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Type ID
 *     responses:
 *       202:
 *         description: Type is deleted
 *       404:
 *         description: Type not found
 *       500:
 *         description: Server internal error
 */
type.delete('/:id', async (req, res) => {
    try {
        const type = await Type.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (type) {
            type.deletedAt = req.timestamp;
            await type.save();
            res.sendStatus(status.NO_CONTENT);
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
