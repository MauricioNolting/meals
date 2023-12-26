import express from 'express';
import {
  createUser,
  deleteUser,
  login,
  updateProfile,
} from './user.controllers.js';
import {
  protect,
  protectAcoountOwner,
  validExistUser,
} from './user.middlewares.js';

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

router.get('/orders', protect, validExistUser, protectAcoountOwner);

//arreglar esto
router.get('/orders/:id', updateProfile);
