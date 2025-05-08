import { Router } from 'express';
import { handleSignupPost } from './post.mjs';
import { handleSignupGet } from './get.mjs';

export const signupRouter = Router();

signupRouter.post('/signup', handleSignupPost);
signupRouter.get('/signup', handleSignupGet);

