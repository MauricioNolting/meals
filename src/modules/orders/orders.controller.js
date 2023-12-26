import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { OrderServices } from './order.services.js';

//probar despues de crear controlador para crear meals
export const createOrder = catchAsync(async (req, res, next) => {
  try {
    const { mealId, userId, totalPrice, quantity, status } = req.body;

    const order = await OrderServices.createOrder({
      mealId,
      userId,
      totalPrice,
      quantity,
      status,
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

// export const findUsersOrders = catchAsync(async (req, res, next) => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const findOneOrder = catchAsync(async (req, res, next) => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// });
