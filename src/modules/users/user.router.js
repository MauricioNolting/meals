import express from 'express';
import {
  createUser,
  deleteUser,
  findOneOrder,
  findUsersOrders,
  login,
  updateProfile,
} from './user.controllers.js';

export const router = express.Router();

router.post('/signup', createUser);

router.post('/login', login);

router.patch('/:id', updateProfile);

router.delete('/:id', deleteUser);

router.get('/orders', findUsersOrders);

router.get('/orders/:id', findOneOrder);
