import {Router} from 'express';
import {handleSignupGet} from './get.mjs';
import {handleSignupPost} from './post.mjs';

export const signupRouter = Router();

signupRouter.post('/signup', handleSignupPost);
signupRouter.get('/signup', handleSignupGet);
