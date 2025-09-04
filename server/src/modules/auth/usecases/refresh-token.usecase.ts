import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TokenService } from 'src/modules/auth/providers/token.service';
import {
  FindUserByIdUseCase,
  FindUserByIdUseCaseToken,
} from 'src/modules/users/use-cases/find-user-by-id.usecase';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly tokenService: TokenService,
    @Inject(FindUserByIdUseCaseToken)
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    // Verify the refresh token
    try {
      const payload = await this.tokenService.verifyRefreshToken(refreshToken);

      if (!payload) {
        throw new BadGatewayException('Invalid refresh token');
      }

      const user = await this.findUserByIdUseCase.execute(payload.sub);

      if (!user) {
        throw new BadGatewayException('User not found');
      }

      // Generate a new access token using the payload from the refresh token
      const newAccessToken = await this.tokenService.generateAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: refreshToken,
      };
    } catch {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
