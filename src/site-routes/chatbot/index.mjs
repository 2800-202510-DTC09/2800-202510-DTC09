import {Router as router} from 'express';
import {handleChatbotGet} from './get.mjs';

export const chatbotRouter = router();

chatbotRouter.get('/chatbot', handleChatbotGet);
