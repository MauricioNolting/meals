import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js   ';
import { UserService } from '../users/users.services.js';
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

export const updateRestaurant = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, adress } = req.body;

    console.log(req.user);
    const restaurant = await RestaurantServices.findOneRestaurant(id);

    if (!restaurant) {
      return next(
        new AppError(`This restaurant with id: ${id} dont exist`, 401)
      );
    }
    const restaurantUpdated = await RestaurantServices.updateRestaurant(
      restaurant,
      { name, adress }
    );

    return res.status(200).json({
      message: 'Restaurant updated',
      restaurantUpdated,
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

export const updateReview = catchAsync(async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    console.log(req.review);
    const reviewUpdated = await RestaurantServices.updateReview(req.review, {
      comment,
      rating,
    });

    if (req.restaurant.id !== req.review.restaurantId) {
      return next(
        new AppError(
          'The restaurant id does not correspond to the review id',
          404
        )
      );
    }

    return res.status(200).json({
      message: 'Review was update',
      reviewUpdated,
      restaurant: req.restaurant.id,
    });
  } catch (error) {
    console.log(error);
  }
});

export const findAllRestaurant = catchAsync(async (req, res, next) => {
  try {
    const restaurant = await RestaurantServices.findAllRestaurants();

    if (!restaurant) {
      return next(new AppError('There are not restaurants created', 400));
    }
    return res.status(200).json({
      restaurant,
    });
  } catch (error) {
    console.log(error);
  }
});

export const findOneRestaurant = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantServices.findOneRestaurant(id);

    if (!restaurant) {
      return next(new AppError(`Restaurant with id: ${id} not found`, 400));
    }
    return res.status(200).json({
      restaurant,
    });
  } catch (error) {
    console.log(error);
  }
});
