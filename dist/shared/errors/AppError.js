"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;

var _httpStatusCodes = require("http-status-codes");

class AppError {
  constructor(message, statusCode = _httpStatusCodes.StatusCodes.BAD_REQUEST) {
    this.message = void 0;
    this.statusCode = void 0;
    this.name = void 0;
    this.stack = void 0;
    // super();
    this.message = message;
    this.statusCode = statusCode;
  }

}

exports.AppError = AppError;