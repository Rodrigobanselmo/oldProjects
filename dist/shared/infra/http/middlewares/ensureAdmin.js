"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UsersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("../../../errors/AppError");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;

  try {
    const usersRepository = new _UsersRepository.UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user || user.admin !== true) {
      throw new _AppError.AppError('Access Denied', 401);
    }

    return next();
  } catch (err) {
    return next(err);
  }
}