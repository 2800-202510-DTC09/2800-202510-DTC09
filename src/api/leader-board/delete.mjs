import {status} from 'http-status';
import {LeaderBoard} from '../../model/leader-board.mjs';
import {leaderBoard} from './index.mjs';

/**
 * @openapi
 * /leader-board/{id}:
 *   delete:
 *     description: Delete leader board entry
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
 *       202:
 *         description: Leader board entry is deleted
 *       404:
 *         description: Leader board entry not found
 *       500:
 *         description: Server internal error
 */
leaderBoard.delete('/:id', async (req, res) => {
    try {
        const leaderBoardData = await LeaderBoard.findOne({
            _id: req.params.id,
            $or: [
                {deletedAt: {$exists: false}},
                {deletedAt: null},
                {deletedAt: {$gt: req.timestamp}},
            ],
        });
        if (leaderBoardData) {
            leaderBoardData.deletedAt = req.timestamp;
            await leaderBoardData.save();
            res.sendStatus(status.NO_CONTENT);
        } else {
            res.sendStatus(status.NOT_FOUND);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});
