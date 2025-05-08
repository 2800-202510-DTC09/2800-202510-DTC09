import {Badge} from '../../model/badge.mjs';
import {badge} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /badge/{id}:
 *   delete:
 *     description: Delete badge
 *     tags:
 *       - Badge
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: badge ID
 *     responses:
 *       202:
 *         description: badge is deleted
 *       404:
 *         description: badge not found
 *       500:
 *         description: Server internal error
 */
badge.delete('/:id', async (req, res) => {
   try {
      const badge = await Badge.findOne({
         _id: req.params.id,
         $or: [
            {deletedAt: {$exists: false}},
            {deletedAt: null},
            {deletedAt: {$gt: req.timestamp}},
         ],
      });
      if (badge) {
         badge.deletedAt = req.timestamp;
         await badge.save();
         res.sendStatus(status.NO_CONTENT);
      } else {
         res.sendStatus(status.NOT_FOUND);
      }
   } catch (e) {
      console.error(e);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
   }
});
