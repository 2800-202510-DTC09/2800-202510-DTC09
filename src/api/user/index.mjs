import {Router as router} from 'express';
import {api} from '../index.mjs';
import {registerProfileRoute} from './get-profile.mjs';
import {registerBadgeRoute} from './show-badges.mjs';

export const user = router();
api.use('/user', user);

registerBadgeRoute(user);
registerProfileRoute(user);
