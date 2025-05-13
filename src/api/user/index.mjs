import {Router as router} from 'express';
import {api} from '../index.mjs';

export const user = router();
api.use('/user', user);
