import {badge} from './index.mjs';

/**
 * @openapi
 * /badge:
 *   get:
 *     description: Get all badges
 *     tags:
 *       - Badge
 *     responses:
 *       '200':
 *         description: Fetched all badges
 */
badge.get('/', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: true});
});
