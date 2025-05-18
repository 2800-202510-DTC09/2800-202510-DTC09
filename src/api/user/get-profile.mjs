import {status} from 'http-status';
import {User, normalize} from '../../model/user.mjs';

/**
 * @openapi
 * TODO
 * @DSG
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
