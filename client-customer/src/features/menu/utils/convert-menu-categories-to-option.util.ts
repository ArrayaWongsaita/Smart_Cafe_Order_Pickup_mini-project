import { ArrayMenuCategory } from '@/features/menu/types';
import { OptionsSelectType } from '@/shared/types';

export const convertMenuCategoriesToOptionsSelect = (
  categories: ArrayMenuCategory
): OptionsSelectType => {
  return categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
};
