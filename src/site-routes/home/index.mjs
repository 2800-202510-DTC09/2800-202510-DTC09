import {Router as router} from 'express';
import {handleLoginGet} from './get.mjs';

export const homeRouter = router();

homeRouter.get('/home', handleLoginGet);
