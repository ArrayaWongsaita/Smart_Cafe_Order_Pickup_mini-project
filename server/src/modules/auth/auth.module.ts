import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';

import { ConfigType } from '@nestjs/config';
import { TokenService } from './providers/token.service';

import { BcryptService } from 'src/modules/auth/providers/bcrypt.service';
import { UsersModule } from 'src/modules/users/users.module';
import {
  LoginUseCase,
  LoginUseCaseToken,
} from 'src/modules/auth/usecases/login.usecase';
import {
  RegisterUseCase,
  RegisterUseCaseToken,
} from 'src/modules/auth/usecases/register.usecase';
import { RefreshTokenUseCase } from 'src/modules/auth/usecases/refresh-token.usecase';
import jwtConfig from 'src/shared/config/jwt.config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (jwtConfiguration: ConfigType<typeof jwtConfig>) => {
        return {
          secret: jwtConfiguration.accessTokenSecret,
          signOptions: {
            expiresIn: jwtConfiguration.accessTokenExpiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    BcryptService,
    TokenService,
    RefreshTokenUseCase,
    {
      provide: LoginUseCaseToken,
      useClass: LoginUseCase,
    },
    {
      provide: RegisterUseCaseToken,
      useClass: RegisterUseCase,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
