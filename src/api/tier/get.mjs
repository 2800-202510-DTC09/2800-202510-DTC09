import { User } from '../../model/user.mjs';
import { tier } from './index.mjs';
import { status } from 'http-status';
import { getUserTier } from '../../shared/tierUtils.mjs';

/**
 * @openapi
 * /tier:
 *   get:
 *     description: Get user's tier information
 *     tags:
 *       - Tier
 *     responses:
 *       200:
 *         description: User tier information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tier:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     level:
 *                       type: number
 *                     displayName:
 *                       type: string
 *                     badgePath:
 *                       type: string
 *                     progress:
 *                       type: number
 *                     nextTier:
 *                       type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
tier.get('/', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.sendStatus(status.UNAUTHORIZED);
        }

        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.sendStatus(status.NOT_FOUND);
        }

        const tierInfo = getUserTier(user.score || 0);
        res.status(status.OK).json({
            tier: tierInfo,
            score: user.score || 0
        });

    } catch (e) {
        console.error(e);
        res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
});