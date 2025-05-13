import {Router} from 'express';
import {homeRouter} from './home/index.mjs';
import {loginRouter} from './login/index.mjs';
import {logoutRouter} from './logout/index.mjs';
import {signupRouter} from './signup/index.mjs';
import {usersRouter} from './users/index.mjs';

export const siteRouter = Router();

siteRouter.use(loginRouter);
siteRouter.use(logoutRouter);
siteRouter.use(signupRouter);
siteRouter.use(homeRouter);
siteRouter.use(usersRouter);
