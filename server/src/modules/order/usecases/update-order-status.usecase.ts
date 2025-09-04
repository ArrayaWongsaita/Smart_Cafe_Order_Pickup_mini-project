import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  IOrderRepositoryToken,
} from '../interfaces/order.repository.interface';
import { OrderEntity } from '../entities/order.entity';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';
import { OrderStatus } from '@prisma/client';

export const UpdateOrderStatusUseCaseToken = Symbol('UpdateOrderStatusUseCase');

export interface UpdateOrderStatusUseCase {
  execute(orderId: string, status: OrderStatus): Promise<OrderEntity>;
}

@Injectable()
export class UpdateOrderStatusUseCaseImpl implements UpdateOrderStatusUseCase {
  constructor(
    @Inject(IOrderRepositoryToken)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(orderId: string, status: OrderStatus): Promise<OrderEntity> {
    // Check if order exists
    const existingOrder = await this.orderRepository.findById(orderId);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Update order status
    const updatedOrder = await this.orderRepository.updateStatus(
      orderId,
      status,
    );

    return updatedOrder;
  }
}
