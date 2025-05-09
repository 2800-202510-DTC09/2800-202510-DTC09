import {Router} from 'express';
import {app} from '../index.mjs';

export const api = Router();
app.use('/api', api);
