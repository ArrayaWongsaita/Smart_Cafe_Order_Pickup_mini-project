import { PickType } from '@nestjs/swagger';
import { MenuCategoryEntity } from 'src/modules/menus/entities/menu-category.entity';

export class CreateMenuCategoryDto extends PickType(MenuCategoryEntity, [
  'name',
  'sortOrder',
]) {}
