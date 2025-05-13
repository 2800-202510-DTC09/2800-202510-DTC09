import {Router as router} from 'express';
import {app} from '../index.mjs';

export const api = router();
app.use('/api', api);
