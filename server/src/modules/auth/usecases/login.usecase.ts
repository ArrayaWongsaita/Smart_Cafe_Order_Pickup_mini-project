import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

import { BcryptService } from 'src/modules/auth/providers/bcrypt.service';
import { TokenService } from 'src/modules/auth/providers/token.service';
import {
  FindUserByEmailUseCase,
  FindUserByEmailUseCaseToken,
} from 'src/modules/users/use-cases/find-user-by-email.usecase';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const LoginUseCaseToken: unique symbol = Symbol('LoginUseCaseToken');

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(FindUserByEmailUseCaseToken)
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly bcrypt: BcryptService,

    private readonly tokenService: TokenService,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.findUserByEmailUseCase.execute(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user.passwordHash) {
      const isPasswordValid = await this.bcrypt.compare(
        password,
        user.passwordHash,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }
    }

    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await this.tokenService.generateRefreshToken({
      sub: user.id,
    });
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
