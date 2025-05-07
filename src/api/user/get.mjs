import {User} from '../../model/user.mjs';
import {normalize, user} from './index.mjs';

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
 *       '200':
 *         description: Found a user
 *       '404':
 *         description: User not found
 */
user.get('/id/:id', async (req, res) => {
   res.json(normalize(await User.findById(req.params.id)));
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
 *       '200':
 *         description: Found a user
 *       '404':
 *         description: User not found
 */
user.get('/username/:username', async (req, res) => {
   res.json(normalize(await User.findOne({username: req.params.username})));
});
