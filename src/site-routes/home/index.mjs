import {Router} from 'express';
import {handleLoginGet} from './get.mjs';

export const homeRouter = Router();

homeRouter.get('/home', handleLoginGet);
