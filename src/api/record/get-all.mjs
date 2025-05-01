import {record} from './index.mjs';

/**
 * @openapi
 * /record:
 *   get:
 *     description: Get all records
 *     tags:
 *       - Record
 *     responses:
 *       '200':
 *         description: Fetched all records
 */
record.get('/', async (req, res) => {
   // const api = await Todo.find();
   res.json({a: true});
});
