import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailablesCarsController } from '@modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecification = new CreateCarSpecificationController();
const listAvailablesCarsController = new ListAvailablesCarsController();

carsRoutes.get('/availables', listAvailablesCarsController.handle);

carsRoutes.use(ensureAuthenticated);
carsRoutes.use(ensureAdmin);

carsRoutes.post('/', createCarController.handle);
carsRoutes.patch('/specifications/:id', createCarSpecification.handle);
carsRoutes.get('/', listCarsController.handle);

export { carsRoutes };
