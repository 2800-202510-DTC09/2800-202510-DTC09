import {status} from 'http-status';
import {Badge, normalize} from '../../model/badge.mjs';
import {badge} from './index.mjs';

/**
 * @openapi
 * /badge:
 *   get:
 *     description: Get all badges
 *     tags:
 *       - Badge
 *     responses:
 *       200:
 *         description: Fetched all badges
 *       500:
 *         description: Server internal error
 */
badge.get('/', async (req, res) => {
    try {
        res.status(status.OK).json(
            normalize(
                await Badge.find({
                    $or: [
                        {deletedAt: {$exists: false}},
                        {deletedAt: null},
                        {deletedAt: {$gt: req.timestamp}},
                    ],
                }),
            ),
        );
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
