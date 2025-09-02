import { MenuListSectionSuspense } from '@/features/menu/components';
import { SearchMenuCategoriesOptionSuspense } from '@/features/menu/components/forms';

import SearchInput from '@/shared/components/form/SearchInput';

import { ParamsAndSearchParamsProps } from '@/shared/types';

export default async function page({
  params,
  searchParams,
}: ParamsAndSearchParamsProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6 ">
      {/*  search menu categories options */}
      <SearchMenuCategoriesOptionSuspense />

      {/*  search input */}
      <SearchInput
        placeholder="ค้นหาเมนู"
        queryKey="search"
        className="md:w-[50%]"
      />

      {/*  menu list section */}
      <MenuListSectionSuspense params={params} searchParams={searchParams} />
    </div>
  );
}
