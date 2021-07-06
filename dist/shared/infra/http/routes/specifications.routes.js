"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ListSpecificationController = require("../../../../modules/cars/useCases/listSpecifications/ListSpecificationController");

var _express = require("express");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ensureAdmin = require("../middlewares/ensureAdmin");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const listSpecificationsController = new _ListSpecificationController.ListSpecificationsController();
specificationsRoutes.get('/', listSpecificationsController.handle);
specificationsRoutes.use(_ensureAuthenticated.ensureAuthenticated);
specificationsRoutes.use(_ensureAdmin.ensureAdmin);
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
specificationsRoutes.post('/', createSpecificationController.handle);