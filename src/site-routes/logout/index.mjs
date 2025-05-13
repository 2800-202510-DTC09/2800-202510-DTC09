import {Router as router} from 'express';
import {handleLogoutGet} from './get.mjs';

export const logoutRouter = router();

logoutRouter.get('/logout', handleLogoutGet);
