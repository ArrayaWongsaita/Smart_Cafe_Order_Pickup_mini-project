import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckHealthDocument } from 'src/modules/health/doc/health-document.swagger';
import { CheckHealthDto } from 'src/modules/health/dto/check-health.dto';
import {
  CheckHealthUseCase,
  CheckHealthUseCaseToken,
} from 'src/modules/health/use-case/check-health.usecase';
import ValidateResponse from 'src/shared/decorators/validate-response.decorator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    @Inject(CheckHealthUseCaseToken)
    private readonly checkHealthUseCase: CheckHealthUseCase,
  ) {}

  @Get()
  @CheckHealthDocument()
  @ValidateResponse(CheckHealthDto)
  checkHealth(): CheckHealthDto {
    return this.checkHealthUseCase.execute();
  }
}
