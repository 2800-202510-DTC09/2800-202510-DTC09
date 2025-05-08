import { cwd, env } from 'process';
import { join, relative } from 'path';
import express from 'express';
import { connect } from 'mongoose';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { __dirname } from './common-es.mjs';
import fastGlob from 'fast-glob';

// For auth/login 
import session from 'express-session';
import { User } from './model/user.mjs';
import bcrypt from 'bcryptjs';


if (env.NODE_ENV === 'dev') {
   import('./tunnel.mjs');
} else {
   connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/sustain-me`);
}

export const app = express();
app.use((req, res, next) => {
   req.timestamp = Date.now();
   next();
});

app.use(express.static(join(__dirname, 'public')));

app.use(express.json());
app.use(
   '/api-docs',
   serve,
   setup(
      swaggerJsdoc({
         definition: {
            openapi: '3.0.0',
            info: { title: 'SustainMe API' },
            servers: [
               { url: '/api' },
            ],
         },
         apis: fastGlob.sync(`./api/**/*.mjs`, { cwd: __dirname }).map((v) => {
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

// Routes for auth/login/logout 

app.post('/login', async (req, res) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
         return res.status(401).json({ success: false, error: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
         return res.status(401).json({ success: false, error: 'Invalid username or password' });
      }
      req.session.user = { id: user.id, username: user.username, role: user.role };
      console.log("Login successful for:", username);
      res.json({ success: true });
   } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
   }
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
