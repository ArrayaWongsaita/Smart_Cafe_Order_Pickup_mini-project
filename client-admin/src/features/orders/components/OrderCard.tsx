import { formatPrice } from '@/shared/utils';
import type { Order } from '../types';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export function OrderCard({ order, onUpdateStatus }: OrderCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      PENDING: 'bg-orange-100 text-orange-800',
      PREPARING: 'bg-yellow-100 text-yellow-800',
      READY: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            #{order.orderCode}
          </h3>
          <p className="text-gray-600">{formatDate(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
          <p className="text-xl font-bold text-gray-900 mt-2">
            {formatPrice(order.totalPrice)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Items:</h4>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <div>
                <span className="font-medium">{item.item.name}</span>
                <span className="text-gray-600 ml-2">x{item.qty}</span>
              </div>
              <span className="font-medium">{formatPrice(item.subtotal)}</span>
            </div>
          ))}
        </div>
      </div>

      {order.notes && (
        <div className="mb-4">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Notes:</h4>
          <p className="text-gray-600 bg-gray-50 p-3 rounded">{order.notes}</p>
        </div>
      )}

      {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
        <div className="flex space-x-2">
          {order.status === 'PENDING' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'PREPARING')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Start Preparing
            </button>
          )}
          {order.status === 'PREPARING' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'READY')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Mark as Ready
            </button>
          )}
          {order.status === 'READY' && (
            <button
              onClick={() => onUpdateStatus(order.id, 'COMPLETED')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mark as Completed
            </button>
          )}
          <button
            onClick={() => onUpdateStatus(order.id, 'CANCELLED')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
}
