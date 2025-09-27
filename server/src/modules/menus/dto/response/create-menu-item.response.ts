import { ApiProperty } from '@nestjs/swagger';
import { MenuEntity } from '../../entities/menu-item.entity';

export class CreateMenuItemResponse extends MenuEntity {
  @ApiProperty({
    description: 'Success message',
    example: 'Menu item created successfully',
  })
  message: string;
}
