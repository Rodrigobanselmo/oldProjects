/* eslint-disable import-helpers/order-imports */
import '@shared/container';
import errorsMessages from '@shared/infra/http/middlewares/errorsMessages';
import { router } from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);
app.use(errorsMessages);

app.listen(3333, () => console.log('Server is running'));
