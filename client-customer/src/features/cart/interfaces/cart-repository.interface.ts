import { MenuItem } from '@/features/menu/types/menu-item.type';
import { CartItem } from '../types';

export interface CartRepositoryInterface {
  // Add item to cart
  addItem(menuItem: MenuItem, quantity?: number): Promise<void>;

  // Remove item from cart
  removeItem(menuItemId: string): Promise<void>;

  // Update item quantity
  updateQuantity(menuItemId: string, quantity: number): Promise<void>;

  // Increment item quantity
  incrementQuantity(menuItemId: string): Promise<void>;

  // Decrement item quantity
  decrementQuantity(menuItemId: string): Promise<void>;

  // Clear all items from cart
  clearCart(): Promise<void>;

  // Get all cart items
  getCartItems(): Promise<CartItem[]>;

  // Get specific item by ID
  getItemById(menuItemId: string): Promise<CartItem | undefined>;

  // Get total items count
  getTotalItems(): Promise<number>;

  // Get total price
  getTotalPrice(): Promise<number>;

  // Get specific item count
  getItemCount(menuItemId: string): Promise<number>;

  // Set loading state
  setLoading(loading: boolean): Promise<void>;

  // Set error state
  setError(error: string | null): Promise<void>;
}
