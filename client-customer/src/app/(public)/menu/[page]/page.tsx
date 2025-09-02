import MenuListSection from '@/features/menu/components/sections/MenuListSection';
import MenuListSectionSkeleton from '@/features/menu/components/sections/MenuListSection.skeleton';
import SearchInput from '@/shared/components/form/SearchInput';
import { ParamsAndSearchParamsProps } from '@/shared/types';
import { Suspense } from 'react';

// const categories = [
//   { label: 'กาแฟ', value: 'coffee' },
//   { label: 'ชา', value: 'tea' },
//   { label: 'น้ำผลไม้', value: 'juice' },
// ];
export default async function page({
  params,
  searchParams,
}: ParamsAndSearchParamsProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6 ">
      {/* <FilterButtonListSkeleton /> */}
      {/* <FilterButtonList
        options={categories}
        queryKey="category"
        placeholder="เลือกหมวดหมู่"
        showAllButton={true}
      /> */}

      <SearchInput
        placeholder="ค้นหาเมนู"
        queryKey="search"
        className="md:w-[50%]"
      />
      <Suspense fallback={<MenuListSectionSkeleton />}>
        <MenuListSection params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
