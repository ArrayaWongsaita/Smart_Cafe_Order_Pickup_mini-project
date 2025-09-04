import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { OrderItem } from '../interfaces/order.interface';
import { formatPrice } from '../utils/order-status.utils';
import Image from 'next/image';

interface OrderItemsListProps {
  items: OrderItem[];
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>รายการสินค้า</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.item.imageUrl}
                  alt={item.item.name}
                  className="h-16 w-16 object-cover rounded-md"
                  width={64}
                  height={64}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.item.name}</h3>
                <p className="text-gray-600 text-sm">{item.item.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-gray-500">
                    จำนวน: {item.qty}
                  </span>
                  <span className="text-sm text-gray-500">
                    ราคาต่อหน่วย: {formatPrice(item.unitPrice)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">
                  {formatPrice(item.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
