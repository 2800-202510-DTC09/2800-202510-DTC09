import {status} from 'http-status';

export function handleLogoutGet(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .send('Error logging out');
        }
        res.clearCookie('connect.sid');
        return res.redirect('/html/login.html');
    });
}
