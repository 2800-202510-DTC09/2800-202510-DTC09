import {Router as router} from 'express';
import {app} from '../index.mjs';

export const api = router();
export const record = router();
api.use('/record', record);

app.use('/api', api);
