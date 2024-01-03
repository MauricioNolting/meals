import express from 'express';
import { protect, protectAcoountOwner } from '../users/user.middlewares.js';
import {
  createRestaurant,
  createReviews,
  deleteReview,
  findAllRestaurant,
  findOneRestaurant,
  updateRestaurant,
  updateReview,
} from './restaurant.controller.js';
import {
  valiExistReview,
  validateExistRestaurant,
} from './restaurat.middleware.js';

export const router = express.Router();

router.use(protect);
router.route('/').post(createRestaurant).get(findAllRestaurant);

router.post('/reviews/:id', validateExistRestaurant, createReviews);

router.patch('/:id', updateRestaurant);

router.get('/:id', findOneRestaurant);

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validateExistRestaurant,
    valiExistReview,
    protectAcoountOwner,
    updateReview
  )
  .delete(
    validateExistRestaurant,
    valiExistReview,
    protectAcoountOwner,
    deleteReview
  );
