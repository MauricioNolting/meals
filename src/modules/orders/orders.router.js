import express from 'express';
import { protect } from '../users/user.middlewares.js';
import {
  createOrder,
  deleteOrder,
  findOneOrder,
  updateOrder,
} from './orders.controller.js';

export const router = express.Router();

router.use(protect);
router.post('/', createOrder);
router.get('/:id', findOneOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);
