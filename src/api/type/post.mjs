import {status} from 'http-status';
import {Error} from 'mongoose';
import {Type, normalize} from '../../model/type.mjs';
import {type} from '.';

/**
 * @openapi
 * /type:
 *   post:
 *     description: Create type
 *     tags:
 *       - Type
 *     requestBody:
 *       description: Type information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Vehicle
 *               description:
 *                 type: string
 *                 example: Most used vehicle
 *     responses:
 *       200:
 *         description: A type is created
 *       400:
 *         description: Given data is invalid
 *       500:
 *         description: Server internal error
 */
type.post('/', async (req, res) => {
    try {
        res.status(status.OK).json(
            normalize(
                await new Type(
                    Object.fromEntries(
                        ['name', 'description'].map((v) => [v, req.body[v]]),
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
