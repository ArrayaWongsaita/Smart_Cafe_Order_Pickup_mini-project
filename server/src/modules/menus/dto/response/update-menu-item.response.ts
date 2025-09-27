import { ApiProperty } from '@nestjs/swagger';
import { MenuEntity } from '../../entities/menu-item.entity';

export class UpdateMenuItemResponse extends MenuEntity {
  @ApiProperty({
    description: 'Success message',
    example: 'Menu item updated successfully',
  })
  message: string;
}
