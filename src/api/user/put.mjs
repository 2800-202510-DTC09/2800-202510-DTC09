import {status} from 'http-status';
import {User, normalize} from '../../model/user.mjs';
import {user} from './index.mjs';

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     description: Update user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *               username:
 *                 type: string
 *                 example: alice
 *               password:
 *                 type: string
 *                 example: Super_secure_password
 *               score:
 *                 type: number
 *                 example: 200
 *     responses:
 *       200:
 *         description: User is updated
 *       400:
 *         description: Given data is invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Server internal error
 */
user.put('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (userData) {
            ['email', 'username', 'password', 'score'].forEach((v) => {
                if (req.body[v]) {
                    userData[v] = req.body[v];
                }
            });
            res.status(status.OK).json(normalize(await userData.save()).pop());
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
