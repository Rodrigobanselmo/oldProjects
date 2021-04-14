import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '@modules/cars/useCases/importCategories/ImportCategoriesController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { Router } from 'express';
import multer from 'multer';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', createCategoryController.handle);

const listCategoryController = new ListCategoriesController();
categoriesRoutes.get('/', listCategoryController.handle);

const importCategoriesController = new ImportCategoriesController();
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle,
);

export { categoriesRoutes };
