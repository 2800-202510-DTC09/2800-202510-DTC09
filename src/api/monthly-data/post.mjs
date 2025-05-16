import { MonthlyData } from '../../model/monthly-data.mjs';

/**
 * @openapi
 * /monthly-data:
 *   post:
 *     description: Create a new monthly-data document
 *     tags:
 *       - MonthlyData
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emissions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                     value:
 *                       type: number
 *               month:
 *                 type: number
 *               year:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 */
export default async function post(req, res) {
	try {
		const created = await MonthlyData.create({
			...req.body,
			user: req.user._id
		});

		res.status(201).json(created);
	} catch (err) {
		console.error('POST /monthly-data error:', err);
		res.status(400).json({ error: err.message });
	}
}

