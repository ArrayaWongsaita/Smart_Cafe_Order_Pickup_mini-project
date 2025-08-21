import { Module } from '@nestjs/common';
import { HealthController } from './controller/health.controller';
import {
  CheckHealthUseCase,
  CheckHealthUseCaseToken,
} from 'src/modules/health/use-case/check-health.usecase';

@Module({
  controllers: [HealthController],
  providers: [
    { provide: CheckHealthUseCaseToken, useClass: CheckHealthUseCase },
  ],
})
export class HealthModule {}
