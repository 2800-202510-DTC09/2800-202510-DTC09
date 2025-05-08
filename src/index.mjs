import {cwd, env} from 'process';
import {join, relative} from 'path';
import express from 'express';
import {connect} from 'mongoose';
import {serve, setup} from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {__dirname} from './common-es.mjs';
import fastGlob from 'fast-glob';

// For site-related (i.e, non-API) routes
import { siteRouter } from './site-routes/index.mjs';


// For auth/login 
import session from 'express-session';

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
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'bad secret', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

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


// Route requests to site resources.
app.use('/', siteRouter);


app.listen(env.PORT, () => {
   console.log(`Server running on http://127.0.0.1:${env.PORT}`);
});
