import { FilterMenuDto } from '@/features/menu/dto/filter-menu.dto';
import { IMenuRepository } from '@/features/menu/interfaces';

import { MenuItemsWithPagination } from '@/features/menu/schemas/menu-item.schema';
import { MenuItem } from '@/features/menu/types/menu-item.type';
import type { MenuItemsWithPagination as MenuItemsWithPaginationType } from '@/features/menu/types/menu-item.type';
import menuServerApi, {
  MenuServerApi,
} from '@/infrastructure/api/server/menu.api';

class MenuApiRepository implements IMenuRepository {
  constructor(private readonly menuServerApi: MenuServerApi) {}
  async findAllWithDetails(
    filterDto: FilterMenuDto
  ): Promise<MenuItemsWithPaginationType> {
    const params = new URLSearchParams(filterDto);
    const result = await this.menuServerApi.fetchMenu(params.toString());
    return MenuItemsWithPagination.parse(result);
  }
  async findById(id: string): Promise<MenuItem | null> {
    throw new Error('Not implemented');
  }
  async create(item: MenuItem): Promise<MenuItem> {
    throw new Error('Not implemented');
  }
  async update(id: string, item: MenuItem): Promise<MenuItem | null> {
    throw new Error('Not implemented');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Not implemented');
  }
}

const menuApiRepository = new MenuApiRepository(menuServerApi);

export default menuApiRepository;
