import {badge} from './index.mjs';

/**
 * @openapi
 * /badge:
 *   post:
 *     description: Create badge
 *     tags:
 *       - Badge
 *     requestBody:
 *       description: badge information
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
 *                 example: /assets/icon.png
 *               criteria:
 *                 type: string
 *                 example: date > 0
 *     responses:
 *       '200':
 *         description: An badge is created
 */
badge.post('/', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: req.body});
});
