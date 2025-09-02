import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { MenuCategoryEntity } from 'src/modules/menus/entities/menu-category.entity';

export class GetAllMenuCategoriesResponse {
  @ApiProperty({
    description: 'List of menu categories',
    type: [MenuCategoryEntity],
  })
  @IsArray()
  @Type(() => MenuCategoryEntity)
  data: MenuCategoryEntity[];
}
