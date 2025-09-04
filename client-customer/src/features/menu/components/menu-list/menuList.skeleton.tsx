import MenuItemCardSkeleton from '@/features/menu/components/card/MenuItemCard.skeleton';

interface MenuListSkeletonProps {
  itemsCount?: number;
}

export default function MenuListSkeleton({
  itemsCount = 12,
}: MenuListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {Array.from({ length: itemsCount }).map((_, index) => (
        <MenuItemCardSkeleton key={index} />
      ))}
    </div>
  );
}
