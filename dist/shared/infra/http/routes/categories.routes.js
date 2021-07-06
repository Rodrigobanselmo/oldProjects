"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _CreateCategoryController = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");

var _ImportCategoriesController = require("../../../../modules/cars/useCases/importCategories/ImportCategoriesController");

var _ListCategoriesController = require("../../../../modules/cars/useCases/listCategories/ListCategoriesController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, _multer.default)({
  dest: './tmp'
});
const listCategoryController = new _ListCategoriesController.ListCategoriesController();
categoriesRoutes.get('/', listCategoryController.handle);
categoriesRoutes.use(_ensureAuthenticated.ensureAuthenticated);
categoriesRoutes.use(_ensureAdmin.ensureAdmin);
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
categoriesRoutes.post('/', createCategoryController.handle);
const importCategoriesController = new _ImportCategoriesController.ImportCategoriesController();
categoriesRoutes.post('/import', upload.single('file'), importCategoriesController.handle);