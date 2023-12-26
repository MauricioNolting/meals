import { catchAsync } from '../../common/errors/catchAsync.js';
import { UserService } from './users.services.js';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { envs } from '../../config/enviroments/enviroments.js';
import { AppError } from '../../common/errors/appError.js';

export const validExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await UserService.findOne(id);

  if (!user) {
    return res.status(404).json({
      Error: 'error',
      Mesage: 'user not found',
    });
  }

  req.user = user;
  next();
});

export const userPending = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserService.findOne(id);

    if (!user) {
      return next(new AppError(`User id: ${id} not found`, 404));
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
};

export const protect = catchAsync(async (req, res, next) => {
  //1. obtener el token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //2. validar que exista el token
  if (!token) {
    return next(
      new AppError('you are not logged in!. PLease login to get access', 401)
    );
  }

  //3. decodificar el token    //Esto es que el verify no devuelve una promesa, pero es nescesaria, entonces se hace el psmisify para que retorne una promesa
  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);
  //4. Buscar el usuario dueno del token y validar si existe
  const user = await UserService.findOne(decoded.id);

  if (!user) {
    return next(
      new AppError('The owner of this token is not loger avaible', 401)
    );
  }

  //6.  Adjuntar el usuario en session, el usuario en session es el dueno del token
  req.sessionUser = user; //! importante esto, porque asi se puede usar despues en actualizar algun dato del usuario n session, sacando de la req.sessionUser el usuario actual.
  next();
});

export const protectAcoountOwner = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user?.id != sessionUser?.id) {
    return next(new AppError('You do not own whis account', 401));
  }

  next();
};

export const restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You dont have persmission to perfmo this action', 403)
      );
    }
    next();
  };
};
