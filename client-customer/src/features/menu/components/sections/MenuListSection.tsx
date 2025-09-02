import MenuList from '@/features/menu/components/menu-list/menuList';
import findAllMenuItemsUseCase from '@/features/menu/use-case/find-all-menu-item.usecase';
import PaginationList from '@/shared/components/pagination/PaginationList';
import { ParamsAndSearchParamsProps } from '@/shared/types';

export default async function MenuListSection({
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
