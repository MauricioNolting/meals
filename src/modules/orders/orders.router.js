import express from 'express';
import { protect } from '../users/user.middlewares.js';
import { createOrder } from './orders.controller.js';

export const router = express.Router();

router.post('/', protect, createOrder);
