import {status} from 'http-status';
import {User, normalize} from '../../model/user.mjs';
import {user} from './index.mjs';

/**
 * @openapi
 * /user:
 *   get:
 *     description: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Fetched all users
 *       500:
 *         description: Server internal error
 */
user.get('/', async (req, res) => {
    try {
        res.status(status.OK).json(
            normalize(
                await User.find({
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
