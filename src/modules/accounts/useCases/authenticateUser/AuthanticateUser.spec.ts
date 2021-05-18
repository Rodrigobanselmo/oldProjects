import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);
  });

  it('Should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Name',
      email: 'email@email.com',
      password: await hash('asdqwe123', 8),
      driver_license: 'License',
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: 'asdqwe123',
    });

    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate a invalid user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'user.email',
        password: 'asdqwe123',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('Should not be able to authenticate with a invalid password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Name',
      email: 'email@email.com',
      password: await hash('asdqwe123', 8),
      driver_license: 'License',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '123qweasd',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
