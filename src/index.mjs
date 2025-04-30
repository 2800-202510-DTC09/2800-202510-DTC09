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
         failOnErrors: true,
         definition: {
            openapi: '3.0.0',
            info: {
               title: 'Employee API',
               description: 'Employee API Information',
               contact: {
                  name: 'Sagi Weizmann',
               },
            },
            servers: [
               {
                  url: `http://127.0.0.1:${env.PORT}/api/v1`,
               },
            ],
         },
         apis: [
            './src/api/**/*.mjs',
         ],
      }),
   ),
);

// MongoDB connection
connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/todoapp`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// Start the server
app.listen(env.PORT, () => {
   console.log(`Server running on http://127.0.0.1:${env.PORT}`);
});
