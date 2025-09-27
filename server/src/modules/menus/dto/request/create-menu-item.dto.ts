import { PickType } from '@nestjs/swagger';
import { MenuEntity } from 'src/modules/menus/entities/menu-item.entity';

export class CreateMenuItemDto extends PickType(MenuEntity, [
  'name',
  'description',
  'price',
  'imageUrl',
]) {}
