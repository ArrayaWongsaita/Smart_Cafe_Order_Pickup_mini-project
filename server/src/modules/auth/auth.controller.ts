import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import {
  LoginResponse,
  LoginUseCase,
  LoginUseCaseToken,
} from 'src/modules/auth/usecases/login.usecase';
import {
  RegisterUseCase,
  RegisterUseCaseToken,
} from 'src/modules/auth/usecases/register.usecase';
import { RefreshTokenDto } from 'src/modules/auth/dto/refresh-token.dto';
import { RefreshTokenUseCase } from 'src/modules/auth/usecases/refresh-token.usecase';
import {
  GetMeDocument,
  LoginDocument,
  RefreshTokenDocument,
  RegisTerDocument,
} from 'src/modules/auth/doc/article-document.swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/shared/dtos/current-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LoginUseCaseToken)
    private readonly loginUsecase: LoginUseCase,

    @Inject(RegisterUseCaseToken)
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('register')
  @Public()
  @RegisTerDocument()
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.registerUseCase.execute(createUserDto);
    return { message: 'User successfully registered' };
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @LoginDocument()
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.loginUsecase.execute(loginDto);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @RefreshTokenDocument()
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.refreshTokenUseCase.execute(refreshTokenDto.refresh_token);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @GetMeDocument()
  getMe(@CurrentUser() user: CurrentUserDto): CurrentUserDto {
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return {
      sub: user.sub,
      email: user.email,
      role: user.role,
    };
  }
}
