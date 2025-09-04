import { Injectable } from '@nestjs/common';
import { CheckHealthDto } from 'src/modules/health/dto/check-health.dto';

export const CheckHealthUseCaseToken: unique symbol = Symbol(
  'CheckHealthUseCaseToken',
);

@Injectable()
export class CheckHealthUseCase {
  constructor() {}

  execute(): CheckHealthDto {
    return {
      status: 'ok',
      timestamp: new Date(),
      message: 'Health check passed',
      version: '1.0.0',
    };
  }
}
