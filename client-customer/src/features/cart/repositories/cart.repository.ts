import { MenuItem } from '@/features/menu/types/menu-item.type';
import { CartItem } from '../types';
import { CartRepositoryInterface } from '../interfaces';
import { useCartStore } from '../store';

export class CartRepository implements CartRepositoryInterface {
  private getStore() {
    return useCartStore.getState();
  }

  async addItem(menuItem: MenuItem, quantity = 1): Promise<void> {
    try {
      this.getStore().setLoading(true);
      this.getStore().setError(null);

      // Simulate API call delay if needed
      await new Promise((resolve) => setTimeout(resolve, 100));

      this.getStore().addItem(menuItem, quantity);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add item to cart';
      this.getStore().setError(errorMessage);
      throw error;
    } finally {
      this.getStore().setLoading(false);
    }
  }

  async removeItem(menuItemId: string): Promise<void> {
    try {
      this.getStore().setLoading(true);
      this.getStore().setError(null);

      await new Promise((resolve) => setTimeout(resolve, 100));

      this.getStore().removeItem(menuItemId);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to remove item from cart';
      this.getStore().setError(errorMessage);
      throw error;
    } finally {
      this.getStore().setLoading(false);
    }
  }

  async updateQuantity(menuItemId: string, quantity: number): Promise<void> {
    try {
      this.getStore().setLoading(true);
      this.getStore().setError(null);

      await new Promise((resolve) => setTimeout(resolve, 100));

      this.getStore().updateQuantity(menuItemId, quantity);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to update item quantity';
      this.getStore().setError(errorMessage);
      throw error;
    } finally {
      this.getStore().setLoading(false);
    }
  }

  async incrementQuantity(menuItemId: string): Promise<void> {
    try {
      this.getStore().setLoading(true);
      this.getStore().setError(null);

      await new Promise((resolve) => setTimeout(resolve, 100));

      this.getStore().incrementQuantity(menuItemId);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to increment item quantity';
      this.getStore().setError(errorMessage);
      throw error;
    } finally {
      this.getStore().setLoading(false);
    }
  }

  async decrementQuantity(menuItemId: string): Promise<void> {
    try {
      this.getStore().setLoading(true);
      this.getStore().setError(null);

      await new Promise((resolve) => setTimeout(resolve, 100));

      this.getStore().decrementQuantity(menuItemId);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to decrement item quantity';
      this.getStore().setError(errorMessage);
      throw error;
    } finally {
      this.getStore().setLoading(false);
    }
  }

  async clearCart(): Promise<void> {
    try {
      this.getStore().setLoading(true);
      this.getStore().setError(null);

      await new Promise((resolve) => setTimeout(resolve, 100));

      this.getStore().clearCart();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to clear cart';
      this.getStore().setError(errorMessage);
      throw error;
    } finally {
      this.getStore().setLoading(false);
    }
  }

  async getCartItems(): Promise<CartItem[]> {
    try {
      this.getStore().setError(null);
      return this.getStore().items;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get cart items';
      this.getStore().setError(errorMessage);
      throw error;
    }
  }

  async getItemById(menuItemId: string): Promise<CartItem | undefined> {
    try {
      this.getStore().setError(null);
      return this.getStore().getItemById(menuItemId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get item by ID';
      this.getStore().setError(errorMessage);
      throw error;
    }
  }

  async getTotalItems(): Promise<number> {
    try {
      this.getStore().setError(null);
      return this.getStore().getTotalItems();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get total items';
      this.getStore().setError(errorMessage);
      throw error;
    }
  }

  async getTotalPrice(): Promise<number> {
    try {
      this.getStore().setError(null);
      return this.getStore().getTotalPrice();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get total price';
      this.getStore().setError(errorMessage);
      throw error;
    }
  }

  async getItemCount(menuItemId: string): Promise<number> {
    try {
      this.getStore().setError(null);
      return this.getStore().getItemCount(menuItemId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get item count';
      this.getStore().setError(errorMessage);
      throw error;
    }
  }

  async setLoading(loading: boolean): Promise<void> {
    this.getStore().setLoading(loading);
  }

  async setError(error: string | null): Promise<void> {
    this.getStore().setError(error);
  }
}
