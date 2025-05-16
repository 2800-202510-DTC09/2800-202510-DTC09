import {Router as router} from 'express';
import {handleSignupGet} from './get.mjs';
import {handleSignupPost} from './post.mjs';

export const signupRouter = router();

signupRouter.post('/signup', handleSignupPost);
signupRouter.get('/signup', handleSignupGet);
