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

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const { secret } = auth.jwt;
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret as Secret);
    const { sub: user_id } = decoded as ITokenDecoded;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

export { ensureAuthenticated };
