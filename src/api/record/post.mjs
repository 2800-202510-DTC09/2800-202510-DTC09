import {Error} from 'mongoose';
import {Record} from '../../model/record.mjs';
import {record, normalize} from './index.mjs';
import {status} from 'http-status';

/**
 * @openapi
 * /record:
 *   post:
 *     description: Create record
 *     tags:
 *       - Record
 *     requestBody:
 *       description: Record information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: 681342414429d3a18ad3fb45
 *               emission:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: New car first drive
 *               type:
 *                 type: string
 *                 example: 681a3ef31674a09cc7fa43e3
 *     responses:
 *       200:
 *          record is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
record.post('/', async (req, res) => {
   try {
      const record = await new Record(
         Object.fromEntries(
            [
               'user',
               'emission',
               'description',
               'type',
            ].map((v) => [
               v,
               req.body[v],
            ]),
         ),
      ).populate([
         'user',
         'type',
      ]);

      const errors = [];
      await Promise.all([
         (async () => {
            if (!record.user) {
               errors.push(
                  new Error.ValidatorError({
                     message: 'Path `user` is invalid.',
                     type: 'required',
                     path: 'user',
                     value: req.body.userId,
                     reason: '`user` not found in `users`',
                  }),
               );
            }
         })(),
         (async () => {
            if (!record.type) {
               errors.push(
                  new Error.ValidatorError({
                     message: 'Path `type` is invalid.',
                     type: 'required',
                     path: 'type',
                     value: req.body.typeId,
                     reason: '`type` not found in `types`',
                  }),
               );
            }
         })(),
      ]);
      if (errors.length) {
         const error = new Error.ValidationError();
         errors.forEach((v) => {
            error.addError(v.path, v);
         });
         throw error;
      }

      res.status(status.OK).json(normalize(await record.save()).pop());
   } catch (e) {
      if (e.name === Error.ValidationError.name) {
         res.status(status.BAD_REQUEST).json(e.errors);
      } else {
         console.error(e);
         res.sendStatus(status.INTERNAL_SERVER_ERROR);
      }
   }
});
