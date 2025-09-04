import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import {
  FindByOrderCodeUseCase,
  FindByOrderCodeUseCaseToken,
} from './find-by-order-code.usecase';
import {
  IOrderRepository,
  IOrderRepositoryToken,
} from '../interfaces/order.repository.interface';
import { OrderEntity } from '../entities/order.entity';

describe('FindByOrderCodeUseCase', () => {
  let usecase: FindByOrderCodeUseCase;
  let mockOrderRepository: jest.Mocked<IOrderRepository>;

  beforeEach(async () => {
    mockOrderRepository = {
      createOrder: jest.fn(),
      findById: jest.fn(),
      findByOrderCode: jest.fn(),
      updateStatus: jest.fn(),
      findAll: jest.fn(),
      findByCustomerId: jest.fn(),
      count: jest.fn(),
      findAllWithPagination: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FindByOrderCodeUseCaseToken,
          useClass: FindByOrderCodeUseCase,
        },
        {
          provide: IOrderRepositoryToken,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    usecase = module.get<FindByOrderCodeUseCase>(FindByOrderCodeUseCaseToken);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    const orderCode = 'ABC12345';
    const mockOrder = new OrderEntity({
      id: '1',
      orderCode,
      customerId: null,
      status: 'PREPARING' as any,
      totalPrice: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
      cancelledAt: null,
      notes: null,
      items: [],
    });

    it('should return order when found by order code', async () => {
      mockOrderRepository.findByOrderCode.mockResolvedValue(mockOrder);

      const result = await usecase.execute(orderCode);

      expect(result).toEqual(mockOrder);
      expect(mockOrderRepository.findByOrderCode).toHaveBeenCalledWith(
        orderCode,
      );
      expect(mockOrderRepository.findByOrderCode).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when order not found', async () => {
      mockOrderRepository.findByOrderCode.mockResolvedValue(null);

      await expect(usecase.execute(orderCode)).rejects.toThrow(
        NotFoundException,
      );
      await expect(usecase.execute(orderCode)).rejects.toThrow(
        `Order with code "${orderCode}" not found`,
      );
      expect(mockOrderRepository.findByOrderCode).toHaveBeenCalledWith(
        orderCode,
      );
    });

    it('should trim whitespace from order code', async () => {
      const orderCodeWithSpaces = '  ABC12345  ';
      mockOrderRepository.findByOrderCode.mockResolvedValue(mockOrder);

      await usecase.execute(orderCodeWithSpaces);

      expect(mockOrderRepository.findByOrderCode).toHaveBeenCalledWith(
        orderCode,
      );
    });

    it('should throw error when order code is empty', async () => {
      await expect(usecase.execute('')).rejects.toThrow(
        'Order code is required',
      );
      expect(mockOrderRepository.findByOrderCode).not.toHaveBeenCalled();
    });

    it('should throw error when order code is only whitespace', async () => {
      await expect(usecase.execute('   ')).rejects.toThrow(
        'Order code is required',
      );
      expect(mockOrderRepository.findByOrderCode).not.toHaveBeenCalled();
    });

    it('should throw error when order code is null or undefined', async () => {
      await expect(usecase.execute(null!)).rejects.toThrow(
        'Order code is required',
      );
      await expect(usecase.execute(undefined!)).rejects.toThrow(
        'Order code is required',
      );
      expect(mockOrderRepository.findByOrderCode).not.toHaveBeenCalled();
    });
  });
});
