import { Test, TestingModule } from '@nestjs/testing';
import { OrderGateway } from './order.gateway';
import { CreateOrderUseCaseToken } from './usecases/create-order.usecase';
import { FindByOrderCodeUseCaseToken } from './usecases/find-by-order-code.usecase';
import { GetAllOrdersUseCaseToken } from './usecases/get-all-orders.usecase';
import { UpdateOrderStatusUseCaseToken } from './usecases/update-order-status.usecase';
import { TokenService } from 'src/modules/auth/providers/token.service';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { TackOrderDataDto } from './dto/tack-order.dto';
import { GetOrdersPaginationDto } from './dto/get-orders-pagination.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Socket } from 'socket.io';

describe('OrderGateway', () => {
  let gateway: OrderGateway;
  let mockCreateOrderUseCase: any;
  let mockFindByOrderCodeUseCase: any;
  let mockGetAllOrdersUseCase: any;
  let mockUpdateOrderStatusUseCase: any;
  let mockTokenService: any;

  const mockOrder: OrderEntity = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    orderCode: 'ORD001',
    customerId: 'customer1',
    status: OrderStatus.PREPARING,
    totalPrice: 15000,
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null,
    cancelledAt: null,
    notes: null,
    items: [
      {
        id: '1516fbb8-e83b-436c-bd88-67be8b507a1d',
        orderId: '123e4567-e89b-12d3-a456-426614174000',
        qty: 1,
        unitPrice: 5000,
        subtotal: 5000,
        itemId: '1f1d6440-3d75-4703-a712-02bf41fadae2',
        createdAt: new Date(),
        item: {
          id: '1f1d6440-3d75-4703-a712-02bf41fadae2',
          name: 'Espresso',
          description: 'Strong coffee shot',
          price: 5000,
          imageUrl: 'https://example.com/image.png',
          active: true,
          categoryId: '9ec0a11f-ea9a-4638-be46-c32531bebb27',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  } as OrderEntity;

  const mockSocket = {
    join: jest.fn(),
    user: { sub: 'user123' },
    to: jest.fn(),
    emit: jest.fn(),
  } as unknown as Socket;

  beforeEach(async () => {
    mockCreateOrderUseCase = {
      execute: jest.fn(),
    };

    mockFindByOrderCodeUseCase = {
      execute: jest.fn(),
    };

    mockGetAllOrdersUseCase = {
      execute: jest.fn(),
    };

    mockUpdateOrderStatusUseCase = {
      execute: jest.fn(),
    };

    mockTokenService = {
      verifyToken: jest.fn(),
      extractTokenFromSocket: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderGateway,
        {
          provide: CreateOrderUseCaseToken,
          useValue: mockCreateOrderUseCase,
        },
        {
          provide: FindByOrderCodeUseCaseToken,
          useValue: mockFindByOrderCodeUseCase,
        },
        {
          provide: GetAllOrdersUseCaseToken,
          useValue: mockGetAllOrdersUseCase,
        },
        {
          provide: UpdateOrderStatusUseCaseToken,
          useValue: mockUpdateOrderStatusUseCase,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
      ],
    }).compile();

    gateway = module.get<OrderGateway>(OrderGateway);

    // Mock server property using reflection
    (gateway as any).server = {
      to: jest.fn().mockReturnValue({
        emit: jest.fn(),
      }),
    };

    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('trackOrderStatus', () => {
    it('should track order status successfully', async () => {
      const trackData: TackOrderDataDto = { orderCode: 'ORD001' };
      mockFindByOrderCodeUseCase.execute.mockResolvedValue(mockOrder);

      const result = await gateway.trackOrderStatus(trackData, mockSocket);

      expect(mockFindByOrderCodeUseCase.execute).toHaveBeenCalledWith('ORD001');
      expect(mockSocket.join).toHaveBeenCalledWith(mockOrder.id);
      expect(result).toEqual({
        success: true,
        order: mockOrder,
      });
    });

    it('should return error when order not found', async () => {
      const trackData: TackOrderDataDto = { orderCode: 'INVALID' };
      mockFindByOrderCodeUseCase.execute.mockResolvedValue(null);

      const result = await gateway.trackOrderStatus(trackData, mockSocket);

      expect(result).toEqual({
        success: false,
        message: 'Order not found',
      });
      expect(mockSocket.join).not.toHaveBeenCalled();
    });
  });

  describe('createOrder', () => {
    it('should create order successfully', async () => {
      const createOrderDto: CreateOrderDto = {
        data: [
          {
            id: '1f1d6440-3d75-4703-a712-02bf41fadae2',
            price: 5000,
            quantity: 1,
          },
        ],
      };

      mockCreateOrderUseCase.execute.mockResolvedValue(mockOrder);

      const result = await gateway.createOrder(createOrderDto, mockSocket);

      expect(mockCreateOrderUseCase.execute).toHaveBeenCalledWith(
        createOrderDto,
        'user123',
      );
      expect((gateway as any).server.to).toHaveBeenCalledWith('barista-room');
      expect(result.success).toBe(true);
      expect(result.orderCode).toBe(mockOrder.orderCode);
    });

    it('should handle create order error', async () => {
      const createOrderDto: CreateOrderDto = {
        data: [
          {
            id: '1f1d6440-3d75-4703-a712-02bf41fadae2',
            price: 5000,
            quantity: 1,
          },
        ],
      };

      mockCreateOrderUseCase.execute.mockRejectedValue(
        new Error('Creation failed'),
      );

      const result = await gateway.createOrder(createOrderDto, mockSocket);

      expect(result).toEqual({
        success: false,
        orderCode: null,
        message: 'Creation failed',
        data: null,
      });
    });
  });

  describe('joinNewOrdersRoom', () => {
    it('should join barista room successfully', async () => {
      const result = await gateway.joinNewOrdersRoom(mockSocket);

      expect(mockSocket.join).toHaveBeenCalledWith('barista-room');
      expect(result).toEqual({
        success: true,
        message: 'Successfully joined new orders room',
      });
    });
  });

  describe('getAllOrders', () => {
    it('should get all orders with pagination', async () => {
      const paginationDto: GetOrdersPaginationDto = {
        page: 1,
        limit: 10,
      };

      const mockResult = {
        orders: [mockOrder],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockGetAllOrdersUseCase.execute.mockResolvedValue(mockResult);

      const result = await gateway.getAllOrders(paginationDto);

      expect(mockGetAllOrdersUseCase.execute).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual({
        success: true,
        data: mockResult.orders,
        meta: mockResult.meta,
        message: 'Orders retrieved successfully',
      });
    });

    it('should handle get all orders error', async () => {
      const paginationDto: GetOrdersPaginationDto = {
        page: 1,
        limit: 10,
      };

      mockGetAllOrdersUseCase.execute.mockRejectedValue(
        new Error('Retrieval failed'),
      );

      const result = await gateway.getAllOrders(paginationDto);

      expect(result).toEqual({
        success: false,
        data: null,
        meta: null,
        message: 'Retrieval failed',
      });
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status successfully', async () => {
      const updateDto: UpdateOrderStatusDto = {
        orderId: mockOrder.id,
        status: OrderStatus.READY,
      };

      const updatedOrder = { ...mockOrder, status: OrderStatus.READY };
      mockUpdateOrderStatusUseCase.execute.mockResolvedValue(updatedOrder);

      const result = await gateway.updateOrderStatus(updateDto);

      expect(mockUpdateOrderStatusUseCase.execute).toHaveBeenCalledWith(
        mockOrder.id,
        OrderStatus.READY,
      );
      expect((gateway as any).server.to).toHaveBeenCalledWith(mockOrder.id);
      expect((gateway as any).server.to).toHaveBeenCalledWith('barista-room');
      expect(result).toEqual({
        success: true,
        data: updatedOrder,
        message: 'Order status updated successfully',
      });
    });

    it('should handle update order status error', async () => {
      const updateDto: UpdateOrderStatusDto = {
        orderId: mockOrder.id,
        status: OrderStatus.READY,
      };

      mockUpdateOrderStatusUseCase.execute.mockRejectedValue(
        new Error('Update failed'),
      );

      const result = await gateway.updateOrderStatus(updateDto);

      expect(result).toEqual({
        success: false,
        data: null,
        message: 'Update failed',
      });
    });
  });
});
