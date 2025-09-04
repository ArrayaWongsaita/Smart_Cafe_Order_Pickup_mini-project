import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { MenuEntity } from 'src/modules/menus/entities/menu-item.entity';

class CreateOrderItemDto extends PickType(MenuEntity, ['id', 'price']) {
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  data: CreateOrderItemDto[];

  customerId?: string;
}
