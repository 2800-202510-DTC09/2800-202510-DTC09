import {Router as router} from 'express';
import {api} from '../index.mjs';

export const record = router();
api.use('/record', record);
