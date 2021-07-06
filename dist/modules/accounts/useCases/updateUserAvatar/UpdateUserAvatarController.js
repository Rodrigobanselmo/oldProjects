"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(request, response) {
    const {
      filename
    } = request.file;
    const {
      id
    } = request.user;

    const updateUserAvatarUserCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUserCase);

    const user = await updateUserAvatarUserCase.execute({
      avatar_file: filename,
      user_id: id
    });
    return response.status(200).json(user);
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;