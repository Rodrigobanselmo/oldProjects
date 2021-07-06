"use strict";

var _FakeUsersRepository = require("../../repositories/fakes/FakeUsersRepository");

var _FakeUsersTokensRepository = require("../../repositories/fakes/FakeUsersTokensRepository");

var _bcryptjs = require("bcryptjs");

var _DayJSProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayJSProvider");

var _BCryptProvider = require("../../../../shared/container/providers/HashProvider/implementations/BCryptProvider");

var _JwtTokenProvider = require("../../../../shared/container/providers/TokenProvider/implementations/JwtTokenProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let fakeUsersRepository;
let fakeUsersTokensRepository;
let dateProvider;
let tokenProvider;
let hashProvider;
let authenticateUserUseCase;
describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.FakeUsersRepository();
    fakeUsersTokensRepository = new _FakeUsersTokensRepository.FakeUsersTokensRepository();
    dateProvider = new _DayJSProvider.DayJSProvider();
    tokenProvider = new _JwtTokenProvider.JwtTokenProvider();
    hashProvider = new _BCryptProvider.BCryptProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(fakeUsersRepository, fakeUsersTokensRepository, dateProvider, tokenProvider, hashProvider);
  });
  it('Should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Name',
      email: 'email@email.com',
      password: await (0, _bcryptjs.hash)('asdqwe123', 8),
      driver_license: 'License'
    });
    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: 'asdqwe123'
    });
    expect(response).toHaveProperty('token');
  });
  it('Should not be able to authenticate a invalid user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'user.email',
      password: 'asdqwe123'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect'));
  });
  it('Should not be able to authenticate with a invalid password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Name',
      email: 'email@email.com',
      password: await (0, _bcryptjs.hash)('asdqwe123', 8),
      driver_license: 'License'
    });
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: '123qweasd'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect'));
  });
});