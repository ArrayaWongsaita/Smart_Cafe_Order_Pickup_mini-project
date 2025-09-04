import { PickType } from '@nestjs/swagger';
import { OrderEntity } from 'src/modules/order/entities/order.entity';

export class TackOrderDataDto extends PickType(OrderEntity, ['orderCode']) {}
