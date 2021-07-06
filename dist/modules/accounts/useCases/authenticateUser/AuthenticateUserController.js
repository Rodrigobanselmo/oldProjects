"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

class AuthenticateUserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateUserUserCase = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

    const token = await authenticateUserUserCase.execute({
      email,
      password
    });
    return response.status(201).json(token);
  }

}

exports.AuthenticateUserController = AuthenticateUserController;