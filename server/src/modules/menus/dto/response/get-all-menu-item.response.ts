import { MenuEntity } from 'src/modules/menus/entities/menu-item.entity';
import { PaginationMetaDto } from 'src/shared/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class GetAllMenuItemsResponse {
  @ApiProperty({
    description: 'List of menu items',
    type: [MenuEntity],
  })
  @Type(() => MenuEntity)
  @ValidateNested({ each: true })
  data: MenuEntity[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  @Type(() => PaginationMetaDto)
  @ValidateNested()
  meta: PaginationMetaDto;
}
