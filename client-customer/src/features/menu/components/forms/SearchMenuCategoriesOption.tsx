import findAllMenuCategoriesOptionUseCase from '@/features/menu/use-case/find-all-menu-categories-option.usecase';
import FilterButtonList from '@/shared/components/filters/FilterButtonList';
import FilterButtonListSkeleton from '@/shared/components/filters/FilterButtonList.skeleton';
import { Suspense } from 'react';

export async function SearchMenuCategoriesOption() {
  const categories = await findAllMenuCategoriesOptionUseCase.execute();
  return (
    <FilterButtonList
      options={categories}
      queryKey="categoryId"
      placeholder="เลือกหมวดหมู่"
      showAllButton={true}
    />
  );
}

export default function SearchMenuCategoriesOptionSuspense() {
  return (
    <Suspense fallback={<FilterButtonListSkeleton />}>
      <SearchMenuCategoriesOption />
    </Suspense>
  );
}
