"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordController = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordUseCase = require("./ResetPasswordUseCase");

class ResetPasswordController {
  async handle(request, response) {
    const {
      password
    } = request.body;
    const {
      token
    } = request.params;

    const resetPasswordUseCase = _tsyringe.container.resolve(_ResetPasswordUseCase.ResetPasswordUseCase);

    await resetPasswordUseCase.execute(token, password);
    return response.status(200).send();
  }

}

exports.ResetPasswordController = ResetPasswordController;