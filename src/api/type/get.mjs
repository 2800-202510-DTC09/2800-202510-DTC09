import {Type, normalize} from '../../model/type.mjs';
import {type} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /type/{id}:
 *   get:
 *     description: Get type by ID
 *     tags:
 *       - Type
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Type ID
 *     responses:
 *       200:
 *         description: Found a type
 *       404:
 *         description: Type not found
 *       500:
 *         description: Server internal error
 */
type.get('/:id', async (req, res) => {
   try {
      const types = normalize(await Type.findById(req.params.id));
      if (types.length) {
         res.status(status.OK).json(types.pop());
      } else {
         res.sendStatus(status.NOT_FOUND);
      }
   } catch (e) {
      console.error(e);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
   }
});
