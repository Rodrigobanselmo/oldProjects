"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorsMessages = errorsMessages;

var _AppError = require("../../../errors/AppError");

/* eslint-disable @typescript-eslint/no-unused-vars */
function errorsMessages(err, req, response, next) {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  } // next(err);


  return response.status(500).json({
    message: `Internal server error - ${err.message}`
  });
}