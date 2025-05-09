import {join} from 'path';
import {__dirname} from '../../common-es.mjs';

export function handleLoginGet(req, res) {
   req.session.destroy((err) => {
      if (err) {
         console.error('Logout error:', err);
         return res.status(500).send('Error logging out');
      }
      res.clearCookie('connect.sid');
      res.redirect('/login.html');
   });
}
