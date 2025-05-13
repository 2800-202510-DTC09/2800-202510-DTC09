import {status} from 'http-status';
import {User, normalize} from '../../model/user.mjs';
import {user} from './index.mjs';

/**
 * @openapi
 * /user/id/{id}:
 *   get:
 *     description: Get user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Found a user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server internal error
 */
user.get('/id/:id', async (req, res) => {
    try {
        const users = normalize(await User.findById(req.params.id));
        if (users.length) {
            res.status(status.OK).json(users.pop());
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});

/**
 * @openapi
 * /user/username/{username}:
 *   get:
 *     description: Get user by username
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: User name
 *     responses:
 *       200:
 *         description: Found a user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server internal error
 */
user.get('/username/:username', async (req, res) => {
    try {
        const users = normalize(
            await User.findOne({username: req.params.username}),
        );
        if (users.length) {
            res.status(status.OK).json(users.pop());
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
