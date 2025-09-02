import { MenuItem } from '@/features/menu/types/menu-item.type';
import MenuItemCard from '@/features/menu/components/card/MenuItemCard';

interface MenuListProps {
  menuItems: MenuItem[];
}

export default function MenuList({ menuItems }: MenuListProps) {
  if (menuItems.length === 0) {
    return <div className="text-gray-500">ไม่มีรายการเมนู</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {menuItems.map((menuItem, index) => (
        <MenuItemCard key={menuItem.id + index} menuItem={menuItem} />
      ))}
    </div>
  );
}
