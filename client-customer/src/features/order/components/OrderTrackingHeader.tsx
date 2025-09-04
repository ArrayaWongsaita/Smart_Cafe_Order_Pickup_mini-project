import React from 'react';
import { OrderStatus } from '../interfaces/order.interface';

interface OrderTrackingHeaderProps {
  orderCode: string;
  status: OrderStatus | string;
}

export const OrderTrackingHeader: React.FC<OrderTrackingHeaderProps> = ({
  orderCode,
}) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-primary mb-2">ติดตามคำสั่งซื้อ</h1>
      <p className="text-gray-600 mb-4">
        รหัสคำสั่งซื้อ:{' '}
        <span className="font-mono text-secondary-foreground font-semibold">
          {orderCode}
        </span>
      </p>
    </div>
  );
};
