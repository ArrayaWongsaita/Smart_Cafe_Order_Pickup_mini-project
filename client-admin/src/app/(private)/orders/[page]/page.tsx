'use client';

import { useParams } from 'next/navigation';
import {
  OrdersSidebar,
  OrdersHeader,
  OrdersList,
  OrdersPagination,
  OrdersLoading,
  useOrdersStore,
  useOrdersManagement,
} from '@/features/orders';

export default function OrdersPage() {
  const params = useParams();
  const currentPage = parseInt(params.page as string) || 1;

  // Zustand store
  const {
    orders,
    filteredOrders,
    selectedStatus,
    meta,
    loading,
    setSelectedStatus,
    getStatusCount,
    getActiveOrdersCount,
    getInactiveOrdersCount,
  } = useOrdersStore();

  // Custom hook for orders management
  const { fetchOrders, updateOrderStatus, isConnected } =
    useOrdersManagement(currentPage);

  if (loading) {
    return <OrdersLoading />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OrdersSidebar
        selectedStatus={selectedStatus}
        ordersCount={orders.length}
        activeOrdersCount={getActiveOrdersCount()}
        inactiveOrdersCount={getInactiveOrdersCount()}
        getStatusCount={getStatusCount}
        onStatusChange={setSelectedStatus}
      />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <OrdersHeader
            selectedStatus={selectedStatus}
            filteredOrdersCount={filteredOrders.length}
            isConnected={isConnected}
            onRefresh={fetchOrders}
          />

          <OrdersList
            orders={filteredOrders}
            selectedStatus={selectedStatus}
            onUpdateStatus={updateOrderStatus}
          />

          {meta && <OrdersPagination meta={meta} currentPage={currentPage} />}
        </div>
      </div>
    </div>
  );
}
