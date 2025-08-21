import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, etx: ExecutionContext) => {
    const request = etx.switchToHttp().getRequest<Request>();

    if (!request.user) {
      throw new Error('User not found in request');
    }
    return request.user;
  },
);
