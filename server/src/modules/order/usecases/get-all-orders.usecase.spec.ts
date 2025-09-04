import { Test, TestingModule } from '@nestjs/testing';
import { GetAllOrdersUseCaseImpl } from './get-all-orders.usecase';
import { IOrderRepositoryToken } from '../interfaces/order.repository.interface';
import { OrderEntity } from '../entities/order.entity';
import { OrderStatus } from '@prisma/client';

describe('GetAllOrdersUseCase', () => {
  let useCase: GetAllOrdersUseCaseImpl;
  let mockOrderRepository: any;

  const mockOrder: OrderEntity = {
    id: '1',
    orderCode: 'ORD001',
    customerId: 'customer1',
    status: OrderStatus.PREPARING,
    totalPrice: 15000,
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null,
    cancelledAt: null,
    notes: null,
  } as OrderEntity;

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
        GetAllOrdersUseCaseImpl,
        {
          provide: IOrderRepositoryToken,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetAllOrdersUseCaseImpl>(GetAllOrdersUseCaseImpl);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return orders with pagination metadata', async () => {
    const mockOrders = [mockOrder];
    const mockTotal = 1;
    mockOrderRepository.findAllWithPagination.mockResolvedValue({
      orders: mockOrders,
      total: mockTotal,
    });

    const result = await useCase.execute(1, 10);

    expect(result).toEqual({
      orders: mockOrders,
      meta: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });
    expect(mockOrderRepository.findAllWithPagination).toHaveBeenCalledWith(
      0,
      10,
    );
  });

  it('should calculate pagination correctly for multiple pages', async () => {
    const mockOrders = Array(10).fill(mockOrder);
    const mockTotal = 25;
    mockOrderRepository.findAllWithPagination.mockResolvedValue({
      orders: mockOrders,
      total: mockTotal,
    });

    const result = await useCase.execute(2, 10);

    expect(result.meta).toEqual({
      total: 25,
      page: 2,
      limit: 10,
      totalPages: 3,
      hasNextPage: true,
      hasPreviousPage: true,
    });
    expect(mockOrderRepository.findAllWithPagination).toHaveBeenCalledWith(
      10,
      10,
    );
  });

  it('should use default values when no parameters provided', async () => {
    mockOrderRepository.findAllWithPagination.mockResolvedValue({
      orders: [],
      total: 0,
    });

    await useCase.execute();

    expect(mockOrderRepository.findAllWithPagination).toHaveBeenCalledWith(
      0,
      10,
    );
  });
});
