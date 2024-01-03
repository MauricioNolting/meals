import express from 'express';
import {
  createUser,
  deleteUser,
  findAllOrders,
  login,
  updateProfile,
} from './user.controllers.js';
import {
  protect,
  protectAcoountOwner,
  userId,
  userPending,
  validExistUser,
} from './user.middlewares.js';
import { findOneOrder } from '../orders/orders.controller.js';

export const router = express.Router();

router.post('/signup', createUser);

router.post('/login', login);

router.patch(
  '/:id',
  protect,
  validExistUser,
  protectAcoountOwner,
  updateProfile
);

router.delete('/:id', protect, validExistUser, protectAcoountOwner, deleteUser);

router.get('/orders', protect, findAllOrders);

//arreglar esto
router.get('/orders/:id', findOneOrder);
