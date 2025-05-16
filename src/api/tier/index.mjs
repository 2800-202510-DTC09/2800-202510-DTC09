import {Router as router} from 'express';
import {api} from '../index.mjs';

export const tier = router();
api.use('/tier', tier);
