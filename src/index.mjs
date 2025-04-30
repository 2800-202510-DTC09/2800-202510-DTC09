import {env} from 'process';
import {join} from 'path';
import express from 'express';
import {connect} from 'mongoose';
import cors from 'cors';
import {serve, setup} from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {__dirname} from './common-es.mjs';
import {} from './dev.mjs';

export const app = express();
app.use(express.static(join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
import('./api/index.mjs');
app.use(
   '/api-docs',
   serve,
   setup(
      swaggerJsdoc({
         definition: {
            openapi: '3.0.0',
            info: {
               title: 'SustainMe API',
            },
            servers: [
               `http://127.0.0.1:${env.PORT}`,
               `https://${env.DEV_SERVER}`,
               `https://${env.PROD_SERVER}`,
            ].map((v) => ({url: `${v}/api`})),
         },
         apis: [
            './src/api/**/*.mjs',
         ],
      }),
   ),
);

connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/sustain-me`);

app.listen(env.PORT, () => {
   console.log(`Server running on http://127.0.0.1:${env.PORT}`);
});
