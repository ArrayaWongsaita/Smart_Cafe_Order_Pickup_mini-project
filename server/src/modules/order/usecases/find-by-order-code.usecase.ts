import { Injectable, Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import {
  IOrderRepository,
  IOrderRepositoryToken,
} from '../interfaces/order.repository.interface';

export const FindByOrderCodeUseCaseToken: unique symbol = Symbol(
  'FindByOrderCodeUseCase',
);

@Injectable()
export class FindByOrderCodeUseCase {
  constructor(
    @Inject(IOrderRepositoryToken)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(orderCode: string): Promise<OrderEntity> {
    // Validate input
    if (!orderCode || orderCode.trim().length === 0) {
      throw new Error('Order code is required');
    }

    // Find the order by order code
    const order = await this.orderRepository.findByOrderCode(orderCode.trim());

    // Throw error if order not found
    if (!order) {
      throw new NotFoundException(`Order with code "${orderCode}" not found`);
    }

    return order;
  }
}
