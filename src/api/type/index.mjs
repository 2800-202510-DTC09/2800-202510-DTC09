import {Router as router} from 'express';
import {api} from '../index.mjs';

export const type = router();
api.use('/type', type);
