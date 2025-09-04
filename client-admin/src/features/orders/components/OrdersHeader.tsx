import type { OrderStatusFilter } from '../types';

interface OrdersHeaderProps {
  selectedStatus: OrderStatusFilter;
  filteredOrdersCount: number;
  isConnected: boolean;
  onRefresh: () => void;
}

export function OrdersHeader({
  selectedStatus,
  filteredOrdersCount,
  isConnected,
  onRefresh,
}: OrdersHeaderProps) {
  const getStatusDescription = () => {
    switch (selectedStatus) {
      case 'ALL':
        return `Showing all ${filteredOrdersCount} orders`;
      case 'ACTIVE':
        return `Showing ${filteredOrdersCount} active orders`;
      case 'INACTIVE':
        return `Showing ${filteredOrdersCount} completed/cancelled orders`;
      default:
        return `Showing ${filteredOrdersCount} ${selectedStatus.toLowerCase()} orders`;
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">{getStatusDescription()}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isConnected
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </span>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
