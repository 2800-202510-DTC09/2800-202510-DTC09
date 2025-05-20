import {status} from 'http-status';
import {User, normalize} from '../../model/user.mjs';

/**
 * @openapi
 * TODO
 * @DSG
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
