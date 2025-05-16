import {Router as router} from 'express';
import {handleUsersGet} from './get.mjs';

export const usersRouter = router();

usersRouter.get('/users', handleUsersGet);
