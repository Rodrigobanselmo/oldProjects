"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IHashProvider = require("../../../../shared/container/providers/HashProvider/models/IHashProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserUseCase {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    name,
    email,
    password,
    driver_license
  }) {
    const existsUserWithSameEmail = await this.usersRepository.findByEmail(email);

    if (existsUserWithSameEmail) {
      throw new _AppError.AppError('User already exists');
    }

    const passHash = await this.hashProvider.createHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: passHash,
      driver_license
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;