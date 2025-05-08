import { Router } from 'express';
import { api } from '../index.mjs';

export const ipLocation = Router();
api.use('/ip-location', ipLocation); // define path