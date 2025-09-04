import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { OrderGateway } from './order.gateway';
import { OrderRepository } from './repositories/order.repository';
import {
  CreateOrderUseCaseToken,
  CreateOrderUseCase,
} from './usecases/create-order.usecase';
import {
  FindByOrderCodeUseCaseToken,
  FindByOrderCodeUseCase,
} from './usecases/find-by-order-code.usecase';
import {
  GetAllOrdersUseCaseToken,
  GetAllOrdersUseCaseImpl,
} from './usecases/get-all-orders.usecase';
import {
  UpdateOrderStatusUseCaseToken,
  UpdateOrderStatusUseCaseImpl,
} from './usecases/update-order-status.usecase';
import { IOrderRepositoryToken } from './interfaces/order.repository.interface';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [
    OrderGateway,
    OrderRepository,
    {
      provide: IOrderRepositoryToken,
      useClass: OrderRepository,
    },
    {
      provide: CreateOrderUseCaseToken,
      useClass: CreateOrderUseCase,
    },
    {
      provide: FindByOrderCodeUseCaseToken,
      useClass: FindByOrderCodeUseCase,
    },
    {
      provide: GetAllOrdersUseCaseToken,
      useClass: GetAllOrdersUseCaseImpl,
    },
    {
      provide: UpdateOrderStatusUseCaseToken,
      useClass: UpdateOrderStatusUseCaseImpl,
    },
  ],
  exports: [
    CreateOrderUseCaseToken,
    FindByOrderCodeUseCaseToken,
    GetAllOrdersUseCaseToken,
    UpdateOrderStatusUseCaseToken,
    IOrderRepositoryToken,
  ],
})
export class OrderModule {}
