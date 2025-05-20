import {status} from 'http-status';
import {Goal, normalize} from '../../model/goal.mjs';
import {goal} from './index.mjs';

/**
 * @openapi
 * /goal/{id}:
 *   put:
 *     description: Update goal
 *     tags:
 *       - Goal
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Goal ID
 *     requestBody:
 *       description: Goal information
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
 *                 example: /assets/leaf.png
 *               emission:
 *                 type: number
 *                 example: 500
 *               emissionDiff:
 *                 type: number
 *                 example: 100
 *               emissionDiffStart:
 *                 type: date-time
 *                 example: 2025-01-01T00:00:00-0700
 *               emissionDiffEnd:
 *                 type: date-time
 *                 example: 2025-02-01T00:00:00-0700
 *     responses:
 *       200:
 *         description: Goal is updated
 *       400:
 *         description: Given data is invalid
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Server internal error
 */
goal.put('/:id', async (req, res) => {
    try {
        const goalData = await Goal.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (goalData) {
            [
                'name',
                'description',
                'icon',
                'emission',
                'emissionDiff',
                'emissionDiffStart',
                'emissionDiffEnd',
            ].forEach((v) => {
                if (req.body[v]) {
                    goalData[v] = req.body[v];
                }
            });
            res.status(status.OK).json(normalize(await goalData.save()).pop());
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
