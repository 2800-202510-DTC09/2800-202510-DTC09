import {join} from 'path';
import {__dirname} from '../../common-es.mjs';

export function handleLoginGet(req, res) {
	if (req.session.user) {
		res.sendFile(join(__dirname, 'public', 'home.html'));
	} else {
		res.redirect('/login');
	}
};


