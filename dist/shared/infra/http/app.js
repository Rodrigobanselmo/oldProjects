"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("../../container");

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

require("reflect-metadata");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _errorsMessages = require("./middlewares/errorsMessages");

var _routes = require("./routes");

var _swagger = _interopRequireDefault(require("./swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-unused-vars */
(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use(_routes.router);
app.use(_errorsMessages.errorsMessages);