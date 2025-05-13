import {Router} from 'express';
import {handleUsersGet} from './get.mjs';

export const usersRouter = Router();

usersRouter.get('/users', handleUsersGet);
