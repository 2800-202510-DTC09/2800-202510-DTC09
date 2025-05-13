import {Router as router} from 'express';
import {handleLoginGet} from './get.mjs';
import {handleLoginPost} from './post.mjs';

export const loginRouter = router();

loginRouter.post('/login', handleLoginPost);
loginRouter.get('/login', handleLoginGet);
