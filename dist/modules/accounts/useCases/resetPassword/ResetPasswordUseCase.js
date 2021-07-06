"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUseCase = void 0;

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/models/IDateProvider");

var _IHashProvider = require("../../../../shared/container/providers/HashProvider/models/IHashProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

let ResetPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class ResetPasswordUseCase {
  constructor(usersRepository, usersTokensRepository, hashProvider, dateProvider) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.hashProvider = hashProvider;
    this.dateProvider = dateProvider;
  }

  async execute(token, password) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new _AppError.AppError('Invalid Token');
    }

    const isBeforeDate = this.dateProvider.compareIfBefore(new Date(), userToken.expires_date);

    if (!isBeforeDate) {
      throw new _AppError.AppError('Expired Token');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new _AppError.AppError('User does not exists');
    }

    const newPasswordHash = await this.hashProvider.createHash(password);
    user.password = newPasswordHash;
    await this.usersRepository.save(user);
    await this.usersTokensRepository.delete(userToken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUseCase = ResetPasswordUseCase;