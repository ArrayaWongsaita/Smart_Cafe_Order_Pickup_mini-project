import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import {
  IOrderRepository,
  IOrderRepositoryToken,
} from '../interfaces/order.repository.interface';

export const CreateOrderUseCaseToken: unique symbol =
  Symbol('CreateOrderUseCase');

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(IOrderRepositoryToken)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(
    createOrderDto: CreateOrderDto,
    customerId?: string,
  ): Promise<OrderEntity> {
    // Validate that items exist and have valid prices
    if (!createOrderDto.data || createOrderDto.data.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // Create the order
    const order = await this.orderRepository.createOrder(
      createOrderDto,
      customerId,
    );

    return order;
  }
}
