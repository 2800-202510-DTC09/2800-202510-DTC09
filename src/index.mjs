import {cwd, env} from 'process';
import {join, relative} from 'path';
import express from 'express';
import {connect} from 'mongoose';
import {serve, setup} from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {__dirname} from './common-es.mjs';
import fastGlob from 'fast-glob';

// For auth/login 
import session from 'express-session';
import { mockUsers } from './mock/users.js';


if (env.NODE_ENV === 'dev') {
   import('./dev.mjs');
}
connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/sustain-me`);

export const app = express();

app.use(express.static(join(__dirname, 'public')));

app.use(express.json());
app.use(
   '/api-docs',
   serve,
   setup(
      swaggerJsdoc({
         definition: {
            openapi: '3.0.0',
            info: {title: 'SustainMe API'},
            servers: [
               {url: '/api'},
            ],
         },
         apis: fastGlob.sync(`./api/**/*.mjs`, {cwd: __dirname}).map((v) => {
            import(v);
            return join(relative(cwd(), __dirname), v);
         }),
      }),
   ),
);


app.use(session({
   secret: 'bad secret',
   resave: false,
   saveUninitialized: false,
   cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 hour
   }
}));

// Routes for auth/login/logout (preliminary)

app.post('/login', (req, res) => {
   const { username, password } = req.body;
   const user = mockUsers.find(u => u.username === username);
   if (!user || user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
   }
   req.session.user = { id: user.id, username: user.username, role: user.role };
   res.json({ success: true });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid'); 
    res.redirect('/login.html');
  });
});

app.get('/home', (req, res) => {
   if (!req.session.user) return res.redirect('/login.html');
   res.sendFile(join(__dirname, 'public', 'home.html'));
});

app.get('/users', (req, res) => {
   if (!req.session.user) return res.status(401).json({ error: 'Not logged in' });
   res.json({ user: req.session.user });
});


app.listen(env.PORT, () => {
   console.log(`Server running on http://127.0.0.1:${env.PORT}`);
});
