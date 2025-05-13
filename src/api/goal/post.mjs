import {status} from 'http-status';
import {Error} from 'mongoose';
import {Goal, normalize} from '../../model/goal.mjs';
import {goal} from './index.mjs';

/**
 * @openapi
 * /goal:
 *   post:
 *     description: Create goal
 *     tags:
 *       - Goal
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
 *         description: A goal is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
goal.post('/', async (req, res) => {
    try {
        res.status(status.OK).json(
            normalize(
                await new Goal(
                    Object.fromEntries(
                        [
                            'name',
                            'description',
                            'icon',
                            'emission',
                            'emissionDiff',
                            'emissionDiffStart',
                            'emissionDiffEnd',
                        ].map((v) => [v, req.body[v]]),
                    ),
                ).save(),
            ).pop(),
        );
    } catch (e) {
        if (e.name === Error.ValidationError.name) {
            res.status(status.BAD_REQUEST).json(e.errors);
        } else {
            console.error(e);
            res.sendStatus(status.INTERNAL_SERVER_ERROR);
        }
    }
});
