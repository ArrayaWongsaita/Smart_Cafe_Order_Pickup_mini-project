'use client';

import AddToCartButton from '@/features/menu/components/buttons/AddToCart.button';
import { MenuItem } from '@/features/menu/types/menu-item.type';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import Image from 'next/image';

interface MenuItemCardProps {
  menuItem: MenuItem;
}

export default function MenuItemCard({ menuItem }: MenuItemCardProps) {
  const { name, description, price, imageUrl, category, active } = menuItem;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price / 100); // แปลงจาก cents เป็น baht
  };

  return (
    <Card
      className={`m-auto w-full max-w-sm  transition-all duration-200 hover:shadow-lg ${
        !active ? 'opacity-60' : ''
      }`}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <Image
            src={imageUrl}
            alt={name}
            fill
            priority
            className="object-cover transition-transform duration-200 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {category && (
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
              {category.name}
            </div>
          )}
          {!active && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-md font-medium">
                ไม่พร้อมจำหน่าย
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold  mb-2 line-clamp-2">
          {name}
        </CardTitle>
        {description && (
          <CardDescription className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </CardDescription>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(price)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton active={active} />
      </CardFooter>
    </Card>
  );
}
