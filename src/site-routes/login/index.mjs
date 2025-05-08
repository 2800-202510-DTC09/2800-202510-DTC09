import { Router } from 'express';
import { handleLoginPost } from './post.mjs';
import { handleLoginGet } from './get.mjs';

export const loginRouter = Router();

loginRouter.post('/login', handleLoginPost);
loginRouter.get('/login', handleLoginGet);
