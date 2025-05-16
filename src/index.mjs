import {join, relative} from 'path';
import {cwd, env} from 'process';
import express from 'express';
import session from 'express-session';
import fastGlob from 'fast-glob';
import {connect} from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express';
import {siteRouter} from './site-routes/index.mjs';

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

app.use(express.static(join(import.meta.dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
        secret: 'bad secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            // 1 hour
            maxAge: 1000 * 60 * 60,
        },
    }),
);

app.use(
    '/api-docs',
    serve,
    setup(
        swaggerJsdoc({
            definition: {
                openapi: '3.0.0',
                info: {title: 'SustainMe API'},
                servers: [{url: '/api'}],
            },
            apis: fastGlob
                .sync(`./api/**/*.mjs`, {cwd: import.meta.dirname})
                .map((v) => {
                    import(v);
                    return join(relative(cwd(), import.meta.dirname), v);
                }),
        }),
    ),
);

// Route requests to site resources.
app.use('/', siteRouter);

app.listen(env.PORT, () => {
    console.error(`Server running on http://127.0.0.1:${env.PORT}`);
});
