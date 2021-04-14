import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const existsUserWithSameEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (existsUserWithSameEmail) {
      throw new AppError('User already exists');
    }

    const passHash = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: passHash,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };
