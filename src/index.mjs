import {cwd, env} from 'process';
import {join, relative} from 'path';
import express from 'express';
import {connect} from 'mongoose';
import {serve, setup} from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {__dirname} from './common-es.mjs';
import fastGlob from 'fast-glob';

if (env.NODE_ENV === 'dev') {
   import('./dev.mjs');
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

app.listen(env.PORT, () => {
   console.log(`Server running on http://127.0.0.1:${env.PORT}`);
});
