import {status} from 'http-status';
import {LeaderBoard, normalize} from '../../model/leader-board.mjs';
import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leader-board/{id}:
 *   get:
 *     description: Get leader board entry by ID
 *     tags:
 *       - Leader Board
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Leader board entry ID
 *     responses:
 *       200:
 *         description: Found a leader board entry
 *       404:
 *         description: Leader board entry not found
 *       500:
 *         description: Server internal error
 */
leaderBoard.get('/:id', async (req, res) => {
    try {
        const records = normalize(await LeaderBoard.findById(req.params.id));
        if (records.length) {
            res.status(status.OK).json(records.pop());
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
