import {Badge} from '../../model/badge.mjs';
import {normalize, badge} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /badge/{id}:
 *   get:
 *     description: Get badge by ID
 *     tags:
 *       - Badge
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Badge ID
 *     responses:
 *       200:
 *         description: Found a badge
 *       404:
 *         description: Badge not found
 *       500:
 *         description: Server internal error
 */
badge.get('/:id', async (req, res) => {
   try {
      const badges = normalize(await Badge.findById(req.params.id));
      if (badges.length) {
         res.status(status.OK).json(badges.pop());
      } else {
         res.sendStatus(status.NOT_FOUND);
      }
   } catch (e) {
      console.error(e);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
   }
});
