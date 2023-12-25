import express from 'express';
import { enableCors } from './config/plugins/cors.js';
import { globalErrorHandler } from './common/errors/error.controller.js';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';

const app = express();

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  //agregar los origenes aceptados
  'http://localhost:3000',
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

//definir rutas
app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

export default app;
