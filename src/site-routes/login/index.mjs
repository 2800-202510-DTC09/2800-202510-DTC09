import {Router} from 'express';
import {handleLoginGet} from './get.mjs';
import {handleLoginPost} from './post.mjs';

export const loginRouter = Router();

loginRouter.post('/login', handleLoginPost);
loginRouter.get('/login', handleLoginGet);
