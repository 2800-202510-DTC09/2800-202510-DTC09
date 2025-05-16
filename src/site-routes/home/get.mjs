import {join} from 'path';

export function handleLoginGet(req, res) {
    if (!req.session.user) return res.redirect('/main.html');
    return res.sendFile(join(import.meta.dirname, 'public', 'home.html'));
}
