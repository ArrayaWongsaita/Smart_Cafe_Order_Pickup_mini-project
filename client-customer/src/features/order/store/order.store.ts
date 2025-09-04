import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../interfaces';

interface OrderState {
  // Single order
  order: Order | null;

  // Loading states
  isLoading: boolean;
  isCreatingOrder: boolean;
  isTrackingOrder: boolean;
  error: string | null;

  // Actions
  setOrder: (order: Order) => void;
  updateOrder: (updatedData: Partial<Order>) => void;
  updateOrderStatus: (status: OrderStatus) => void;
  clearOrder: () => void;

  // Loading actions
  setLoading: (loading: boolean) => void;
  setCreatingOrder: (creating: boolean) => void;
  setTrackingOrder: (tracking: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        order: null,
        isLoading: false,
        isCreatingOrder: false,
        isTrackingOrder: false,
        error: null,

        // Actions
        setOrder: (order: Order) => {
          console.log('Setting order:', order);
          set({
            order,
            error: null,
          });
        },

        updateOrder: (updatedData: Partial<Order>) => {
          const currentOrder = get().order;
          if (currentOrder) {
            console.log('Updating order with data:', updatedData);
            set({
              order: { ...currentOrder, ...updatedData },
              error: null,
            });
          }
        },

        updateOrderStatus: (status: OrderStatus) => {
          const currentOrder = get().order;
          if (currentOrder) {
            console.log('Updating order status to:', status);
            set({
              order: { ...currentOrder, status },
              error: null,
            });
          }
        },

        clearOrder: () => {
          set({
            order: null,
            error: null,
          });
        },

        // Loading actions
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        setCreatingOrder: (creating: boolean) => {
          set({ isCreatingOrder: creating });
        },

        setTrackingOrder: (tracking: boolean) => {
          set({ isTrackingOrder: tracking });
        },

        setError: (error: string | null) => {
          set({ error });
        },
      }),
      {
        name: 'order-store',
        partialize: (state) => ({ order: state.order }), // Only persist the order
      }
    )
  )
);
