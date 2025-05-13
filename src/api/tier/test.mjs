/*
 * File: src/api/tier/test.mjs
 * This code created by claude to help with testing the feature
 */

import {status} from 'http-status';
import {User} from '../../model/user.mjs';
import {getUserTier} from '../../shared/tierUtils.mjs';
import {tier} from '.';

/**
 * @openapi
 * /tier/test/{userId}:
 *   get:
 *     description: Test endpoint to get tier information for any user by ID
 *     tags:
 *       - Tier
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to get tier information for
 *     responses:
 *       200:
 *         description: User tier information
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
tier.get('/test/:userId', async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const {userId} = req.params;

        // Find the user by ID
        const user = await User.findById(userId);

        // If user not found, return 404
        if (!user) {
            return res.status(status.NOT_FOUND).json({
                error: 'User not found',
            });
        }

        // Get tier information using the shared utility
        const tierInfo = getUserTier(user.score || 0);

        // Return tier information and user score
        res.status(status.OK).json({
            userId: user.id,
            username: user.username,
            score: user.score || 0,
            tier: tierInfo,
        });
    } catch (e) {
        console.error('Error fetching tier information:', e);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: 'Server error',
            message: e.message,
        });
    }
});

/*
 * Make sure to import this file in your tier/index.mjs
 * Add this line to src/api/tier/index.mjs:
 * import './test.mjs';
 */
