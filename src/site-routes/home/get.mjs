import {join} from 'path';
import {__dirname} from '../../common-es.mjs';

export function handleLoginGet(req, res) {
   if (!req.session.user) return res.redirect('/main.html');
   res.sendFile(join(__dirname, 'public', 'home.html'));
}
