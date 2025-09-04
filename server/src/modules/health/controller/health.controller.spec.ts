import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  CheckHealthUseCase,
  CheckHealthUseCaseToken,
} from '../use-case/check-health.usecase';
import { CheckHealthDto } from '../dto/check-health.dto';

describe('HealthController', () => {
  let controller: HealthController;
  let checkHealthUseCase: jest.Mocked<CheckHealthUseCase>;

  beforeEach(async () => {
    const mockCheckHealthUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: CheckHealthUseCaseToken,
          useValue: mockCheckHealthUseCase,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    checkHealthUseCase = module.get(CheckHealthUseCaseToken);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should call checkHealthUseCase.execute and return the result', () => {
      // Arrange
      const expectedResult: CheckHealthDto = {
        status: 'ok',
        timestamp: new Date(),
        message: 'Health check passed',
        version: '1.0.0',
      };
      checkHealthUseCase.execute.mockReturnValue(expectedResult);

      // Act
      const result = controller.checkHealth();

      // Assert
      expect(checkHealthUseCase.execute).toHaveBeenCalledTimes(1);
      expect(checkHealthUseCase.execute).toHaveBeenCalledWith();
      expect(result).toEqual(expectedResult);
    });
  });
});
