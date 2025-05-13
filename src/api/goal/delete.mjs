import {status} from 'http-status';
import {Goal} from '../../model/goal.mjs';
import {goal} from '.';

/**
 * @openapi
 * /goal/{id}:
 *   delete:
 *     description: Delete goal
 *     tags:
 *       - Goal
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Goal ID
 *     responses:
 *       202:
 *         description: Goal is deleted
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Server internal error
 */
goal.delete('/:id', async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (goal) {
            goal.deletedAt = req.timestamp;
            await goal.save();
            res.sendStatus(status.NO_CONTENT);
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
