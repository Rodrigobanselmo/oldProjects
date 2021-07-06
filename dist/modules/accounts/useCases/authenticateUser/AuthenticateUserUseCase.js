"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/models/IDateProvider");

var _IHashProvider = require("../../../../shared/container/providers/HashProvider/models/IHashProvider");

var _ITokenProvider = require("../../../../shared/container/providers/TokenProvider/models/ITokenProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ITokenProvider.ITokenProvider === "undefined" ? Object : _ITokenProvider.ITokenProvider, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class AuthenticateUserUseCase {
  constructor(usersRepository, usersTokensRepository, dateProvider, tokenProvider, hashProvider) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
    this.tokenProvider = tokenProvider;
    this.hashProvider = hashProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError('Email or password incorrect');
    }

    const passwordMatch = await this.hashProvider.compare(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError('Email or password incorrect');
    }

    const roles = [];
    const token = this.tokenProvider.generateToken(user.id, roles);
    const refresh_token = this.tokenProvider.generateRefreshToken(user.id, user.email, roles);
    const dateNow = this.dateProvider.dateNow();
    const expiresRefreshTokenDays = this.tokenProvider.expiresRefreshTokenDays();
    const refreshTokenExpiresDate = this.dateProvider.addDay(dateNow, expiresRefreshTokenDays);
    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refreshTokenExpiresDate
    });
    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;