import {Router as router} from 'express';
import {api} from '../index.mjs';
import postHandler from './post.mjs'; 

export const chatbot = router();
api.use('/chatbot', chatbot);

chatbot.post('/message', postHandler);
