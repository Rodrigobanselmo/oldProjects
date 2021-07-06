"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _JwtTokenProvider = require("../../../container/providers/TokenProvider/implementations/JwtTokenProvider");

var _AppError = require("../../../errors/AppError");

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  const jwtTokenProvider = new _JwtTokenProvider.JwtTokenProvider();

  if (!authHeader) {
    throw new _AppError.AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const {
      sub: user_id
    } = jwtTokenProvider.verifyIsValidToken({
      token,
      secret_type: 'default'
    });
    /*     const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
     if (!user) {
      throw new AppError('User does not exists', 401);
    } */

    request.user = {
      id: user_id
    };
    return next();
  } catch (err) {
    throw new _AppError.AppError('Invalid JWT token', 401);
  }
}