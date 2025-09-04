import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  Order,
  OrdersResponse,
  OrderStatusFilter,
  NewOrderNotification,
} from '../types';

interface OrdersState {
  // State
  orders: Order[];
  filteredOrders: Order[];
  selectedStatus: OrderStatusFilter;
  meta: OrdersResponse['meta'] | null;
  loading: boolean;

  // Actions
  setOrders: (orders: Order[]) => void;
  setMeta: (meta: OrdersResponse['meta']) => void;
  setLoading: (loading: boolean) => void;
  setSelectedStatus: (status: OrderStatusFilter) => void;
  addNewOrder: (order: NewOrderNotification) => void;
  updateOrderStatus: (orderId: string, updatedOrder: Order) => void;
  filterOrdersByStatus: (status: OrderStatusFilter) => void;

  // Computed values
  getStatusCount: (status: Order['status']) => number;
  getActiveOrdersCount: () => number;
  getInactiveOrdersCount: () => number;
}

export const useOrdersStore = create<OrdersState>()(
  devtools(
    (set, get) => ({
      // Initial state
      orders: [],
      filteredOrders: [],
      selectedStatus: 'ACTIVE',
      meta: null,
      loading: true,

      // Actions
      setOrders: (orders) => {
        set({ orders });
        // Re-filter orders when orders change
        get().filterOrdersByStatus(get().selectedStatus);
      },

      setMeta: (meta) => set({ meta }),

      setLoading: (loading) => set({ loading }),

      setSelectedStatus: (status) => {
        set({ selectedStatus: status });
        get().filterOrdersByStatus(status);
      },

      addNewOrder: (order) => {
        const { orders } = get();
        const newOrders = [...orders, order];
        set({ orders: newOrders });
        // Re-filter orders when new order is added
        get().filterOrdersByStatus(get().selectedStatus);
      },

      updateOrderStatus: (orderId, updatedOrder) => {
        const { orders } = get();
        const newOrders = orders.map((order) =>
          order.id === orderId ? { ...order, ...updatedOrder } : order
        );
        set({ orders: newOrders });
        // Re-filter orders when order is updated
        get().filterOrdersByStatus(get().selectedStatus);
      },

      filterOrdersByStatus: (status) => {
        const { orders } = get();
        let filtered: Order[];

        if (status === 'ALL') {
          filtered = orders;
        } else if (status === 'ACTIVE') {
          filtered = orders.filter((order) =>
            ['PENDING', 'PREPARING', 'READY'].includes(order.status)
          );
        } else if (status === 'INACTIVE') {
          filtered = orders.filter((order) =>
            ['COMPLETED', 'CANCELLED'].includes(order.status)
          );
        } else {
          filtered = orders.filter((order) => order.status === status);
        }

        set({ filteredOrders: filtered });
      },

      // Computed values
      getStatusCount: (status) => {
        const { orders } = get();
        return orders.filter((order) => order.status === status).length;
      },

      getActiveOrdersCount: () => {
        const { orders } = get();
        return orders.filter((order) =>
          ['PENDING', 'PREPARING', 'READY'].includes(order.status)
        ).length;
      },

      getInactiveOrdersCount: () => {
        const { orders } = get();
        return orders.filter((order) =>
          ['COMPLETED', 'CANCELLED'].includes(order.status)
        ).length;
      },
    }),
    {
      name: 'orders-store',
    }
  )
);
