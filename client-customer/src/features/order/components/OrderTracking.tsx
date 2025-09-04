import React from 'react';
import { Order } from '../interfaces/order.interface';
import { OrderTrackingHeader } from './OrderTrackingHeader';
import { OrderProgressSteps } from './OrderProgressSteps';
import { OrderItemsList } from './OrderItemsList';
import { OrderSummary } from './OrderSummary';

interface OrderTrackingProps {
  order: Order;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <OrderTrackingHeader
          orderCode={order.orderCode}
          status={order.status}
        />

        {/* Progress Steps */}
        <OrderProgressSteps status={order.status} />

        {/* Order Items */}
        <OrderItemsList items={order.items} />

        {/* Order Summary */}
        <OrderSummary order={order} />
      </div>
    </div>
  );
};
