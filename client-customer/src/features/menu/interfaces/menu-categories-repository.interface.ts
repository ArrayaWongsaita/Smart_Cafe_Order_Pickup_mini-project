import { ArrayMenuCategory } from '@/features/menu/types';
import { OptionsSelectType } from '@/shared/types';

export interface IMenuCategoriesRepository {
  findAllWithDetails(): Promise<ArrayMenuCategory>;
  findAllOptions(): Promise<OptionsSelectType>;
}
