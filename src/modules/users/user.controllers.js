import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../pluggins/enripted-password.pluggins.js';
import { generateJWT } from '../../pluggins/generate-jwt.pluggin.js';
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

    return res.status(200).json({
      message: 'You are logged whit exit!',
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
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = catchAsync(async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export const findUsersOrders = catchAsync(async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export const findOneOrder = catchAsync(async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
