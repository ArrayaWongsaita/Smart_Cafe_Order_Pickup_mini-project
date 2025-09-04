import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import jwtConfig from 'src/config/env/jwt.config';
import {
  ACCESS_TOKEN_PAYLOAD,
  REFRESH_TOKEN_PAYLOAD,
} from 'src/modules/auth/types/payload.type';
import jwtConfig from 'src/shared/config/jwt.config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  generateAccessToken(payLoad: ACCESS_TOKEN_PAYLOAD): Promise<string> {
    return this.jwtService.signAsync(payLoad);
  }

  generateRefreshToken(payLoad: REFRESH_TOKEN_PAYLOAD): Promise<string> {
    // Logic to generate a refresh token
    return this.jwtService.signAsync(payLoad, {
      secret: this.jwtConfiguration.refreshTokenSecret,
      expiresIn: this.jwtConfiguration.refreshTokenExpiresIn,
    });
  }

  verifyAccessToken(token: string): Promise<ACCESS_TOKEN_PAYLOAD> {
    return this.jwtService.verifyAsync<ACCESS_TOKEN_PAYLOAD>(token, {
      secret: this.jwtConfiguration.accessTokenSecret,
    });
  }
  verifyRefreshToken(token: string): Promise<REFRESH_TOKEN_PAYLOAD> {
    return this.jwtService.verifyAsync<REFRESH_TOKEN_PAYLOAD>(token, {
      secret: this.jwtConfiguration.refreshTokenSecret,
    });
  }
}
