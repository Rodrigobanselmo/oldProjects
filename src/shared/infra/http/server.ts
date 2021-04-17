/* eslint-disable @typescript-eslint/no-unused-vars */
import '@shared/container';
import '@shared/infra/typeorm';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import { router } from '@shared/infra/http/routes';

import { errorsMessages } from './middlewares/errorsMessages';
import swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());

app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorsMessages);

app.listen(3333, () => console.log('Server is running'));
