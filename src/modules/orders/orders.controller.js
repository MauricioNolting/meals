import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealsServices } from '../meals/meals.services.js';
import { OrderServices } from './order.services.js';

//probar despues de crear controlador para crear meals
export const createOrder = catchAsync(async (req, res, next) => {
  try {
    let userId = req.sessionUser.id;

    const { mealId, quantity } = req.body;

    //userId totalPrice

    const meal = await MealsServices.findOne(mealId);
    if (!meal) {
      return next(new AppError('meal_id dont exist', 400));
    }

    let totalPrice = quantity * meal.price;

    console.log(meal.price);
    const order = await OrderServices.createOrder({
      mealId,
      quantity,
      userId,
      totalPrice,
    });

    if (!order) {
      return next(
        new AppError(
          'Invalid credentials, you need send: mealId, userId, totalPrice, quantity and status'
        ),
        404
      );
    }

    return res.status(200).json({
      order,
    });
  } catch (error) {
    console.log(error);
  }
});

export const findOneOrder = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await OrderServices.findOne(id);
    if (!order) {
      return next(new AppError('This order dont exist', 400));
    }

    return res.status(200).json({
      order,
    });
  } catch (error) {
    console.log(error);
  }
});

export const updateOrder = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await OrderServices.findOne(id);
    if (!order) {
      return next(new AppError('This order dont exist', 400));
    }

    if (!(order.status = 'active')) {
      return next(new AppError(`status is ${order.status}`, 400));
    }

    const orderUpdate = await OrderServices.updateOrder(order);

    return res.status(200).json({
      orderUpdate,
    });
  } catch (error) {
    console.log(error);
  }
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await OrderServices.findOne(id);
    if (!order) {
      return next(new AppError('This order dont exist', 400));
    }

    const orderUpdated = await OrderServices.cancelOrder(order);
    return res.status(200).json({
      message: 'Order was cancelled',
      orderUpdated,
    });
  } catch (error) {
    console.log(error);
  }
});
