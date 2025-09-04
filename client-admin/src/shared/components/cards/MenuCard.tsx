import * as React from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { formatPrice } from '@/shared/utils/formatPrice.util';

type Category = {
  id: string;
  name: string;
};

export type Menu = {
  id?: string;
  name: string;
  description?: string;
  price: number; // stored in cents
  imageUrl?: string;
  active?: boolean;
  category?: Category;
};

export default function MenuCard({
  item,
  className,
  onAdd,
}: {
  item: Menu;
  className?: string;
  onAdd?: (item: Menu) => void;
}) {
  return (
    <Card className={cn('max-w-sm', className)}>
      <CardHeader>
        <div className="flex items-center gap-4">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-20 w-20 rounded-md object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-md bg-muted" />
          )}
          <div className="flex-1">
            <CardTitle>{item.name}</CardTitle>
            {item.category?.name && (
              <CardDescription>{item.category.name}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      {item.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </CardContent>
      )}

      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-semibold">{formatPrice(item.price)}</div>
          <Button onClick={() => onAdd?.(item)} variant="default" size="sm">
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
