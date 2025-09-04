import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { Order } from '../interfaces/order.interface';
import { formatPrice } from '../utils/order-status.utils';

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>จำนวนสินค้า:</span>
            <span>
              {order.items.reduce((total, item) => total + item.qty, 0)} ชิ้น
            </span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>ยอดรวมทั้งสิ้น:</span>
            <span className="text-green-600">
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>
        {order.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">หมายเหตุ:</h4>
            <p className="text-sm text-gray-700">{order.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
