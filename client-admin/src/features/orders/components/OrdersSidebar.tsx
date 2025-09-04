import type { OrderStatusFilter, Order } from '../types';

interface OrdersSidebarProps {
  selectedStatus: OrderStatusFilter;
  ordersCount: number;
  activeOrdersCount: number;
  inactiveOrdersCount: number;
  getStatusCount: (status: Order['status']) => number;
  onStatusChange: (status: OrderStatusFilter) => void;
}

export function OrdersSidebar({
  selectedStatus,
  ordersCount,
  activeOrdersCount,
  inactiveOrdersCount,
  getStatusCount,
  onStatusChange,
}: OrdersSidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Order Management
        </h2>

        <div className="space-y-6">
          {/* Overview Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Overview
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onStatusChange('ALL')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'ALL'
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">📋 All Orders</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {ordersCount}
                </span>
              </button>

              <button
                onClick={() => onStatusChange('ACTIVE')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'ACTIVE'
                    ? 'bg-purple-100 text-purple-800 border-2 border-purple-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">⚡ Active Orders</span>
                <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-full text-sm">
                  {activeOrdersCount}
                </span>
              </button>

              <button
                onClick={() => onStatusChange('INACTIVE')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'INACTIVE'
                    ? 'bg-gray-100 text-gray-800 border-2 border-gray-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">📁 Completed/Cancelled</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {inactiveOrdersCount}
                </span>
              </button>
            </div>
          </div>

          {/* Workflow Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Workflow
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onStatusChange('PENDING')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'PENDING'
                    ? 'bg-orange-100 text-orange-800 border-2 border-orange-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">🔔 Pending</span>
                <span className="bg-orange-200 text-orange-700 px-2 py-1 rounded-full text-sm">
                  {getStatusCount('PENDING')}
                </span>
              </button>

              <button
                onClick={() => onStatusChange('PREPARING')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'PREPARING'
                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">🔥 Preparing</span>
                <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-sm">
                  {getStatusCount('PREPARING')}
                </span>
              </button>

              <button
                onClick={() => onStatusChange('READY')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'READY'
                    ? 'bg-green-100 text-green-800 border-2 border-green-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">✅ Ready</span>
                <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm">
                  {getStatusCount('READY')}
                </span>
              </button>
            </div>
          </div>

          {/* Final Status Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Final Status
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onStatusChange('COMPLETED')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'COMPLETED'
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">🎉 Completed</span>
                <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-sm">
                  {getStatusCount('COMPLETED')}
                </span>
              </button>

              <button
                onClick={() => onStatusChange('CANCELLED')}
                className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedStatus === 'CANCELLED'
                    ? 'bg-red-100 text-red-800 border-2 border-red-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">❌ Cancelled</span>
                <span className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-sm">
                  {getStatusCount('CANCELLED')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
