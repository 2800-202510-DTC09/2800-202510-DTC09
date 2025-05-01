import {cwd, env} from 'process';
import {join, relative} from 'path';
import express from 'express';
import {connect} from 'mongoose';
import {serve, setup} from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {__dirname} from './common-es.mjs';
import fastGlob from 'fast-glob';

if (env.NODE_ENV === 'dev') {
   import('./tunnel.mjs');
} else {
   connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/sustain-me`);
}

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

// Sign up flow

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/signup', (req, res) => {
	res.redirect('/signup.html');
});

// Super basic signup route. I'll add nuance/security later.
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Basic input check
  if (!username || !password || password.length < 4) {
    return res.redirect('/signup.html?error=1');
  }

  res.redirect(`/signup-success.html?username=${encodeURIComponent(username)}`);
});


app.listen(env.PORT, () => {
   console.log(`Server running on http://127.0.0.1:${env.PORT}`);
});
