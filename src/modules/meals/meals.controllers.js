import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { RestaurantServices } from '../restaurant/restaurant.services.js';
import { MealsServices } from './meals.services.js';

export const createMeals = catchAsync(async (req, res, next) => {
  try {
    let restaurantId;
    const { id } = req.params;
    const { name, price } = req.body;

    //verificar que si exista el restaurante donde se quiere crear la comida
    const restaurantExist = await RestaurantServices.findOneRestaurant(id);
    if (!restaurantExist) {
      return next(new AppError('This restaurantId dont exist', 400));
    }

    restaurantId = id;

    //verificar que no exista una comida con ese nombre
    const mealExist = await MealsServices.findOneByName(name);
    if (mealExist) {
      return next(new AppError('This meal already exist', 400));
    }

    const meal = await MealsServices.createMeals({ name, price, restaurantId });

    return res.status(200).json({
      message: 'Meal created succesfully',
      meal,
    });
  } catch (error) {
    console.log(error);
  }
});

export const findAllMeals = catchAsync(async (req, res, next) => {
  try {
    const meals = await MealsServices.findAll();

    if (!meals) {
      return next(new AppError('Dont exist meals', 400));
    }

    return res.status(200).json({
      message: 'Meals found succesfully',
      meals,
    });
  } catch (error) {
    console.log(error);
  }
});

export const findOneMeal = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await MealsServices.findOne(id);
    if (!meal) {
      return next(new AppError(`Meal with id: ${id} dont exist`), 404);
    }

    return res.status(200).json({
      message: 'Meal found succesfully',
      meal,
    });
  } catch (error) {
    console.log(error);
  }
});

export const updateMeal = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const meal = await MealsServices.findOne(id);
    if (!meal) {
      return next(new AppError(`meal with id: ${id} not exist`), 400);
    }

    const mealUpdated = await MealsServices.update(meal, { name, price });
    if (!mealUpdated) {
      return next(new AppError(`Invalid credential`), 406);
    }

    return res.status(200).json({
      message: 'Meal update succesfully',
      mealUpdated,
    });
  } catch (error) {
    console.log(error);
  }
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await MealsServices.findOne(id);

    if (!meal) {
      return next(new AppError(`meal with id: ${id} not exist`), 400);
    }

    await MealsServices.delete(meal);

    return res.status(200).json({
      message: 'Meal was deleted succesfully',
    });
  } catch (error) {
    console.log(error);
  }
});
