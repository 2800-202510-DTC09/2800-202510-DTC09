import {status} from 'http-status';

export function handleUsersGet(req, res) {
    if (!req.session.user) {
        return res.status(status.UNAUTHORIZED).json({error: 'Not logged in'});
    }
    return res.json({user: req.session.user});
}
