import MenuListSkeleton from '@/features/menu/components/menu-list/menuList.skeleton';
import PaginationListSkeleton from '@/shared/components/pagination/PaginationList.skeleton';

export default async function MenuListSectionSkeleton() {
  return (
    <>
      <MenuListSkeleton />
      <PaginationListSkeleton />
    </>
  );
}
