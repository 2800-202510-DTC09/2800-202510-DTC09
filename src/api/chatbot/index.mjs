import {Router as router} from 'express';
import {api} from '../index.mjs';

export const chatbot = router();
api.use('/chatbot', chatbot);
