import {
  MenuItem,
  MenuItemsWithPagination,
} from '@/features/menu/types/menu-item.type';
import { FilterMenuDto } from '@/features/menu/dto/filter-menu.dto';

export interface MenuRepository {
  findAllWithDetails(filter?: FilterMenuDto): Promise<MenuItemsWithPagination>;
  findById(id: string): Promise<MenuItem | null>;
  create(item: MenuItem): Promise<MenuItem>;
  update(id: string, item: MenuItem): Promise<MenuItem | null>;
  delete(id: string): Promise<boolean>;
}
