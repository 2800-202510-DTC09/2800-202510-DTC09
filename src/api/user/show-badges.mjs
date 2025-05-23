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
 * /user/show-badges:
 *   get:
 *     description: Get the authenticated user's earned badges
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User badges retrieved successfully
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
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 681a39201674a09cc7fa43d7
 *                       name:
 *                         type: string
 *                         example: New comer
 *                       description:
 *                         type: string
 *                         example: Joined the app
 *                       icon:
 *                         type: string
 *                         example: /assets/leaf.png
 *                   example: [
 *                     {
 *                       "id": "681a39201674a09cc7fa43d7",
 *                       "name": "New comer",
 *                       "description": "Joined the app",
 *                       "icon": "/assets/leaf.png"
 *                     }
 *                   ]
 *       401:
 *         description: Unauthorized - user not logged in
 *       404:
 *         description: User not found
 *       500:
 *         description: Server internal error
 */
export function registerBadgeRoute(user) {
    user.get('/show-badges', async (req, res) => {
        try {
            // Check if the user is logged in
            if (!req.session.user) {
                return res.sendStatus(status.UNAUTHORIZED);
            }
            // Check if the user ID is present in the express session
            const dbUser = await User.findById(req.session.user.id);
            if (!dbUser) {
                return res.sendStatus(status.NOT_FOUND);
            }
            // Get the badges of the user
            const normalized = normalize(dbUser).pop();
            normalized.badges = Array.isArray(normalized.badges)
                ? normalized.badges.flat().filter((b) => b?.icon && b?.name)
                : [];
            // Return the badges
            return res.status(status.OK).json(normalized);
        } catch (err) {
            console.error('Error in /show-badges route:', err);
            return res.sendStatus(status.INTERNAL_SERVER_ERROR);
        }
    });
}
