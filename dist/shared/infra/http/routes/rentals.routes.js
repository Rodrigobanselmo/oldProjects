"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;

var _CreateRentalController = require("../../../../modules/rentals/useCases/createRental/CreateRentalController");

var _DevolutionRentalController = require("../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _ListRentalsByUserController = require("../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");

var _express = require("express");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalsRoutes.use(_ensureAuthenticated.ensureAuthenticated);
rentalsRoutes.post('/', createRentalController.handle);
rentalsRoutes.get('/me', listRentalsByUserController.handle);
rentalsRoutes.use(_ensureAdmin.ensureAdmin);
rentalsRoutes.post('/devolution/:id', devolutionRentalController.handle);