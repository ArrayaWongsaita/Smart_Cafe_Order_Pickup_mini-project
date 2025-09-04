import { IMenuCategoriesRepository } from '@/features/menu/interfaces';
import menuCategoriesApiRepository from '@/features/menu/repositories/menu-categories-api.repository';
import { OptionsSelectType } from '@/shared/types';

class FindAllMenuCategoriesOptionUseCase {
  constructor(
    private readonly menuCategoriesRepository: IMenuCategoriesRepository
  ) {}

  async execute(): Promise<OptionsSelectType> {
    return this.menuCategoriesRepository.findAllOptions();
  }
}

// Singleton instance

const findAllMenuCategoriesOptionUseCase =
  new FindAllMenuCategoriesOptionUseCase(menuCategoriesApiRepository);

export default findAllMenuCategoriesOptionUseCase;
