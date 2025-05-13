import {Router} from 'express';
import {handleLogoutGet} from './get.mjs';

export const logoutRouter = Router();

logoutRouter.get('/logout', handleLogoutGet);
