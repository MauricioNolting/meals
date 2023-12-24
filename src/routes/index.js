import express from 'express';
import { router as userRouter } from '../modules/users/user.router.js';
import { router as mealsRouter } from '../modules/meals/meals.router.js';
import { router as restaurantRouter } from '../modules/restaurant/restaurant.router.js';
import { router as ordersRouter } from '../modules/orders/orders.router.js';

export const router = express.Router();

router.use('/users', userRouter);
router.use('/meals', mealsRouter);
router.use('/restaurants', restaurantRouter);
router.use('/orders', ordersRouter);
