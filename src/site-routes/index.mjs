import {Router} from 'express';
import {homeRouter} from './home';
import {loginRouter} from './login';
import {logoutRouter} from './logout';
import {signupRouter} from './signup';
import {usersRouter} from './users';

export const siteRouter = Router();

siteRouter.use(loginRouter);
siteRouter.use(logoutRouter);
siteRouter.use(signupRouter);
siteRouter.use(homeRouter);
siteRouter.use(usersRouter);
