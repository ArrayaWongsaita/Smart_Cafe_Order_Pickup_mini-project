import { ApiProperty } from '@nestjs/swagger';
import { MenuCategoryEntity } from '../../entities/menu-category.entity';

export class CreateMenuCategoryResponse extends MenuCategoryEntity {
  @ApiProperty({
    description: 'Success message',
    example: 'Menu category created successfully',
  })
  message: string;
}
