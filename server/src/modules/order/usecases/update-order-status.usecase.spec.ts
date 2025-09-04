import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrderStatusUseCaseImpl } from './update-order-status.usecase';
import { IOrderRepositoryToken } from '../interfaces/order.repository.interface';
import { OrderEntity } from '../entities/order.entity';
import { OrderStatus } from '@prisma/client';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';

describe('UpdateOrderStatusUseCase', () => {
  let useCase: UpdateOrderStatusUseCaseImpl;
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
        UpdateOrderStatusUseCaseImpl,
        {
          provide: IOrderRepositoryToken,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateOrderStatusUseCaseImpl>(
      UpdateOrderStatusUseCaseImpl,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update order status successfully', async () => {
    const updatedOrder = { ...mockOrder, status: OrderStatus.READY };
    mockOrderRepository.findById.mockResolvedValue(mockOrder);
    mockOrderRepository.updateStatus.mockResolvedValue(updatedOrder);

    const result = await useCase.execute('1', OrderStatus.READY);

    expect(result).toEqual(updatedOrder);
    expect(mockOrderRepository.findById).toHaveBeenCalledWith('1');
    expect(mockOrderRepository.updateStatus).toHaveBeenCalledWith(
      '1',
      OrderStatus.READY,
    );
  });

  it('should throw NotFoundException when order does not exist', async () => {
    mockOrderRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute('invalid-id', OrderStatus.READY),
    ).rejects.toThrow(NotFoundException);

    expect(mockOrderRepository.findById).toHaveBeenCalledWith('invalid-id');
    expect(mockOrderRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('should handle all order statuses', async () => {
    const statuses = [
      OrderStatus.PREPARING,
      OrderStatus.READY,
      OrderStatus.COMPLETED,
      OrderStatus.CANCELLED,
    ];

    for (const status of statuses) {
      const updatedOrder = { ...mockOrder, status };
      mockOrderRepository.findById.mockResolvedValue(mockOrder);
      mockOrderRepository.updateStatus.mockResolvedValue(updatedOrder);

      const result = await useCase.execute('1', status);

      expect(result.status).toBe(status);
      expect(mockOrderRepository.updateStatus).toHaveBeenCalledWith(
        '1',
        status,
      );
    }
  });
});
