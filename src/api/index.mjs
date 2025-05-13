import {Router} from 'express';
import {app} from '..';

export const api = Router();
app.use('/api', api);
