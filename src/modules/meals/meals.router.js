import express from 'express';
import {
  createMeals,
  deleteMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
} from './meals.controllers.js';
import { protect, protectAcoountOwner } from '../users/user.middlewares.js';

export const router = express.Router();

router.use(protect);
router.get('/', findAllMeals);
router.post('/:id', createMeals);
router.get('/:id', findOneMeal);
router.patch('/:id', protectAcoountOwner, updateMeal);
router.delete('/:id', protectAcoountOwner, deleteMeal);
