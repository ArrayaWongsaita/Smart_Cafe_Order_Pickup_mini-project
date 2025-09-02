import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { MenuItem } from '@/features/menu/types/menu-item.type';

export interface CartItem extends MenuItem {
  quantity: number;
  addedAt: Date;
}

interface CartState {
  // Cart items
  items: CartItem[];

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  addItem: (menuItem: MenuItem, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  incrementQuantity: (menuItemId: string) => void;
  decrementQuantity: (menuItemId: string) => void;
  clearCart: () => void;

  // Getters
  getItemById: (menuItemId: string) => CartItem | undefined;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (menuItemId: string) => number;

  // Loading actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        items: [],
        isLoading: false,
        error: null,

        // Actions
        addItem: (menuItem: MenuItem, quantity = 1) => {
          const existingItem = get().items.find(
            (item) => item.id === menuItem.id
          );

          if (existingItem) {
            // If item already exists, increase quantity
            set(
              (state) => ({
                items: state.items.map((item) =>
                  item.id === menuItem.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              }),
              false,
              'addItem/existing'
            );
          } else {
            // If item doesn't exist, add new item with quantity
            set(
              (state) => ({
                items: [
                  ...state.items,
                  {
                    ...menuItem,
                    quantity,
                    addedAt: new Date(),
                  },
                ],
              }),
              false,
              'addItem/new'
            );
          }
        },

        removeItem: (menuItemId: string) => {
          set(
            (state) => ({
              items: state.items.filter((item) => item.id !== menuItemId),
            }),
            false,
            'removeItem'
          );
        },

        updateQuantity: (menuItemId: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeItem(menuItemId);
            return;
          }

          set(
            (state) => ({
              items: state.items.map((item) =>
                item.id === menuItemId ? { ...item, quantity } : item
              ),
            }),
            false,
            'updateQuantity'
          );
        },

        incrementQuantity: (menuItemId: string) => {
          set(
            (state) => ({
              items: state.items.map((item) =>
                item.id === menuItemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }),
            false,
            'incrementQuantity'
          );
        },

        decrementQuantity: (menuItemId: string) => {
          const item = get().items.find((item) => item.id === menuItemId);
          if (item && item.quantity > 1) {
            set(
              (state) => ({
                items: state.items.map((item) =>
                  item.id === menuItemId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              }),
              false,
              'decrementQuantity'
            );
          } else if (item && item.quantity === 1) {
            get().removeItem(menuItemId);
          }
        },

        clearCart: () => {
          set({ items: [] }, false, 'clearCart');
        },

        // Getters
        getItemById: (menuItemId: string) => {
          return get().items.find((item) => item.id === menuItemId);
        },

        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        getTotalPrice: () => {
          return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        },

        getItemCount: (menuItemId: string) => {
          const item = get().items.find((item) => item.id === menuItemId);
          return item ? item.quantity : 0;
        },

        // Loading actions
        setLoading: (loading: boolean) => {
          set({ isLoading: loading }, false, 'setLoading');
        },

        setError: (error: string | null) => {
          set({ error }, false, 'setError');
        },
      }),
      {
        name: 'cart-storage', // unique name for localStorage key
        partialize: (state) => ({ items: state.items }), // only persist items
      }
    ),
    {
      name: 'cart-store',
    }
  )
);
