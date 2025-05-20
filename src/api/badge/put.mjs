import {status} from 'http-status';
import {Badge, normalize} from '../../model/badge.mjs';
import {badge} from './index.mjs';

/**
 * @openapi
 * /badge/{id}:
 *   put:
 *     description: Update badge
 *     tags:
 *       - Badge
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Badge ID
 *     requestBody:
 *       description: Badge information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New comer
 *               description:
 *                 type: string
 *                 example: Joined the app
 *               icon:
 *                 type: string
 *                 example: /assets/leaf.png
 *     responses:
 *       200:
 *         description: Badge is updated
 *       400:
 *         description: Given data is invalid
 *       404:
 *         description: Badge not found
 *       500:
 *         description: Server internal error
 */
badge.put('/:id', async (req, res) => {
    try {
        const badgeData = await Badge.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (badgeData) {
            ['name', 'description', 'icon'].forEach((v) => {
                if (req.body[v]) {
                    badgeData[v] = req.body[v];
                }
            });
            res.status(status.OK).json(normalize(await badgeData.save()).pop());
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
