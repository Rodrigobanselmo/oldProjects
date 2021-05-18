/* eslint-disable @typescript-eslint/no-unused-vars */
import '@shared/container';
import createConnection from '@shared/infra/typeorm';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { errorsMessages } from './middlewares/errorsMessages';
import { router } from './routes';
import swaggerDocument from './swagger.json';

createConnection();
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);
app.use(errorsMessages);

export { app };
