"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _upload = require("../../../../config/upload");

var _CreateCarController = require("../../../../modules/cars/useCases/createCar/CreateCarController");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListAvailablesCarsController = require("../../../../modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController");

var _ListCarsController = require("../../../../modules/cars/useCases/listCars/ListCarsController");

var _UploadCarImagesController = require("../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.uploadConfig.upload('car_images', undefined, true));
const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listCarsController = new _ListCarsController.ListCarsController();
const createCarSpecification = new _CreateCarSpecificationController.CreateCarSpecificationController();
const listAvailablesCarsController = new _ListAvailablesCarsController.ListAvailablesCarsController();
const uploadCarImagesController = new _UploadCarImagesController.UploadCarImagesController();
carsRoutes.get('/availables', listAvailablesCarsController.handle);
carsRoutes.use(_ensureAuthenticated.ensureAuthenticated);
carsRoutes.use(_ensureAdmin.ensureAdmin);
carsRoutes.get('/', listCarsController.handle);
carsRoutes.post('/', createCarController.handle);
carsRoutes.patch('/specifications/:id', createCarSpecification.handle);
carsRoutes.patch('/images/:id', upload.array('images'), uploadCarImagesController.handle);