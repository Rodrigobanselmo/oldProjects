import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import ITokenProvider from '@shared/container/providers/TokenProvider/models/ITokenProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { sub: user_id, email } = this.tokenProvider.verifyIsValidToken(
      token,
      'refresh',
    );

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.delete(userToken.id);

    const refresh_token = this.tokenProvider.generateRefreshToken(
      user_id,
      email,
      [],
    );

    const dateNow = this.dateProvider.dateNow();
    const refresh_expires_days = this.tokenProvider.expiresRefreshTokenDays();
    const expires_date = this.dateProvider.addDay(
      dateNow,
      refresh_expires_days,
    );

    await this.usersTokensRepository.create({
      refresh_token,
      user_id,
      expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
