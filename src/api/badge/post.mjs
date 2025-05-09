import {Error} from 'mongoose';
import {Badge, normalize} from '../../model/badge.mjs';
import {badge} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /badge:
 *   post:
 *     description: Create badge
 *     tags:
 *       - Badge
 *     requestBody:
 *       description: Badge information
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
 *     responses:
 *       200:
 *         description: A badge is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
badge.post('/', async (req, res) => {
   try {
      res.status(status.OK).json(
         normalize(
            await new Badge(
               Object.fromEntries(
                  [
                     'name',
                     'description',
                     'icon',
                  ].map((v) => [
                     v,
                     req.body[v],
                  ]),
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
