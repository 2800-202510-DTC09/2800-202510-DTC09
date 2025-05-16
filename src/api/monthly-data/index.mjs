import isAuthenticated from '../../middleware/auth.mjs';
import {Router as router} from 'express';
import express from 'express';
import {api} from '../index.mjs';
import get from './get.mjs';
import post from './post.mjs';

api.use(express.json());

export const monthlyData = router();

api.use('/monthly-data', monthlyData);

monthlyData.use(isAuthenticated);
monthlyData.post('/', post);
monthlyData.get('/', get);
