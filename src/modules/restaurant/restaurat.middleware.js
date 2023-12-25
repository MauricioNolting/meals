import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { RestaurantServices } from './restaurant.services.js';

export const validateExistRestaurant = catchAsync(async (req, res, next) => {
  let resId;

  const { restaurantId, id } = req.params;

  resId = restaurantId || id;

  const restaurant = await RestaurantServices.findOneRestaurant(resId);

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${resId} not found`), 401);
  }

  req.restaurant = restaurant;
  next();
});
