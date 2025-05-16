import { MonthlyData } from '../../model/monthly-data.mjs';

/**
 * @openapi
 * /monthly-data:
 *   get:
 *     description: Retrieve all monthly-data documents belonging to the current user
 *     tags:
 *       - MonthlyData
 *     responses:
 *       200:
 *         description: List of monthly data documents
 *       500:
 *         description: Server error
 */
export default async function get(req, res) {
	try {
		const results = await MonthlyData.find({ user: req.user._id });
		res.status(200).json(results);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

