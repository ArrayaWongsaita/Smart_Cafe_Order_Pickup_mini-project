import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RefreshTokenDto } from 'src/modules/auth/dto/refresh-token.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { CurrentUserDto } from 'src/shared/dtos/current-user.dto';

export function RegisTerDocument() {
  return applyDecorators(
    ApiOperation({ summary: 'Register new user' }),
    ApiBody({ type: CreateUserDto }),
    ApiResponse({ status: 201, description: 'User successfully registered' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 409, description: 'User already exists' }),
  );
}

export function RefreshTokenDocument() {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh access token' }),
    ApiBody({
      type: RefreshTokenDto,
      description: 'Provide refresh token to get a new access token',
    }),
    ApiResponse({
      status: 200,
      description: 'Access token refreshed successfully',
      schema: {
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function LoginDocument() {
  return applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiBody({ type: LoginDto }),
    ApiResponse({
      status: 200,
      description: 'Login successful',
      schema: {
        properties: {
          message: { type: 'string' },
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
export function GetMeDocument() {
  return applyDecorators(
    ApiOperation({ summary: 'Get authenticated user profile' }),
    ApiBearerAuth(),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({
      status: 200,
      description: 'Returns the authenticated user profile',
      type: CurrentUserDto,
    }),
  );
}
