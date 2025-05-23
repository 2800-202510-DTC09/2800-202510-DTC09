import {status} from 'http-status';
import {User, normalize} from '../../model/user.mjs';

/**
 * Create openAPI doc.
 * Generated by Claude Sonnet 4.0
 *
 * @author https://claude.ai/
 */

/**
 * @openapi
 * /user/profile:
 *   get:
 *     description: Get the authenticated user's profile information
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *                 email:
 *                   type: string
 *                   example: alice@example.com
 *                 username:
 *                   type: string
 *                   example: alice
 *                 score:
 *                   type: number
 *                   example: 1250
 *                 badges:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 ip:
 *                   type: string
 *                   example: 192.168.1.1
 *                 location:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       example: 49.2827
 *                     longitude:
 *                       type: number
 *                       example: -123.1207
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-01T00:00:00.000Z
 *       401:
 *         description: Unauthorized - user not logged in
 *       404:
 *         description: User not found
 *       500:
 *         description: Server internal error
 */
export function registerProfileRoute(user) {
    user.get('/profile', async (req, res) => {
        try {
            if (!req.session.user?.id) {
                return res.sendStatus(status.UNAUTHORIZED);
            }
            const result = await User.findById(req.session.user.id);
            if (!result) return res.sendStatus(status.NOT_FOUND);

            return res.status(status.OK).json(normalize(result).pop());
        } catch (e) {
            console.error(e);
            return res.sendStatus(status.INTERNAL_SERVER_ERROR);
        }
    });
}
