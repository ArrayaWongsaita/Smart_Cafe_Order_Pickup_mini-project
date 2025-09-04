import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateOrderUseCase,
  CreateOrderUseCaseToken,
} from './create-order.usecase';
import {
  IOrderRepository,
  IOrderRepositoryToken,
} from '../interfaces/order.repository.interface';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('CreateOrderUseCase', () => {
  let usecase: CreateOrderUseCase;
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
          provide: CreateOrderUseCaseToken,
          useClass: CreateOrderUseCase,
        },
        {
          provide: IOrderRepositoryToken,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    usecase = module.get<CreateOrderUseCase>(CreateOrderUseCaseToken);
  });

  describe('execute', () => {
    it('should create an order successfully', async () => {
      // Arrange
      const createOrderDto: CreateOrderDto = {
        data: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            price: 100,
            quantity: 2,
          },
        ],
      };

      const mockOrder = new OrderEntity({
        id: '123e4567-e89b-12d3-a456-426614174001',
        orderCode: 'ABC12345',
        customerId: null,
        status: 'PREPARING' as any,
        totalPrice: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: null,
        cancelledAt: null,
        notes: null,
      });

      mockOrderRepository.createOrder.mockResolvedValue(mockOrder);

      // Act
      const result = await usecase.execute(createOrderDto);

      // Assert
      expect(result).toEqual(mockOrder);
      expect(mockOrderRepository.createOrder).toHaveBeenCalledWith(
        createOrderDto,
        undefined,
      );
    });

    it('should throw error when no items provided', async () => {
      // Arrange
      const createOrderDto: CreateOrderDto = {
        data: [],
      };

      // Act & Assert
      await expect(usecase.execute(createOrderDto)).rejects.toThrow(
        'Order must contain at least one item',
      );
    });
  });
});
