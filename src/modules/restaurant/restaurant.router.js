import express from 'express';
import { protect } from '../users/user.middlewares.js';
import {
  createRestaurant,
  createReviews,
  deleteReview,
} from './restaurant.controller.js';
import { validateExistRestaurant } from './restaurat.middleware.js';

export const router = express.Router();

router.use(protect);
router
  .route('/')
  .post(createRestaurant)
  .get(/*obtener los restaurantes creados */);

router.post('/reviews/:id', validateExistRestaurant, createReviews);

router
  .route('/reviews/:restaurantId/:id')
  .patch()
  .delete(validateExistRestaurant, deleteReview);
