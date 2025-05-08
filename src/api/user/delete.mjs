import {status} from 'http-status';
import {User} from '../../model/user.mjs';
import {user} from './index.mjs';

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     description: Delete user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User is deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server internal error
 */
user.delete('/:id', async (req, res) => {
   try {
      const user = await User.findOne({
         _id: req.params.id,
         $or: [
            {deletedAt: {$exists: false}},
            {deletedAt: null},
            {deletedAt: {$gt: req.timestamp}},
         ],
      });
      if (user) {
         user.deletedAt = req.timestamp;
         await user.save();
         res.sendStatus(status.NO_CONTENT);
      } else {
         res.sendStatus(status.NOT_FOUND);
      }
   } catch (e) {
      console.error(e);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
   }
});
