import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../pluggins/enripted-password.pluggins.js';
import { generateJWT } from '../../pluggins/generate-jwt.pluggin.js';
import { MealsServices } from '../meals/meals.services.js';
import { RestaurantServices } from '../restaurant/restaurant.services.js';
import { UserService } from './users.services.js';

export const createUser = catchAsync(async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await UserService.create({ name, email, password, role });

    const token = await generateJWT(user.id);

    return res.status(200).json({
      token,
      user: { id: user.id, name, email, role },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const login = catchAsync(async (req, res, next) => {
  try {
    console.log(req.userId);
    const { email, password } = req.body;

    const user = await UserService.findOneByEmail(email);

    if (!user) {
      return res.status(404).json({
        error: 'error',
        message: 'User not found',
      });
    }

    const passwordIsOk = await verifyPassword(password, user.password);

    if (!passwordIsOk) {
      return next(new AppError('Invalid email or password', 404));
    }

    const token = await generateJWT(user.id);

    req.userId = user.id;
    return res.status(200).json({
      message: 'You are logged!',
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

export const updateProfile = catchAsync(async (req, res, next) => {
  try {
    const { user } = req;
    const { name, email } = req.body;
    console.log(req.sessionUser);
    console.log(req.user);

    const update = await UserService.updateUser(user, { name, email });
    if (!update) {
      return next(new AppError('Invalid credentials', 404));
    }

    return res.status(200).json({
      message: 'User update succesfully!',
      update,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = catchAsync(async (req, res, next) => {
  try {
    const { user } = req;

    const userdelete = await UserService.deleteUser(user);
    if (!userdelete) {
      return next(new AppError('Invalid credentials', 404));
    }

    return res.status(200).json({
      message: 'User was deleted succesfully',
    });
  } catch (error) {
    console.log(error);
  }
});

export const findAllOrders = catchAsync(async (req, res, next) => {
  try {
    const { sessionUser } = req;

    console.log(sessionUser.id);
    const orders = await UserService.findAllOrders(sessionUser.id);

    if (!orders || orders.length === 0) {
      return next(new AppError(`This user wasnt create orders`, 400));
    }

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log(error);
  }
});
