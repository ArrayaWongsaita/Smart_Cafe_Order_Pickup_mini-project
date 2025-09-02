import { IMenuCategoriesRepository } from '@/features/menu/interfaces';
import { ArrayMenuCategory } from '@/features/menu/types';
import { arrayMenuCategorySchema } from '@/features/menu/schemas/menu-categories.schema';
import menuCategoriesServerApi, {
  MenuCategoriesServerApi,
} from '@/infrastructure/api/server/menu-categories.api';
import { OptionsSelectType } from '@/shared/types';
import { optionsSelectArraySchema } from '@/shared/schema';
import { convertMenuCategoriesToOptionsSelect } from '@/features/menu/utils';

export class MenuCategoriesApiRepository implements IMenuCategoriesRepository {
  constructor(
    private readonly menuCategoriesServerApi: MenuCategoriesServerApi
  ) {}

  async findAllWithDetails(): Promise<ArrayMenuCategory> {
    const result = await this.menuCategoriesServerApi.fetchMenuCategories();
    return arrayMenuCategorySchema.parse(result);
  }

  async findAllOptions(): Promise<OptionsSelectType> {
    const result = await this.menuCategoriesServerApi.fetchMenuCategories();
    // Validate API response
    if (typeof result !== 'object' || result === null || !('data' in result)) {
      throw new Error('Invalid API response');
    }
    // Validate data structure
    const checkedResult = arrayMenuCategorySchema.parse(result.data);

    // Transform data
    const data = convertMenuCategoriesToOptionsSelect(checkedResult);

    // Validate transformed data
    return optionsSelectArraySchema.parse(data);
  }
}

const menuCategoriesApiRepository = new MenuCategoriesApiRepository(
  menuCategoriesServerApi
);

export default menuCategoriesApiRepository;
