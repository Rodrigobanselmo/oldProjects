/* eslint-disable import-helpers/order-imports */
import '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);
// app.use(errorsMessages);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log('middleware Error');
    if (err instanceof AppError) {
      console.log('entrou no instaceof');

      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    console.log('vai pro error 500');

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message} `,
    });
  },
);

app.listen(3333, () => console.log('Server is running'));
