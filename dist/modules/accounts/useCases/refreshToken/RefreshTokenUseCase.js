"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/models/IDateProvider");

var _ITokenProvider = require("../../../../shared/container/providers/TokenProvider/models/ITokenProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('TokenProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _ITokenProvider.ITokenProvider === "undefined" ? Object : _ITokenProvider.ITokenProvider, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class RefreshTokenUseCase {
  constructor(usersTokensRepository, tokenProvider, dateProvider) {
    this.usersTokensRepository = usersTokensRepository;
    this.tokenProvider = tokenProvider;
    this.dateProvider = dateProvider;
  }

  async execute(refresh_token) {
    const {
      sub: user_id,
      email
    } = this.tokenProvider.verifyIsValidToken({
      token: refresh_token,
      secret_type: 'refresh'
    });
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, refresh_token);

    if (!userToken) {
      throw new _AppError.AppError('Refresh Token does not exists!');
    }

    const roles = [];
    const newToken = this.tokenProvider.generateToken(userToken.id, roles);
    const newRefreshToken = this.tokenProvider.generateRefreshToken(user_id, email, []);
    const dateNow = this.dateProvider.dateNow();
    const refresh_expires_days = this.tokenProvider.expiresRefreshTokenDays();
    const expires_date = this.dateProvider.addDay(dateNow, refresh_expires_days);
    await this.usersTokensRepository.create({
      refresh_token,
      user_id,
      expires_date
    });
    await this.usersTokensRepository.delete(userToken.id);
    return {
      refresh_token: newRefreshToken,
      token: newToken
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;