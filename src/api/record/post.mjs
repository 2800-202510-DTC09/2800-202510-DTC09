import {Error, isObjectIdOrHexString, isValidObjectId} from 'mongoose';
import {Record} from '../../model/record.mjs';
import {record, normalize} from './index.mjs';
import {status} from 'http-status';
import {User} from '../../model/user.mjs';
import {Type} from '../../model/type.mjs';

/**
 * @openapi
 * /record:
 *   post:
 *     description: Create record
 *     tags:
 *       - Record
 *     requestBody:
 *       description: record information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 681342414429d3a18ad3fb45
 *               emission:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: New car first drive
 *               typeId:
 *                 type: string
 *                 example: 681a3ef31674a09cc7fa43e3
 *     responses:
 *       200:
 *         description: An record is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
record.post('/', async (req, res) => {
   try {
      // const check=(await Promise.all([
      //    User.findById(req.body.userId),
      //    Type.findById(req.body.typeId),
      // ])).map((v)=>{
      //    if (!v){
      //       return
      //    }
      // })

      res.status(status.OK).json(
         await normalize(
            await new Record(
               Object.fromEntries(
                  [
                     'userId',
                     'emission',
                     'description',
                     'typeId',
                  ].map((v) => [
                     v,
                     req.body[v],
                  ]),
               ),
            ).save(),
         ),
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
