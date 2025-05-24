import {Router as router} from 'express';
import {app} from '../index.mjs';

// Setup the API router
export const api = router();

app.use('/api', api);
