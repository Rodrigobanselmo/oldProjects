import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface ITokenDecoded {
  iat: number;
  exp: number;
  aud: string;
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  console.log('teste');
  try {
    if (!authHeader) {
      console.log('1');
      throw new AppError('JWT token is missing', 401);
    }

    const { secret } = auth.jwt;
    const [, token] = authHeader.split(' ');
    const decoded = verify(token, secret as Secret);
    const { sub: user_id } = decoded as ITokenDecoded;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      console.log('2');
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch (err) {
    console.log('aqui');
    // return next(err);
    throw new AppError('Invalid JWT token', 401);
  }
}

export { ensureAuthenticated };
