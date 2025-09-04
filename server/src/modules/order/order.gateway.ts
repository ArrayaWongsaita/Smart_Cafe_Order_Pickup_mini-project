import { Inject, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ORDER_EVENT } from 'src/modules/order/constants/order-event.constant';
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';
import { BaseWebSocketGateway } from 'src/shared/gateways/base-websocket.gateway';
import { WebSocketValidationPipe } from 'src/shared/pipes/websocket-validation.pipe';
import {
  CreateOrderUseCase,
  CreateOrderUseCaseToken,
} from './usecases/create-order.usecase';
import { TokenService } from 'src/modules/auth/providers/token.service';
import { TackOrderDataDto } from 'src/modules/order/dto/tack-order.dto';
import {
  FindByOrderCodeUseCase,
  FindByOrderCodeUseCaseToken,
} from 'src/modules/order/usecases/find-by-order-code.usecase';
import {
  GetAllOrdersUseCase,
  GetAllOrdersUseCaseToken,
} from './usecases/get-all-orders.usecase';
import {
  UpdateOrderStatusUseCase,
  UpdateOrderStatusUseCaseToken,
} from './usecases/update-order-status.usecase';
import { GetOrdersPaginationDto } from './dto/get-orders-pagination.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@WebSocketGateway({
  namespace: 'order',
  cors: {
    origin: '*',
  },
})
export class OrderGateway extends BaseWebSocketGateway {
  constructor(
    @Inject(CreateOrderUseCaseToken)
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject(FindByOrderCodeUseCaseToken)
    private readonly findByOrderCodeUseCase: FindByOrderCodeUseCase,
    @Inject(GetAllOrdersUseCaseToken)
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    @Inject(UpdateOrderStatusUseCaseToken)
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    tokenService: TokenService,
  ) {
    super(tokenService);
  }

  @UsePipes(WebSocketValidationPipe)
  @SubscribeMessage(ORDER_EVENT.TRACK)
  async trackOrderStatus(
    @MessageBody() data: TackOrderDataDto,
    @ConnectedSocket() client: Socket,
  ) {
    const order = await this.findByOrderCodeUseCase.execute(data.orderCode);
    if (!order) {
      console.log('Order not found');
      return { success: false, message: 'Order not found' };
    }
    await client.join(order.id); // Join a room with the order ID

    return { success: true, order };
  }

  @UsePipes(WebSocketValidationPipe)
  @SubscribeMessage(ORDER_EVENT.CREATE)
  async createOrder(
    @MessageBody() data: CreateOrderDto,

    @ConnectedSocket() client: Socket,
  ) {
    try {
      const order = await this.createOrderUseCase.execute(
        data,
        client.user?.sub,
      );

      const result = {
        success: true,
        orderCode: order.orderCode,
        message: 'Order created successfully',
        data: {
          id: order.id,
          orderCode: order.orderCode,
          status: order.status,
          totalPrice: order.totalPrice,
          createdAt: order.createdAt,
        },
      };

      // Notify baristas about new order
      this.server.to('barista-room').emit(ORDER_EVENT.NEW_ORDER_NOTIFICATION, {
        ...order,
        message: 'New order received',
      });

      console.log('ss');

      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        orderCode: null,
        message: error.message || 'Failed to create order',
        data: null,
      };
      console.log('er');
      return errorResult;
    }
  }

  /**
   * For baristas to join a room to receive new order notifications
   */
  @SubscribeMessage(ORDER_EVENT.JOIN_NEW_ORDERS)
  async joinNewOrdersRoom(@ConnectedSocket() client: Socket) {
    await client.join('barista-room');
    return {
      success: true,
      message: 'Successfully joined new orders room',
    };
  }

  /**
   * For baristas to get all orders with pagination
   */
  @UsePipes(WebSocketValidationPipe)
  @SubscribeMessage(ORDER_EVENT.GET_ALL_ORDERS)
  async getAllOrders(@MessageBody() data: GetOrdersPaginationDto) {
    try {
      const result = await this.getAllOrdersUseCase.execute(
        data.page || 1,
        data.limit || 10,
      );

      return {
        success: true,
        data: result.orders,
        meta: result.meta,
        message: 'Orders retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        meta: null,
        message: error.message || 'Failed to retrieve orders',
      };
    }
  }

  /**
   * For baristas to update order status
   */
  @UsePipes(WebSocketValidationPipe)
  @SubscribeMessage(ORDER_EVENT.UPDATE_ORDER_STATUS)
  async updateOrderStatus(@MessageBody() data: UpdateOrderStatusDto) {
    try {
      const updatedOrder = await this.updateOrderStatusUseCase.execute(
        data.orderId,
        data.status,
      );

      // Notify all clients tracking this order about the status change
      this.server.to(data.orderId).emit(ORDER_EVENT.STATUS_UPDATE, {
        orderId: data.orderId,
        data: updatedOrder,
        message: `Order status updated to ${data.status}`,
      });

      // Also notify baristas about the status change
      this.server.to('barista-room').emit(ORDER_EVENT.STATUS_UPDATE, {
        orderId: data.orderId,
        data: updatedOrder,
        message: `Order ${updatedOrder.orderCode} status updated to ${data.status}`,
      });

      return {
        success: true,
        data: updatedOrder,
        message: 'Order status updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to update order status',
      };
    }
  }
}
