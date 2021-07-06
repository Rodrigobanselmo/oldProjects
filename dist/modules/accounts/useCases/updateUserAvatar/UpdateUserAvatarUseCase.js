"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarUserCase = void 0;

var _upload = require("../../../../config/upload");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _fs = require("fs");

var _path = require("path");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let UpdateUserAvatarUserCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateUserAvatarUserCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    avatar_file,
    user_id
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.AppError('Invalid user account');
    }

    if (user.avatar) {
      const filePath = (0, _path.resolve)(_upload.uploadConfig.avatarFolder, user.avatar);

      try {
        (0, _fs.statSync)(filePath);
      } catch (err) {// return;
      }

      (0, _fs.unlinkSync)(filePath);
    }

    user.avatar = avatar_file;
    const updatedUser = this.usersRepository.save(user);
    return updatedUser;
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarUserCase = UpdateUserAvatarUserCase;