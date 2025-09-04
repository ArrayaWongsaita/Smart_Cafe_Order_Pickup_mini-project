import { OrderCard } from './OrderCard';
import type { Order, OrderStatusFilter } from '../types';

interface OrdersListProps {
  orders: Order[];
  selectedStatus: OrderStatusFilter;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersList({
  orders,
  selectedStatus,
  onUpdateStatus,
}: OrdersListProps) {
  if (orders.length === 0) {
    const getEmptyMessage = () => {
      switch (selectedStatus) {
        case 'ALL':
          return 'No orders found';
        case 'ACTIVE':
          return 'No active orders';
        case 'INACTIVE':
          return 'No completed/cancelled orders';
        default:
          return `No ${selectedStatus.toLowerCase()} orders found`;
      }
    };

    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{getEmptyMessage()}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}
