import {join, relative} from 'path';
import {cwd, env} from 'process';
import express from 'express';
import session from 'express-session';
import fastGlob from 'fast-glob';
import {parse, toSeconds} from 'iso8601-duration';
import {connect} from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express';
import {ONE, ZERO, toMillisecond} from './helper.mjs';
import {siteRouter} from './site-routes/index.mjs';

// If the environment is local
if (env.NODE_ENV === 'dev') {
    import('./tunnel.mjs');
} else {
    connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/sustain-me`);
}

// Initialize the express app with timestamp middleware
export const app = express();
app.use((req, res, next) => {
    req.timestamp = Date.now();
    next();
});

// Serve static files from the public directory
app.use(
    express.static(join(import.meta.dirname, 'public'), {
        extensions: 'html',
    }),
);

// Enable middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Enable middleware for parsing cookies
app.use(
    session({
        secret: 'bad secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            // 1 hour
            maxAge: toMillisecond(toSeconds(parse('PT1H'))),
        },
    }),
);

// Enable middleware for api documentation
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

// Set up scheduler
fastGlob
    .sync(`./scheduler/**/*.mjs`, {cwd: import.meta.dirname})
    .forEach(async (v) => {
        const {default: func} = await import(v);
        func();
        let count = 0;
        const seconds = toSeconds(
            parse(v.replace(/.*-/gu, '').replace(/\..*/gu, '')),
        );
        setInterval(() => {
            count += ONE;
            if (count >= seconds) {
                count = ZERO;
                func();
            }
        }, toMillisecond(ONE));
    });

// Start the server
app.listen(env.PORT, () => {
    console.error(`Server running on http://127.0.0.1:${env.PORT}`);
});
