import {join} from 'path';
import {__dirname} from '../../common-es.mjs';

export function handleLoginGet(req, res) {
	if (req.session.user) {
		res.redirect('/home');
	} else {
		res.sendFile(join(__dirname, 'public', 'login.html'));
	}
};


