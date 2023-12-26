import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js   ';
import { RestaurantServices } from './restaurant.services.js';

export const createRestaurant = catchAsync(async (req, res, next) => {
  try {
    const { name, adress, rating } = req.body;

    const existRestaurant = await RestaurantServices.findOneRestaurantByName(
      name
    );

    if (existRestaurant) {
      return next(new AppError('This name already exist', 401));
    }

    const restaurant = await RestaurantServices.createRestaurant({
      name,
      adress,
      rating,
    });

    return res.status(200).json({
      restaurant,
    });
  } catch (error) {
    console.log(error);
  }
});

export const createReviews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const { sessionUser } = req;

    const review = await RestaurantServices.createReview({
      userId: sessionUser.id,
      restaurantId: id,
      comment,
      rating,
    });

    return res.status(200).json({
      review,
    });
  } catch (error) {
    console.log(error);
  }
});

export const deleteReview = catchAsync(async (req, res, next) => {
  try {
    return res.status(200).json({
      message: 'Review was deleted',
    });
  } catch (error) {
    console.log(error);
  }
});
