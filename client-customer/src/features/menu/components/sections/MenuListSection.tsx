import MenuList from '@/features/menu/components/menu-list/menuList';
import MenuListSectionSkeleton from '@/features/menu/components/sections/MenuListSection.skeleton';
import findAllMenuItemsUseCase from '@/features/menu/use-case/find-all-menu-item.usecase';
import PaginationList from '@/shared/components/pagination/PaginationList';
import { ParamsAndSearchParamsProps } from '@/shared/types';
import { Suspense } from 'react';

export async function MenuListSection({
  params,
  searchParams,
}: ParamsAndSearchParamsProps) {
  const param = await params;
  const searchParam = await searchParams;

  const menuItems = await findAllMenuItemsUseCase.execute({
    ...param,
    ...searchParam,
  });

  return (
    <>
      <MenuList menuItems={menuItems.data} />
      <PaginationList meta={menuItems.meta} basePath="/menu" />
    </>
  );
}

export default function MenuListSectionSuspense({
  params,
  searchParams,
}: ParamsAndSearchParamsProps) {
  return (
    <Suspense fallback={<MenuListSectionSkeleton />}>
      <MenuListSection params={params} searchParams={searchParams} />
    </Suspense>
  );
}
