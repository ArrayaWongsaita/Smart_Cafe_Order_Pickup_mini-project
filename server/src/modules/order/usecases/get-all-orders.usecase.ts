import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  IOrderRepositoryToken,
} from '../interfaces/order.repository.interface';
import { OrderEntity } from '../entities/order.entity';
import { PaginationMetaDto } from 'src/shared/dtos/pagination.dto';

export const GetAllOrdersUseCaseToken = Symbol('GetAllOrdersUseCase');

export interface GetAllOrdersUseCase {
  execute(
    page: number,
    limit: number,
  ): Promise<{
    orders: OrderEntity[];
    meta: PaginationMetaDto;
  }>;
}

@Injectable()
export class GetAllOrdersUseCaseImpl implements GetAllOrdersUseCase {
  constructor(
    @Inject(IOrderRepositoryToken)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    orders: OrderEntity[];
    meta: PaginationMetaDto;
  }> {
    const skip = (page - 1) * limit;
    const { orders, total } = await this.orderRepository.findAllWithPagination(
      skip,
      limit,
    );

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const meta: PaginationMetaDto = {
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };

    return {
      orders,
      meta,
    };
  }
}
