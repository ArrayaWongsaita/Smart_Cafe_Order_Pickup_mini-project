import type { FilterMenuDto } from '@/features/menu/dto/filter-menu.dto';
import { filterMenuSchema } from '@/features/menu/dto/filter-menu.dto';
import type { MenuRepository } from '@/features/menu/interfaces/menu-repository.interface';
import menuApiRepository from '@/features/menu/repositories/menu-api.repository';
import type { MenuItemsWithPagination } from '@/features/menu/types/menu-item.type';
import { validateData } from '@/shared/lib/validateData';

class FindAllMenuItemsUseCase {
  constructor(private menuRepository: MenuRepository) {}

  async execute(filterDto: FilterMenuDto): Promise<MenuItemsWithPagination> {
    const validatedData = validateData(filterMenuSchema, filterDto);

    // ใช้ validated data
    return this.menuRepository.findAllWithDetails(validatedData);
  }
}

const findAllMenuItemsUseCase = new FindAllMenuItemsUseCase(menuApiRepository);

export default findAllMenuItemsUseCase;
